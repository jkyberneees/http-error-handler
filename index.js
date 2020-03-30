const HttpStatus = require('http-status-codes')
const send = require('@polka/send-type')

module.exports = (preErrorHandler = () => {}) => {
  function native (err, req, res) {
    const status = err.isBoom ? err.output.statusCode
          : err.response ? (err.response.status || err.response.statusCode)
            : err.status || 500

    const responsePayload = {
      error: HttpStatus.getStatusText(status),
      message: err.isBoom ? err.output.payload.message : err.message,
      statusCode: status
    }

    return preErrorHandler(err, responsePayload, req, res) || send(res, status, responsePayload)
  }

  return {
    express: (err, req, res, next) => native(err, req, res),

    restana: (err, req, res) => native(err, req, res),

    native: native
  }
}
