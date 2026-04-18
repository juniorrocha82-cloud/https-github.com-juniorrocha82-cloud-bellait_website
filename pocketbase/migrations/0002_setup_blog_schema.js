migrate(
  (app) => {
    // 1. Update users collection
    const users = app.findCollectionByNameOrId('_pb_users_auth_')
    if (!users.fields.getByName('role')) {
      users.fields.add(
        new SelectField({
          name: 'role',
          values: ['admin', 'visitante'],
          maxSelect: 1,
        }),
      )
      app.save(users)
    }

    // 2. Create artigos collection
    const artigos = new Collection({
      name: 'artigos',
      type: 'base',
      listRule: "status = 'publicado' || @request.auth.role = 'admin'",
      viewRule: "status = 'publicado' || @request.auth.role = 'admin'",
      createRule: "@request.auth.role = 'admin'",
      updateRule: "@request.auth.role = 'admin'",
      deleteRule: "@request.auth.role = 'admin'",
      fields: [
        { name: 'titulo', type: 'text', required: true },
        { name: 'slug', type: 'text', required: true },
        { name: 'resumo', type: 'text', max: 150 },
        { name: 'conteudo', type: 'editor', required: true },
        {
          name: 'imagem',
          type: 'file',
          maxSelect: 1,
          maxSize: 5242880,
          mimeTypes: ['image/jpeg', 'image/png', 'image/webp'],
        },
        { name: 'autor', type: 'text' },
        { name: 'data_publicacao', type: 'date' },
        { name: 'tempo_leitura', type: 'number' },
        {
          name: 'status',
          type: 'select',
          values: ['rascunho', 'publicado'],
          maxSelect: 1,
        },
        { name: 'seo_title', type: 'text' },
        { name: 'seo_description', type: 'text' },
        { name: 'seo_keywords', type: 'text' },
        {
          name: 'categoria',
          type: 'select',
          values: ['IA', 'Segurança', 'Cloud', 'Infraestrutura'],
          maxSelect: 1,
        },
        {
          name: 'user_id',
          type: 'relation',
          collectionId: '_pb_users_auth_',
          maxSelect: 1,
        },
        { name: 'created', type: 'autodate', onCreate: true, onUpdate: false },
        { name: 'updated', type: 'autodate', onCreate: true, onUpdate: true },
      ],
      indexes: ['CREATE UNIQUE INDEX idx_artigos_slug ON artigos (slug)'],
    })
    app.save(artigos)
  },
  (app) => {
    const artigos = app.findCollectionByNameOrId('artigos')
    app.delete(artigos)

    const users = app.findCollectionByNameOrId('_pb_users_auth_')
    users.fields.removeByName('role')
    app.save(users)
  },
)
