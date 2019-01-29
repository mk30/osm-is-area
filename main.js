var polygonFeatures = require('osm-polygon-features')

function testItem (item) {
  var isArea = false
  if (item.type === 'node') { isArea = false }
  else if (item.type === 'way' && item.refs[0] === item.refs[item.refs.length - 1]) {
    if (item.tags === {}) { isArea = false }
    if (item.tags['area'] === 'no') { isArea = false }
    else polygonFeatures.forEach(function (obj) {
      for (var key in item.tags) {
        if (key === obj.key && obj.polygon === 'all' && item.tags[key] !== 'no') {
          isArea = true
        }
        if (key === obj.key && obj.polygon === 'whitelist') {
          obj.values.forEach(function (val) {
            if (item.tags[key] === val) { isArea = true } 
          })
        }
        if (key === obj.key && obj.polygon === 'blacklist') {
          isArea = true  
          obj.values.forEach(function (val) {
            if (item.tags[key] === val) { isArea = false }
          })
        }
      }
    })
    return isArea
  }
  else if (item.type === 'relation')  { console.log('relation'); return false }
}

module.exports = function isArea (itemArray) {
  var result = false
  itemArray.forEach(function (item) {
    result = result || testItem(item)
  })
  return result
}
