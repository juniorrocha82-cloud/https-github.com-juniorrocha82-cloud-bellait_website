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
        timeout: 15,
      })
    } catch (err) {
      return e.badRequestError(
        'Não consegui acessar o conteúdo da URL. Verifique se o link está correto e acessível.',
      )
    }

    if (!htmlRes || htmlRes.statusCode !== 200) {
      return e.badRequestError(
        'Não consegui acessar o conteúdo da URL. Verifique se o link está correto e acessível.',
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

    const systemPrompt = `Você é um assistente especialista em tecnologia. Sua tarefa é ler o texto fornecido, traduzi-lo para Português do Brasil (se necessário), e reescrevê-lo em um tom profissional de especialista em tecnologia para evitar plágio, incluindo exemplos práticos quando aplicável.
Retorne EXCLUSIVAMENTE um objeto JSON válido com a seguinte estrutura:
{
  "titulo": "Título gerado com máximo de 70 caracteres",
  "resumo": "Resumo gerado com máximo de 150 caracteres",
  "conteudo": "Conteúdo completo reescrito em formato HTML estruturado",
  "keywords": "5 palavras-chave sugeridas em português, separadas por vírgula",
  "categoria": "IA" // Escolha APENAS UMA entre: IA, Segurança, Cloud, Infraestrutura
}`

    const callGroq = () => {
      return $http.send({
        url: 'https://api.groq.com/openai/v1/chat/completions',
        method: 'POST',
        headers: {
          Authorization: 'Bearer ' + groqKey,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'llama-3.3-70b-versatile',
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: 'Texto extraído:\n\n' + rawHtml },
          ],
          temperature: 0.7,
          response_format: { type: 'json_object' },
        }),
        timeout: 45,
      })
    }

    let aiRes = callGroq()
    let retries = 0
    const backoff = [2000, 4000, 8000]

    while (
      aiRes &&
      (aiRes.statusCode === 429 || aiRes.statusCode === 503) &&
      retries < 3
    ) {
      const ms = backoff[retries]
      const start = new Date().getTime()
      while (new Date().getTime() < start + ms) {}
      aiRes = callGroq()
      retries++
    }

    if (!aiRes || aiRes.statusCode !== 200) {
      return e.internalServerError(
        'Erro ao processar conteúdo com IA. Tente novamente.',
      )
    }

    try {
      let content = aiRes.json.choices[0].message.content.trim()
      if (content.startsWith('```json')) {
        content = content.substring(7, content.length - 3).trim()
      } else if (content.startsWith('```')) {
        content = content.substring(3, content.length - 3).trim()
      }

      const parsed = JSON.parse(content)

      const validCats = ['IA', 'Segurança', 'Cloud', 'Infraestrutura']
      if (!validCats.includes(parsed.categoria)) {
        parsed.categoria = 'IA'
      }

      return e.json(200, parsed)
    } catch (err) {
      return e.internalServerError('Erro ao interpretar resposta da IA.')
    }
  },
  $apis.requireAuth(),
)
