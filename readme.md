determine if an [http://openstreetmap.org/](OpenStreetMap) entry is an [https://wiki.openstreetmap.org/wiki/Area](area) or not.


# example

```
var osmIsArea = require('../index.js')
var entries = [
  { 'type': 'way',
    'id': 4421943,
    'tags': { 'highway': 'service' },
    'refs':
     [ 27119458,
       1764217171,
       27119461,
       1069372913,
       2681824362,
       1069372626,
       1764230249,
       1764230245,
       1764230252,
       1764230257,
       5530415689,
       1764230254,
       27119458] },
  { 'type': 'way',
    'id': 23873915,
    'tags': { 'waterway': 'riverbank' },
    'refs':
     [ 3584796914,
       4856390070,
       4856390069,
       4856390067,
       1003530924,
       1003530997,
       1003531088,
       997023023,
       997021214,
       1003530837,
       258759210,
       997025704,
       997024369,
       3584796914 ]},
  { 'type': 'way',
    'id': 4421935,
    'tags':
     { 'highway': 'primary',
       'surface': 'asphalt' },
    'refs':
     [ 746891652,
       408306337,
       1973511025,
       27119389,
       1687103092,
       1687103094,
       746891616,
       1069614313,
       6109044148,
       746891644,
       408299491,
       1069613404,
       1687103099,
       730024891,
       1035333171,
       746891666 ] },
  { 'type': 'way',
    'id': 23874706,
    'tags': { 'name': 'Щербачевский лес', 'natural': 'wood' },
    'refs':
     [ 1125622707,
       1007659859,
       1125622501,
       1125622593,
       258769096,
       5341012025,
       5341012024,
       1125622552,
       1125622605,
       1125622588,
       1007659898,
       1125622707 ] },
  { 'type': 'way',
    'id': 34333478,
    'tags':
     { 'name': 'Лісовий заказник «Григорівський бір»',
       'boundary': 'protected_area' },
    'refs':
     [ 393849373,
       1010883354,
       1010883623,
       3614537224,
       393849374,
       393849375,
       1010883316,
       2833250317,
       1010883465,
       393849376,
       1010883341,
       393849377,
       393849373 ] }
]

entries.forEach(function (entry) {
  console.log(osmIsArea(entry))
})
```

running the above example will return:

```
false
true
false
true
true
```

to try this example on your own machine, clone this repository, navigate to the
directory you cloned into, and run `npm run example`.
