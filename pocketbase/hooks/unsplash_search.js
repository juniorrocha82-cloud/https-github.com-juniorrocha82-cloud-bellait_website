routerAdd(
  'GET',
  '/backend/v1/unsplash/search',
  (e) => {
    const query = e.request.url.query().get('q')
    const apiKey = $secrets.get('UNSPLASH_ACCESS_KEY')

    if (!apiKey) {
      return e.json(500, {
        error:
          'Chave da API Unsplash não configurada. Adicione UNSPLASH_ACCESS_KEY nas variáveis do servidor.',
      })
    }

    const res = $http.send({
      url:
        'https://api.unsplash.com/search/photos?query=' +
        encodeURIComponent(query || 'technology') +
        '&per_page=12&orientation=landscape',
      method: 'GET',
      headers: {
        Authorization: 'Client-ID ' + apiKey,
      },
      timeout: 15,
    })

    if (res.statusCode !== 200) {
      return e.json(res.statusCode, {
        error: 'Erro ao buscar imagens no Unsplash.',
      })
    }

    return e.json(200, res.json)
  },
  $apis.requireAuth(),
)
