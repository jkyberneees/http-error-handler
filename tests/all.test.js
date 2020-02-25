/* global describe, it */
const expect = require('chai').expect
const boom = require('boom')

describe('Test Suite', () => {
  let expressMiddleware
  let restanaErrorHandler
  let native

  it('initialize', function (done) {
    const module = require('./../index')(
      (err, responsePayload, req, res) => {
        err.extended = true
        responsePayload.extended = true

        return { err, responsePayload, req, res }
      },
      () => {}
    )

    expressMiddleware = module.express
    restanaErrorHandler = module.restana
    native = module.native

    done()
  })

  it('express', function (done) {
    const { err, responsePayload } = expressMiddleware(new Error('Upps!'), {}, {}, () => {})
    expect(err.message).to.equals('Upps!')
    expect(err.extended).to.equals(true)
    expect(responsePayload.extended).to.equals(true)
    expect(responsePayload.error).to.equals('Server Error')
    expect(responsePayload.message).to.equals('Upps!')
    expect(responsePayload.statusCode).to.equals(500)

    done()
  })

  it('restana', function (done) {
    const { err, responsePayload } = restanaErrorHandler(boom.notFound('Resource not found!'), {}, {})
    expect(err.isBoom).to.equals(true)
    expect(err.extended).to.equals(true)
    expect(responsePayload.extended).to.equals(true)
    expect(responsePayload.error).to.equals('Not Found')
    expect(responsePayload.message).to.equals('Resource not found!')
    expect(responsePayload.statusCode).to.equals(404)

    done()
  })

  it('native', function (done) {
    const { err, responsePayload } = native(new Error('Upps!'), {}, {})
    expect(err.message).to.equals('Upps!')
    expect(err.extended).to.equals(true)
    expect(responsePayload.extended).to.equals(true)

    done()
  })
})
