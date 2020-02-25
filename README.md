# agnostic-http-error-handler
Node.js framework agnostic HTTP error handler.

## Usage 

### Express.js
```js
const { express: errMiddleware } = require('agnostic-http-error-handler')()

const service = require('express')()
service.get('/throw', (req, res) => {
  throw new Error('Upps!')
})

service.use(errMiddleware)

service.listen(3000)
```

### Restana
```js
const { restana: errorHandler } = require('agnostic-http-error-handler')()
const service = require('restana')({
  errorHandler
})

service.get('/throw', (req, res) => {
  throw new Error('Upps!')
})

service.start()

```

### Native
```js
const { native: errorHandler } = require('agnostic-http-error-handler')()
...
server.on('request', (req, res) => {
  try {
    // request handler logic...
  } catch (err) {
    errorHandler(err, req, res)
  }
})
```

### Pre-Error-Handler callback
In case you would like to extend the error processing logic of your application, you can use the `preErrorHandler` configuration callback:
```js
const logger = require('...')
const { native: errorHandler } = require('agnostic-http-error-handler')((err, responsePayload, req, res) => {
  logger.error(`Unexpected error while processing "${req.method} ${req.url}" request`, err)
})

...
server.on('request', (req, res) => {
  try {
    // request handler logic...
  } catch (err) {
    errorHandler(err, req, res)
  }
})
```

> NOTE: In case the `preErrorHandler` invocation response can be coerce as a TRUE value, sending the `responsePayload` to the client is aborted. 

## Sponsors
- Kindly sponsored by [ShareNow](https://www.share-now.com/), a company that promotes innovation!  