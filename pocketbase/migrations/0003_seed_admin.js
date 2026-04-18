migrate(
  (app) => {
    const users = app.findCollectionByNameOrId('_pb_users_auth_')

    try {
      app.findAuthRecordByEmail('_pb_users_auth_', 'junior.rocha82@gmail.com')
      return // Already exists
    } catch (_) {}

    const record = new Record(users)
    record.setEmail('junior.rocha82@gmail.com')
    record.setPassword('Nixdorf82@')
    record.setVerified(true)
    record.set('name', 'Admin Junior')
    record.set('role', 'admin')

    app.save(record)
  },
  (app) => {
    try {
      const record = app.findAuthRecordByEmail(
        '_pb_users_auth_',
        'junior.rocha82@gmail.com',
      )
      app.delete(record)
    } catch (_) {}
  },
)
