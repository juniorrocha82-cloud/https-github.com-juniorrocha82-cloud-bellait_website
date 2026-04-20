// @deps cheerio@1.0.0
routerAdd('OPTIONS', '/backend/v1/artigos/processar-url', (e) => {
  e.response.header().set('Access-Control-Allow-Origin', '*')
  e.response
    .header()
    .set('Access-Control-Allow-Headers', 'authorization, apikey, content-type')
  return e.noContent(204)
})

routerAdd(
  'POST',
  '/backend/v1/artigos/processar-url',
  (e) => {
    e.response.header().set('Access-Control-Allow-Origin', '*')

    if (!e.auth || e.auth.getString('role') !== 'admin') {
      return e.forbiddenError('Acesso negado.')
    }

    const body = e.requestInfo().body || {}
    const url = body.url

    if (
      !url ||
      typeof url !== 'string' ||
      (!url.startsWith('http://') && !url.startsWith('https://'))
    ) {
      return e.badRequestError('URL inválida. Use https://exemplo.com')
    }

    console.log('Acessando URL')
    let htmlRes
    try {
      htmlRes = $http.send({
        url: url,
        method: 'GET',
        headers: {
          'User-Agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        },
        timeout: 15,
      })
    } catch (err) {
      return e.badRequestError(
        'Não consegui acessar a URL. Verifique se está correta e acessível.',
      )
    }

    if (!htmlRes || htmlRes.statusCode !== 200) {
      return e.badRequestError(
        'Não consegui acessar a URL. Verifique se está correta e acessível.',
      )
    }

    console.log('Extraindo conteúdo')
    let rawHtml = htmlRes.string || ''

    rawHtml = rawHtml.replace(/<!--[\s\S]*?-->/g, '')
    rawHtml = rawHtml.replace(
      /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
      '',
    )
    rawHtml = rawHtml.replace(
      /<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi,
      '',
    )

    const cheerio = require('cheerio')
    const $ = cheerio.load(rawHtml)

    let contentStr = ''
    let foundSelector = ''

    const selectors = [
      'article',
      'main',
      '[role="main"]',
      '.content',
      '.post-content',
      '.article-body',
      '.article-content',
      '.entry-content',
      '.post-body',
      '.blog-post',
      '.page-content',
      'body',
    ]

    for (const sel of selectors) {
      let bestText = ''
      $(sel).each((i, elem) => {
        const text = $(elem).text().replace(/\s+/g, ' ').trim()
        if (text.length > bestText.length) {
          bestText = text
        }
      })
      if (bestText.length >= 100) {
        contentStr = bestText
        foundSelector = sel
        break
      }
    }

    if (!contentStr || contentStr.length < 100) {
      return e.badRequestError(
        'Conteúdo não encontrado na URL. Tente outro link.',
      )
    }

    contentStr = contentStr.substring(0, 15000)

    console.log('Seletor encontrado: ' + foundSelector)
    console.log('Caracteres extraídos: ' + contentStr.length)

    const groqKey = $secrets.get('GROQ_API_KEY')
    if (!groqKey) {
      return e.internalServerError(
        'Chave de API Groq inválida. Verifique GROQ_API_KEY no PocketBase.',
      )
    }

    const executeGroq = (prompt) => {
      let retries = 0
      const backoff = [2000, 4000, 8000]
      let res

      const doCall = () => {
        try {
          return $http.send({
            url: 'https://api.groq.com/openai/v1/chat/completions',
            method: 'POST',
            headers: {
              Authorization: 'Bearer ' + groqKey,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              model: 'llama-3.3-70b-versatile',
              messages: [{ role: 'user', content: prompt }],
              temperature: 1.0,
              response_format: { type: 'json_object' },
            }),
            timeout: 45,
          })
        } catch (err) {
          return { statusCode: 0, error: err }
        }
      }

      res = doCall()
      while (res && res.statusCode === 503 && retries < 3) {
        const ms = backoff[retries]
        const start = new Date().getTime()
        while (new Date().getTime() < start + ms) {}
        res = doCall()
        retries++
      }

      if (res && res.statusCode === 401) {
        throw new Error('401')
      }

      if (!res || res.statusCode !== 200) {
        throw new Error('GROQ_ERROR')
      }

      try {
        let content = res.json.choices[0].message.content.trim()
        if (content.startsWith('```json')) {
          content = content.substring(7, content.length - 3).trim()
        } else if (content.startsWith('```')) {
          content = content.substring(3, content.length - 3).trim()
        }
        return JSON.parse(content)
      } catch (err) {
        throw new Error('PARSE_ERROR')
      }
    }

    try {
      console.log('Traduzindo')
      const translatePrompt = `Analise o texto a seguir. Identifique o idioma original.
Se NÃO estiver em português, traduza para português brasileiro mantendo o significado original:

${contentStr}

Se já estiver em português, apenas copie o texto original.
Retorne EXCLUSIVAMENTE um JSON com o formato:
{
  "idioma_original": "Inglês, Espanhol, Português, etc",
  "conteudo_traduzido": "texto traduzido ou original"
}`

      const transParsed = executeGroq(translatePrompt)
      const idiomaOriginal = transParsed.idioma_original || 'Desconhecido'
      const conteudoTraduzido = transParsed.conteudo_traduzido || contentStr

      console.log('Reescrevendo')
      console.log('Gerando SEO')
      const rewritePrompt = `Você é um especialista em tecnologia. Reescreva este conteúdo com suas próprias palavras, mantendo as informações principais mas com estrutura e linguagem diferentes. Evite plágio. Inclua exemplos práticos. Conteúdo original:

${conteudoTraduzido}

Além da reescrita, você deve extrair e gerar metadados de SEO.
Retorne EXCLUSIVAMENTE um JSON com o seguinte formato:
{
  "titulo": "Título extraído da primeira linha ou H1",
  "resumo": "Resumo do texto com cerca de 150 caracteres",
  "conteudo": "O texto reescrito estruturado em HTML apenas com tags <p>",
  "keywords": "5 palavras-chave relevantes em português, separadas por vírgula",
  "categoria": "Escolha exatamente UMA destas: IA, Segurança, Cloud, Infraestrutura"
}`

      const rewriteParsed = executeGroq(rewritePrompt)

      const plagioPrompt = `Compare o texto original com a versão reescrita. Avalie a similaridade de 0 a 100 (onde 100 é cópia exata).

Texto Original:
${conteudoTraduzido}

Versão Reescrita:
${rewriteParsed.conteudo}

Se a similaridade for <= 20, o status é "baixo". Se for entre 21 e 30, o status é "médio". Se for > 30, o status é "alto".
Retorne EXCLUSIVAMENTE um JSON com:
{
  "plagio_score": numero inteiro,
  "plagio_status": "baixo", "médio" ou "alto"
}`

      const plagioParsed = executeGroq(plagioPrompt)

      const score = plagioParsed.plagio_score || 0
      const statusPlagio =
        plagioParsed.plagio_status ||
        (score > 30 ? 'alto' : score > 20 ? 'médio' : 'baixo')

      const responseData = {
        titulo: rewriteParsed.titulo,
        resumo: rewriteParsed.resumo,
        conteudo: rewriteParsed.conteudo,
        keywords: rewriteParsed.keywords,
        categoria: rewriteParsed.categoria,
        idioma_original: idiomaOriginal,
        url_fonte: url,
        plagio_score: score,
        plagio_status: statusPlagio,
      }

      if (score > 30) {
        responseData.warning =
          'Conteúdo muito similar ao original. Reescreva manualmente ou aumente o nível de reescrita.'
      }

      return e.json(200, responseData)
    } catch (err) {
      if (err.message === '401') {
        return e.internalServerError(
          'Chave de API Groq inválida. Verifique GROQ_API_KEY no PocketBase.',
        )
      }
      return e.internalServerError(
        'Erro ao processar conteúdo com IA. Tente novamente.',
      )
    }
  },
  $apis.requireAuth(),
)
