routerAdd('OPTIONS', '/backend/v1/artigos/gerar-ia', (e) => {
  e.response.header().set('Access-Control-Allow-Origin', '*')
  e.response
    .header()
    .set('Access-Control-Allow-Headers', 'authorization, apikey, content-type')
  return e.noContent(204)
})

routerAdd(
  'POST',
  '/backend/v1/artigos/gerar-ia',
  (e) => {
    e.response.header().set('Access-Control-Allow-Origin', '*')

    const body = e.requestInfo().body || {}
    const { tema, categoria, tom, comprimento } = body

    if (!tema || !categoria || !tom || !comprimento) {
      return e.json(400, {
        error:
          'Campos obrigatórios (tema, categoria, tom, comprimento) estão ausentes.',
      })
    }

    const apiKey = $secrets.get('GROQ_API_KEY')
    if (!apiKey) {
      return e.json(500, {
        error:
          'Chave de API Groq não configurada. Adicione GROQ_API_KEY no PocketBase Settings.',
      })
    }

    const prompt =
      'Você é um especialista em tecnologia. Gere um artigo sobre ' +
      tema +
      ' na categoria ' +
      categoria +
      ' com tom ' +
      tom +
      ' e aproximadamente ' +
      comprimento +
      ' palavras. Inclua: título (máx 70 caracteres), resumo (máx 150 caracteres), conteúdo estruturado em HTML com parágrafos e listas, e 5 keywords sugeridas em português.\n\n' +
      'Retorne APENAS um objeto JSON válido (sem markdown de bloco de código) com a seguinte estrutura:\n' +
      '{\n' +
      '  "titulo": "Título Gerado",\n' +
      '  "resumo": "Resumo curto...",\n' +
      '  "conteudo": "<p>Conteúdo HTML...</p>",\n' +
      '  "keywords_sugeridas": ["tag1", "tag2", "tag3", "tag4", "tag5"]\n' +
      '}'

    let attempt = 0
    const maxAttempts = 4
    const delays = [2000, 4000, 8000]
    let res = null

    while (attempt < maxAttempts) {
      res = $http.send({
        url: 'https://api.groq.com/openai/v1/chat/completions',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + apiKey,
        },
        body: JSON.stringify({
          model: 'llama-3.3-70b-versatile',
          messages: [{ role: 'user', content: prompt }],
          temperature: 1.0,
          response_format: { type: 'json_object' },
        }),
        timeout: 120,
      })

      if (res.statusCode === 429 && attempt < 3) {
        const delay = delays[attempt]
        const start = new Date().getTime()
        while (new Date().getTime() < start + delay) {
          // Exponencial backoff: busy wait until the delay is over
        }
        attempt++
        continue
      } else if (res.statusCode === 401) {
        return e.json(401, {
          error:
            'Chave de API Groq inválida. Verifique GROQ_API_KEY no PocketBase.',
        })
      } else if (res.statusCode !== 200) {
        console.log('Erro da API Groq:', res.raw)
        const errorMsg =
          res.json && res.json.error && res.json.error.message
            ? res.json.error.message
            : 'Falha na geração via IA'
        return e.json(500, {
          error: 'Erro ao comunicar com a API Groq. Detalhes: ' + errorMsg,
        })
      } else {
        break
      }
    }

    try {
      const rawText = res.json.choices[0].message.content
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
      return e.json(200, { data: parsed })
    } catch (err) {
      console.log('Erro ao interpretar JSON da IA:', err)
      return e.json(500, {
        error:
          'Resposta inválida da Inteligência Artificial. Falha ao interpretar JSON.',
      })
    }
  },
  $apis.requireAuth(),
)
