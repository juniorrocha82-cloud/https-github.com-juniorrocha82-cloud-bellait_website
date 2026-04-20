routerAdd(
  'POST',
  '/backend/v1/artigos/processar-url',
  (e) => {
    if (!e.auth || e.auth.getString('role') !== 'admin') {
      return e.forbiddenError('Acesso negado.')
    }

    const body = e.requestInfo().body || {}
    const url = body.url

    if (!url || (!url.startsWith('http://') && !url.startsWith('https://'))) {
      return e.badRequestError('URL inválida. Use https://exemplo.com')
    }

    let htmlRes
    try {
      htmlRes = $http.send({
        url: url,
        method: 'GET',
        headers: {
          'User-Agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
          Accept:
            'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
          'Accept-Language': 'pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7',
        },
        timeout: 15,
      })
    } catch (err) {
      console.log('Erro ao fazer request para URL: ', err)
      return e.badRequestError(
        'Não consegui acessar o conteúdo da URL. Verifique se o link está correto e acessível.',
      )
    }

    if (!htmlRes || htmlRes.statusCode !== 200) {
      console.log(
        'Status code inesperado ao acessar URL: ',
        htmlRes ? htmlRes.statusCode : 'nenhum',
      )
      return e.badRequestError(
        'Não foi possível acessar o conteúdo deste site. Ele pode estar protegido contra acesso automatizado. (Status: ' +
          (htmlRes ? htmlRes.statusCode : 'Desconhecido') +
          ')',
      )
    }

    let rawHtml = htmlRes.string || ''
    rawHtml = rawHtml.replace(
      /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
      '',
    )
    rawHtml = rawHtml.replace(
      /<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi,
      '',
    )
    rawHtml = rawHtml.replace(/<[^>]+>/g, ' ')
    rawHtml = rawHtml.replace(/\s+/g, ' ').trim().substring(0, 15000)

    if (!rawHtml) {
      return e.badRequestError('Conteúdo da URL está vazio.')
    }

    const groqKey = $secrets.get('GROQ_API_KEY')
    if (!groqKey) {
      return e.internalServerError('GROQ_API_KEY não configurada.')
    }

    const executeWithRetry = (messages) => {
      let retries = 0
      const backoff = [2000, 4000, 8000]
      let res

      const doCall = () => {
        return $http.send({
          url: 'https://api.groq.com/openai/v1/chat/completions',
          method: 'POST',
          headers: {
            Authorization: 'Bearer ' + groqKey,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            model: 'llama-3.3-70b-versatile',
            messages: messages,
            temperature: 0.7,
            response_format: { type: 'json_object' },
          }),
          timeout: 45,
        })
      }

      res = doCall()
      while (
        res &&
        (res.statusCode === 429 || res.statusCode === 503) &&
        retries < 3
      ) {
        const ms = backoff[retries]
        const start = new Date().getTime()
        while (new Date().getTime() < start + ms) {}
        res = doCall()
        retries++
      }
      return res
    }

    const parseAiResponse = (res) => {
      if (!res || res.statusCode !== 200) return null
      try {
        let content = res.json.choices[0].message.content.trim()
        if (content.startsWith('```json')) {
          content = content.substring(7, content.length - 3).trim()
        } else if (content.startsWith('```')) {
          content = content.substring(3, content.length - 3).trim()
        }
        return JSON.parse(content)
      } catch (err) {
        return null
      }
    }

    const baseStructure = `{
  "titulo": "Título gerado com máximo de 70 caracteres",
  "resumo": "Resumo gerado com máximo de 150 caracteres",
  "conteudo": "Conteúdo completo reescrito em formato HTML estruturado",
  "keywords": "5 palavras-chave sugeridas em português, separadas por vírgula",
  "categoria": "IA"
}`

    const systemPrompt = `Você é um assistente especialista em tecnologia. Sua tarefa é ler o texto fornecido, traduzi-lo para Português do Brasil (se necessário), e reescrevê-lo em um tom profissional de especialista em tecnologia para evitar plágio, incluindo exemplos práticos quando aplicável.
Retorne EXCLUSIVAMENTE um objeto JSON válido com a seguinte estrutura:
${baseStructure}`

    let aiRes = executeWithRetry([
      { role: 'system', content: systemPrompt },
      { role: 'user', content: 'Texto extraído:\n\n' + rawHtml },
    ])

    let parsed = parseAiResponse(aiRes)

    if (!parsed) {
      return e.internalServerError(
        'Erro ao processar conteúdo com IA. Tente novamente.',
      )
    }

    const plagioSystemPrompt = `Compare o texto original com a versão reescrita. Avalie a similaridade de 0 a 100 (onde 100 é cópia exata).
Retorne EXCLUSIVAMENTE um objeto JSON válido com a estrutura:
{
  "score": número inteiro de 0 a 100,
  "suficientemente_diferente": "SIM" ou "NÃO"
}`

    const checkPlagio = (rewrittenText) => {
      let res = executeWithRetry([
        { role: 'system', content: plagioSystemPrompt },
        {
          role: 'user',
          content: `Texto Original:\n${rawHtml}\n\nVersão Reescrita:\n${rewrittenText}`,
        },
      ])
      return parseAiResponse(res)
    }

    let plagioParsed = checkPlagio(parsed.conteudo)

    if (!plagioParsed) {
      return e.internalServerError(
        'Erro ao validar originalidade do conteúdo. Tente novamente.',
      )
    }

    let score = plagioParsed.score || 0
    let sufficientlyDiff = plagioParsed.suficientemente_diferente || 'SIM'

    if (score > 30 || sufficientlyDiff === 'NÃO') {
      const aggressivePrompt = `A versão anterior ficou muito parecida com a original (${score}% similar). Reescreva o conteúdo de forma MAIS AGRESSIVA, mudando completamente a estrutura das frases, usando sinônimos e reestruturando os parágrafos para garantir originalidade máxima (< 20% similaridade), mantendo a qualidade técnica.
Retorne EXCLUSIVAMENTE um objeto JSON válido com a estrutura:
${baseStructure}`

      let aggRes = executeWithRetry([
        { role: 'system', content: aggressivePrompt },
        { role: 'user', content: `Texto Original:\n${rawHtml}` },
      ])

      let aggParsed = parseAiResponse(aggRes)
      if (aggParsed) {
        parsed = aggParsed
        let rePlagioParsed = checkPlagio(parsed.conteudo)
        if (rePlagioParsed) {
          score = rePlagioParsed.score || 0
        }
      }
    }

    const validCats = ['IA', 'Segurança', 'Cloud', 'Infraestrutura']
    if (!validCats.includes(parsed.categoria)) {
      parsed.categoria = 'IA'
    }

    parsed.plagio_score = score
    parsed.plagio_status = score > 30 ? 'alto' : score > 20 ? 'médio' : 'baixo'

    return e.json(200, parsed)
  },
  $apis.requireAuth(),
)
