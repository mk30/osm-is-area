var isArea = require('../')
var test = require('tape')

test('is-area', function (t) {
  t.notOk(isArea({ 'type' : 'node' }), 'node')
  t.ok(isArea({ 
    'type' : 'way',
    'refs' : [ 258759125, 1124987434, 1625196725, 258759125 ],
    'tags' : { 'name': 'Щербачевский лес', 'natural' : 'wood' }
  }), 'natural: wood')
  t.ok(isArea({ 
    'type' : 'way',
    'refs' : [ [ 36.282718, 50.0142346 ], [ 36.283346300000005,
                50.013636600000005 ], [ 36.282718, 50.0142346 ] ],
    'tags' : { 'name': 'Щербачевский лес', 'natural' : 'wood' }
  }), 'natural: wood ; dereferenced')
  t.notOk(isArea({ 
    'type' : 'way',
    'refs' : [ 258759125 ],
    'tags' : { 'name': 'Щербачевский лес', 'natural' : 'wood' }
  }), 'way with less than 3 refs')
  t.notOk(isArea({ 
    'type' : 'way',
    'refs' : [ 295875125, 1249874134, 6625196725, 453667909 ],
    'tags' : { 'highway' : 'service' }
  }), 'not a closed way')
  t.notOk(isArea({ 
    'type' : 'way',
    'refs' : [ [ 36.282718, 50.0142346 ], [ 36.283346300000005,
                50.013636600000005 ], [ 36.3, 50.16 ] ],
    'tags' : { 'highway' : 'service' }
  }), 'not a closed way ; dereferenced')
  t.ok(isArea({ 
    'type' : 'way',
    'refs' : [ 753667909, 2114987434, 7625196725, 753667909 ],
    'tags' : { 'area': 'yes', 'name': '6 платформа', 'railway': 'platform' }
  }), 'area: yes')
  t.ok(isArea({ 
    'type' : 'way',
    'refs' : [ 753667909, 2114987434, 7625196725, 753667909 ],
    'tags' : { 'name': 'Лісовий заказник «Григорівський бір»', 'boundary': 'protected_area' }
  }), 'boundary: protected_area')
  t.notOk(isArea({ 
    'type' : 'way',
    'refs' : [ 753667909, 2114987434, 7625196725, 753667909 ],
    'tags' : {}
  }), 'empty tags object')
  t.ok(isArea({ 
    'type' : 'way',
    'refs' : [ 753667909, 2114987434, 7625196725, 753667909 ],
    'tags' : { 'fee': 'no', 'amenity': 'parking', 'parking': 'surface' }
  }), 'amenity: parking')
  t.ok(isArea({ 
    'type' : 'way',
    'refs' : [ 753667909, 2114987434, 7625196725, 753667909 ],
    'tags' : { 'name': 'Завод ім. Малишева', 'landuse': 'industrial', 'name:ru': 'Завод им. Малышева'}
  }), 'landuse: industrial')
  t.ok(isArea({ 
    'type' : 'way',
    'refs' : [ 753667909, 2114987434, 7625196725, 753667909 ],
    'tags' : { 'waterway': 'riverbank' }
  }), 'waterway: riverbank')
  t.ok(isArea({ 
    'type' : 'way',
    'refs' : [ 753667919, 2114987434, 7625196725, 753667919 ],
    'tags' : { 'name': 'Зустріч', 'leisure': 'park', 'name:ru': 'Парк «Зустрич»' }
  }), 'leisure: park')
  t.notOk(isArea({ 
    'type' : 'way',
    'refs' : [ 753667919, 2114987434, 7625196725, 753667919 ],
    'tags' : { 'name': 'Роганка', 'name:en': 'Rohanka', 'name:ru': 'Роганка', 'waterway': 'river' }
  }), 'waterway: river')
  t.ok(isArea({ 
    'type' : 'way',
    'refs' : [ 753667919, 2114987434, 7625196725, 753667919 ],
    'tags' : { 'name': 'Харківський Політехнічний Інститут', 'amenity': 'university', 'name:de': 'Polytechnisches Institut Charkiw', 'name:en': 'Kharkiv Polytechnic Institute', 'name:uk': 'Харківський Політехнічний Інститут', 'name:zh': '哈尔科夫理工学院', 'website': 'http://www.kpi.kharkov.ua', 'wikidata': 'Q1164068' }
  }), 'amenity: university')
  t.notOk(isArea({ 
    'type' : 'way',
    'refs' : [ 753667919, 2114987434, 7625196725, 753667919 ],
    'tags' : { 'layer': '-5', 'tunnel': 'yes', 'railway': 'subway' }
  }), 'railway: subway')
  t.ok(isArea({ 
    'type' : 'way',
    'refs' : [ 753667919, 2114987434, 7625196725, 753667919 ],
    'tags' : { 'amenity': 'place_of_worship', 'building': 'yes', 'religion': 'muslim' }
  }), 'amenity & building')
  t.notOk(isArea({ 
    'type' : 'way',
    'refs' : [ 611167919, 2114987434, 7625196725, 611167919 ],
    'tags' : { 'highway': 'unclassified' }
  }), 'highway: unclassified')
  t.notOk(isArea({ 
    'type' : 'way',
    'refs' : [ 611167919, 2114987434, 7625196725, 611167919 ],
    'tags' : { 'name': 'Новаторський в’їзд', 'highway': 'service', 'name:ru': 'Новаторский въезд', 'name:uk': 'Новаторський в’їзд' }
  }), 'highway: service')
  t.notOk(isArea({ 
    'type' : 'way',
    'refs' : [ 611167919, 2114987434, 7625196725, 611167919 ],
    'tags' : { railway: 'subway', service: 'yard' }
  }), 'service: yard')
  t.notOk(isArea({ 
    'type' : 'way',
    'refs' : [ 611167919, 2114987434, 7625196725, 611167919 ],
    'tags' : { 'barrier': 'fence' }
  }), 'barrier: fence')
  t.notOk(isArea({ 
    'type' : 'way',
    'refs' : [ 611167919, 2114987434, 7625196725, 611167919 ],
    'tags' : { 'gauge': '1520', 'usage': 'main', 'building': 'no', 'voltage': '3000', 'frequency': '0', 'electrified': 'contact_line' }
  }), 'building: no')
  t.notOk(isArea({ 
    'type' : 'way',
    'refs' : [ 2372943315, 2372943316, 2372943317 ],
    'tags' : { boundary: 'administrative', admin_level: '4' }
  }), 'not a closed way')


//relations

  t.ok(isArea({
    'type': 'relation',
    'tags': { 'type' : 'multipolygon'},
    'members': [
      {
        'type': 'way',
        'id': 5,
        'role': 'outer'
      },
      {
        'type': 'way',
        'id': 4,
        'role': 'outer'
      }
    ]
  }), 'tag type multipolygon')
  t.notOk(isArea({
    'type': 'relation',
    'tags': {},
    'members': [
      {
        'type': 'way',
        'id': 4,
        'role': 'outer'
      },
      {
        'type': 'way',
        'id': 6,
        'role': 'outer'
      },
      {
        'type': 'way',
        'id': 5,
        'role': 'outer'
      }
    ]
  }), 'not multipolygon')

  t.end()
})
