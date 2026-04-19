migrate(
  (app) => {
    const col = app.findCollectionByNameOrId('artigos')
    col.fields.add(new DateField({ name: 'data_agendada' }))
    app.save(col)
  },
  (app) => {
    const col = app.findCollectionByNameOrId('artigos')
    col.fields.removeByName('data_agendada')
    app.save(col)
  },
)
