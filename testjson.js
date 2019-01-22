var polygonFeatures = require('osm-polygon-features')
var testWays = require('./testways.js')

function testKey (tagKey, listValue) {
  polygonFeatures.forEach(function (obj) {
    if (tagKey === obj.key && obj.polygon === 'all')
      console.log(obj.key)
    else if (tagKey === obj.key 
      && obj.polygon === 'whitelist'){
        obj.values.forEach(function (val) {
          if (listValue === val) console.log(val)
        })
    }
  })

}

testKey('natural', 'wood')
