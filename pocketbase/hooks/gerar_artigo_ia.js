routerAdd(
  'POST',
  '/backend/v1/artigos/gerar-ia',
  (e) => {
    const body = e.requestInfo().body || {}
    const tema = body.tema
    if (!tema) return e.badRequestError('Tema é obrigatório')

    const apiKey = $secrets.get('GOOGLE_CLOUD_KEY')
    if (!apiKey)
      return e.internalServerError('API Key GOOGLE_CLOUD_KEY não configurada')

    const categoria = body.categoria || 'Tecnologia'
    const tom = body.tom || 'Técnico'
    const comprimento = body.comprimento || 'Médio'

    let wordCount = 500
    if (comprimento === 'Médio') wordCount = 1000
    if (comprimento === 'Longo') wordCount = 1500

    const prompt =
      'Você é um redator técnico especialista da Bella IT. Escreva um artigo sobre o tema: ' +
      tema +
      '.\n' +
      'Categoria: ' +
      categoria +
      '.\n' +
      'Tom: ' +
      tom +
      '.\n' +
      'Tamanho aproximado: ' +
      wordCount +
      ' palavras.\n' +
      'Retorne APENAS um objeto JSON válido (sem markdown de bloco de código, sem formatação, apenas o JSON puro) com a seguinte estrutura:\n' +
      '{"titulo": "Título Gerado", "resumo": "Resumo curto de até 150 caracteres", "conteudo": "Conteúdo formatado em HTML com tags como <p>, <ul>, <li> e <strong>", "keywords_sugeridas": "tag1, tag2, tag3"}'

    let attempt = 0
    const maxAttempts = 4
    const delays = [2000, 4000, 8000]
    let res = null

    while (attempt < maxAttempts) {
      res = $http.send({
        url:
          'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent?key=' +
          apiKey,
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: {
            responseMimeType: 'application/json',
          },
        }),
        timeout: 120,
      })

      if (res.statusCode === 503 && attempt < 3) {
        const delay = delays[attempt]
        const start = new Date().getTime()
        while (new Date().getTime() < start + delay) {
          // Exponencial backoff: busy wait until the delay is over
        }
        attempt++
        continue
      } else if (res.statusCode === 401) {
        return e.internalServerError(
          'Credenciais inválidas. Verifique a validade da chave GOOGLE_CLOUD_KEY.',
        )
      } else if (res.statusCode !== 200) {
        console.log('Erro da API Gemini:', res.raw)
        return e.internalServerError('Falha na geração via IA')
      } else {
        break
      }
    }

    try {
      const rawText = res.json.candidates[0].content.parts[0].text
      let parsed
      try {
        parsed = JSON.parse(rawText)
      } catch (err) {
        const cleanText = rawText
          .replace(/```json/g, '')
          .replace(/```/g, '')
          .trim()
        parsed = JSON.parse(cleanText)
      }
      return e.json(200, parsed)
    } catch (err) {
      console.log('Erro ao interpretar JSON da IA:', err)
      return e.internalServerError(
        'Resposta inválida da Inteligência Artificial',
      )
    }
  },
  $apis.requireAuth(),
)
