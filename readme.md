determine if an [OpenStreetMap](http://openstreetmap.org/) entry is an [area](https://wiki.openstreetmap.org/wiki/Area) or not.

this package uses
[osm-polygon-features](https://www.npmjs.com/package/osm-polygon-features) to
determine if some closed ways should be treated as polygons or lines.

# example

```
var osmIsArea = require('osm-is-area')

// first and last ref match, but { highway: 'service' } is not an area:

console.log(osmIsArea({
  type: 'way',
  id: 4421943,
  tags: { highway: 'service' },
  refs: [ 27119458, 1764217171, 27119461, 1069372913,
    1764230257, 5530415689, 1764230254, 27119458]
})) // false


// first and last ref match; { waterway: 'riverbank' } is a valid area:

console.log(osmIsArea({
  type: 'way',
  id: 23873915,
  tags: { waterway: 'riverbank' },
  refs: [ 3584796914, 4856390070, 4856390069, 4856390067, 258759210, 997025704, 997024369, 3584796914 ]
})) // true

// first and last ref don't match - not a closed way:

console.log(osmIsArea({
  type: 'way',
  id: 4421935,
  tags: { highway: 'primary', surface: 'asphalt' },
  refs: [ 746891652, 408306337, 27119389, 1687103099, 730024891, 1035333171, 746891666 ]
})) // false

// first and last ref match; { natural: 'wood' } is a valid area:

console.log(osmIsArea({
  type: 'way',
  id: 23874706,
  tags: { name: 'Щербачевский лес', natural: 'wood' },
  refs: [ 1125622707, 1007659859, 1125622501, 1125622605, 1125622588, 1007659898, 1125622707 ]
})) // true

// first and last ref match; { boundary: 'protected area' } is a valid area:

console.log(osmIsArea({
  type: 'way',
  id: 34333478,
  tags: { name: 'Лісовий заказник «Григорівський бір»', boundary: 'protected_area' },
  refs: [ 393849373, 1010883354, 1010883623, 393849376, 1010883341, 393849377, 393849373 ]
})) // true
```

to try this example on your own machine, clone this repository, navigate to the
directory you cloned into, and run `npm run example`.

# api

```
var osmIsArea = require('osm-is-area')
```

## osmIsArea(entry)

takes an osm `entry` object and returns `true` or `false`.

input osm objects should be formatted as
[osm-pbf-parser](https://www.npmjs.com/package/osm-pbf-parser) returns them.
specifically, this module expects:

* type - a string specifying `'node'`, `'way'`, or `'relation'`
* tags - an object mapping osm tag keys to values
* refs - an array of osm id's as numbers (only relevant for ways)
* members - an array of member objects (only relevant for relations)

the only thing that's relevant about the `members` array is whether it's empty
(module will return `false` if this is the case).

this module assumes that all relations of type `'multipolygon'` are areas, and
that no other relations are areas. learn more about
[relation:multipolygon](https://wiki.openstreetmap.org/wiki/Relation:multipolygon).

# license

MIT
