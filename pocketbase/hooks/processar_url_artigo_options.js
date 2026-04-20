routerAdd('OPTIONS', '/backend/v1/artigos/processar-url', (e) => {
  e.response.header().set('Access-Control-Allow-Origin', '*')
  e.response
    .header()
    .set('Access-Control-Allow-Headers', 'authorization, apikey, content-type')
  return e.noContent(204)
})
