var polygonFeatures = require('osm-polygon-features')

module.exports = function testItem (item) {
  var isArea = false
  if (item.type === 'node') { isArea = false }
  else if (item.type === 'way' && item.refs.length < 3) { isArea = false }
  else if (item.type === 'way' && (
    item.refs[0] === item.refs[item.refs.length - 1]
    || (Array.isArray(item.refs[0])
      && item.refs[0][0] === item.refs[item.refs.length - 1][0]
      && item.refs[0][1] === item.refs[item.refs.length - 1][1])
  )) {
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
  }
  else if (item.type === 'relation')  { 
    if (!Array.isArray(item.members) || item.members.length === 0) {
      isArea = false
    }
    else if (item.tags.type === 'multipolygon') { 
      isArea = true
    }
    else isArea = false
  }
  return isArea 
}
