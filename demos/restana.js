const { restana: errorHandler } = require('./../index')()

const service = require('restana')({
  errorHandler
})

service.get('/throw', (req, res) => {
  throw new Error('Upps!')
})

service.start()
