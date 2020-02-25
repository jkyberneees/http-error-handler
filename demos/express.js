const { express: errMiddleware } = require('./../index')()

const service = require('express')()
service.get('/throw', (req, res) => {
  throw new Error('Upps!')
})

service.use(errMiddleware)

service.listen(3000)
