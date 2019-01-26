var polygonFeatures = require('osm-polygon-features')
var testWays = require('./testways.js')

function testKey (tagKey, listValue) {
  var isArea = false
  polygonFeatures.forEach(function (obj) {
    if (tagKey === obj.key && obj.polygon === 'all') {
      isArea = true
    }
    else if (tagKey === obj.key && obj.polygon === 'whitelist') {
      obj.values.forEach(function (val) {
        if (listValue === val) { isArea = true } 
      })
    }
    else if (tagKey === obj.key && obj.polygon === 'blacklist') {
      isArea = true  
      obj.values.forEach(function (val) {
        if (listValue === val) { isArea = false }
      })
    }
  })
  return isArea
}

module.exports = function isArea (tags) {
  var tagKeys = Object.keys(tags)
  var result = false
  tagKeys.forEach(function (key) {
    result = result || testKey(key, tags[key])
  })
  return result
}
