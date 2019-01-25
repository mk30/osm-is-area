var isArea = require('../')
var test = require('tape')

test('is-area', function (t) {
  t.ok(isArea({ 'natural' : 'wood' }))


  t.end()
})
