## aframe-globe-component

[![Version](http://img.shields.io/npm/v/aframe-globe-component.svg?style=flat-square)](https://npmjs.org/package/aframe-globe-component)
[![License](http://img.shields.io/npm/l/aframe-globe-component.svg?style=flat-square)](https://npmjs.org/package/aframe-globe-component)

A 3D Globe component for data visualization using [A-Frame](https://aframe.io).

<p align="center">
  <a href="https://vasturiano.github.io/aframe-globe-component/"><img width="80%" src="https://vasturiano.github.io/aframe-globe-component/preview.png"></a>
</p>

An A-Frame entity component to represent data visualization layers on a globe, using a spherical projection.
Uses [three-globe](https://github.com/vasturiano/three-globe) as the underlying ThreeJS component to manage the globe object.

### API

#### Globe Layer

| Property | Description | Default Value |
| --- | --- | :--: |
| globe-image-url | Getter/setter for the URL of the image used in the material that wraps the globe. If no image is provided, the globe is represented as a black sphere. | `null` |
| bump-image-url | Getter/setter for the URL of the image used to create a [bump map](https://threejs.org/docs/#api/en/materials/MeshStandardMaterial.bumpMap) in the material, to represent the globe's terrain. | `null` |
| show-atmosphere | Getter/setter for whether to show a bright halo surrounding the globe, representing the atmosphere. | `true` |
| show-graticules | Getter/setter for whether to show a graticule grid demarking latitude and longitude lines at every 10 degrees. | `false` |

#### Points Layer

| Property | Description | Default Value |
| --- | --- | :--: |
| points-data | Getter/setter for the list of points to represent in the points map layer. Each point is displayed as a cylindrical 3D object rising perpendicularly from the surface of the globe. | `[]` |
| point-lat | Point object accessor function, attribute or a numeric constant for the cylinder's center latitude coordinate. | `lat` |
| point-lng | Point object accessor function, attribute or a numeric constant for the cylinder's center longitude coordinate. | `lng` |
| point-color | Point object accessor function or attribute for the cylinder color. | `() => '#ffffaa'` |
| point-altitude | Point object accessor function, attribute or a numeric constant for the cylinder's altitude in terms of globe radius units (`0` = 0 altitude (flat circle), `1` = globe radius). | 0.1 |
| point-radius | Point object accessor function, attribute or a numeric constant for the cylinder's radius, in angular degrees. | 0.25 |
| point-resolution | Getter/setter for the radial geometric resolution of each cylinder, expressed in how many slice segments to divide the circumference. Higher values yield smoother cylinders. | 12 |
| points-merge | Getter/setter for whether to merge all the point meshes into a single ThreeJS object, for improved rendering performance. Visually both options are equivalent, setting this option only affects the internal organization of the ThreeJS objects. | `false` |
| points-transition-duration | Getter/setter for duration (ms) of the transition to animate point changes involving geometry modifications. A value of `0` will move the objects immediately to their final position. New objects are animated by scaling them from the ground up. Only works if `points-merge` is disabled. | 1000 |

#### Arcs Layer

| Property | Description | Default Value |
| --- | --- | :--: |
| arcs-data | Getter/setter for the list of links to represent in the arcs map layer. Each link is displayed as an arc line that rises from the surface of the globe, connecting the start and end coordinates. | `[]` |
| arc-start-lat | Arc object accessor function, attribute or a numeric constant for the line's start latitude coordinate. | `startLat` |
| arc-start-lng | Arc object accessor function, attribute or a numeric constant for the line's start longitude coordinate. | `startLng` |
| arc-end-lat | Arc object accessor function, attribute or a numeric constant for the line's end latitude coordinate. | `endLat` |
| arc-end-lng | Arc object accessor function, attribute or a numeric constant for the line's end longitude coordinate. | `endLng` |
| arc-color | Arc object accessor function or attribute for the line's color. Also supports color gradients by passing an array of colors. | `() => '#ffffaa'` |
| arc-altitude | Arc object accessor function, attribute or a numeric constant for the arc's maximum altitude (ocurring at the half-way distance between the two points) in terms of globe radius units (`0` = 0 altitude (ground line), `1` = globe radius). If a value of `null` or `undefined` is used, the altitude is automatically set proportionally to the distance between the two points, according to the scale set in `arc-altitude-auto-scale`.  | `null` |
| arc-altitude-auto-scale | Arc object accessor function, attribute or a numeric constant for the scale of the arc's automatic altitude, in terms of units of the great-arc distance between the two points. A value of `1` indicates the arc should be as high as its length on the ground. Only applicable if `arc-altitude` is not set. | 0.5 |
| arc-stroke | Arc object accessor function, attribute or a numeric constant for the line's diameter, in angular degrees. A value of `null` or `undefined` will render a [ThreeJS Line](https://threejs.org/docs/#api/objects/Line) whose width is constant (`1px`) regardless of the camera distance. Otherwise, a [TubeGeometry](https://threejs.org/docs/#api/en/geometries/TubeGeometry) is used. | `null` |
| arc-curve-resolution | Getter/setter for the arc's curve resolution, expressed in how many straight line segments to divide the curve by. Higher values yield smoother curves. | 64 |
| arc-circular-resolution | Getter/setter for the radial geometric resolution of each line, expressed in how many slice segments to divide the tube's circumference. Only applicable when using Tube geometries (defined `arc-stroke`). | 6 |
| arc-dash-length | Arc object accessor function, attribute or a numeric constant for the length of the dashed segments in the arc, in terms of relative length of the whole line (`1` = full line length). | 1 |
| arc-dash-gap | Arc object accessor function, attribute or a numeric constant for the length of the gap between dash segments, in terms of relative line length. | 0 |
| arc-dash-initial-gap | Arc object accessor function, attribute or a numeric constant for the length of the initial gap before the first dash segment, in terms of relative line length. | 0 |
| arc-dash-animate-time | Arc object accessor function, attribute or a numeric constant for the time duration (in `ms`) to animate the motion of dash positions from the start to the end point for a full line length. A value of `0` disables the animation. | 0 |
| arcs-transition-duration | Getter/setter for duration (ms) of the transition to animate arc changes involving geometry modifications. A value of `0` will move the arcs immediately to their final position. New arcs are animated by rising them from the ground up. | 1000 |

#### Polygons Layer

| Property | Description | Default Value |
| --- | --- | :--: |
| polygons-data | Getter/setter for the list of polygon shapes to represent in the polygons map layer. Each polygon is displayed as a shaped cone that extrudes from the surface of the globe. | `[]` |
| polygon-geo-json-geometry | Polygon object accessor function or attribute for the GeoJson geometry specification of the polygon's shape. The returned value should have a minimum of two fields: `type` and `coordinates`. Only GeoJson geometries of type `Polygon` or `MultiPolygon` are supported, other types will be skipped. | `geometry` |
| polygon-cap-color | Polygon object accessor function or attribute for the color of the top surface. | `() => '#ffffaa'` |
| polygon-cap-material | Polygon object accessor function, attribute or material object for the [ThreeJS material](https://threejs.org/docs/#api/en/materials/Material) to use in the top surface. This property takes precedence over `polygon-cap-color`, which will be ignored if both are defined. | - |
| polygon-side-color | Polygon object accessor function or attribute for the color of the cone sides. | `() => '#ffffaa'` |
| polygon-side-material | Polygon object accessor function, attribute or material object for the [ThreeJS material](https://threejs.org/docs/#api/en/materials/Material) to use in the cone sides. This property takes precedence over `polygon-side-color`, which will be ignored if both are defined. | - |
| polygon-stroke-color | Polygon object accessor function or attribute for the color to stroke the polygon perimeter. A falsy value will disable the stroking. | - |
| polygon-altitude | Polygon object accessor function, attribute or a numeric constant for the polygon cone's altitude in terms of globe radius units (`0` = 0 altitude (flat polygon), `1` = globe radius). | 0.01 |
| polygon-cap-curvature-resolution | Polygon object accessor function, attribute or a numeric constant for the resolution (in angular degrees) of the cap surface curvature. The finer the resolution, the more the polygon is fragmented into smaller faces to approximate the spheric surface, at the cost of performance. | 5 |
| polygons-transition-duration | Getter/setter for duration (ms) of the transition to animate polygon altitude changes. A value of `0` will size the cone immediately to their final altitude. New polygons are animated by rising them from the ground up. | 1000 |

#### Paths Layer

| Property | Description | Default Value |
| --- | --- | :--: |
| paths-data | Getter/setter for the list of lines to represent in the paths map layer. Each path is displayed as a line that connects all the coordinate pairs in the path array. | `[]` |
| path-points | Path object accessor function, attribute or an array for the set of points that define the path line. By default, each path point is assumed to be a 2-position array (`[<lat>, <lon>]`). This default behavior can be modified using the `path-point-lat` and `path-point-lng` methods. | `pnts => pnts` |
| path-point-lat | Path point object accessor function, attribute or a numeric constant for the latitude coordinate. | `arr => arr[0]` |
| path-point-lng | Path point object accessor function, attribute or a numeric constant for the longitude coordinate. | `arr => arr[1]` |
| path-point-alt | Path point object accessor function, attribute or a numeric constant for the point altitude, in terms of globe radius units (`0` = 0 altitude (ground), `1` = globe radius). | 0.001 |
| path-resolution | Getter/setter for the path's angular resolution, in lat/lng degrees. If the ground distance (excluding altitude) between two adjacent path points is larger than this value, the line segment will be interpolated in order to approximate the curvature of the sphere surface. Lower values yield more perfectly curved lines, at the cost of performance. | 2 |
| path-color | Path object accessor function or attribute for the line's color. Also supports color gradients by passing an array of colors. Transparent colors are not supported in Fat Lines with set width. | `() => '#ffffaa'` |
| path-stroke | Path object accessor function, attribute or a numeric constant for the line's diameter, in angular degrees. A value of `null` or `undefined` will render a [ThreeJS Line](https://threejs.org/docs/#api/objects/Line) whose width is constant (`1px`) regardless of the camera distance. Otherwise, a [FatLine](https://github.com/vasturiano/three-fatline) is used. | `null` |
| path-dash-length | Path object accessor function, attribute or a numeric constant for the length of the dashed segments in the path line, in terms of relative length of the whole line (`1` = full line length). | 1 |
| path-dash-gap | Path object accessor function, attribute or a numeric constant for the length of the gap between dash segments, in terms of relative line length. | 0 |
| path-dash-initial-gap | Path object accessor function, attribute or a numeric constant for the length of the initial gap before the first dash segment, in terms of relative line length. | 0 |
| path-dash-animate-time | Path object accessor function, attribute or a numeric constant for the time duration (in `ms`) to animate the motion of dash positions from the start to the end point for a full line length. A value of `0` disables the animation. | 0 |
| path-transition-duration | Getter/setter for duration (ms) of the transition to animate path changes. A value of `0` will move the paths immediately to their final position. New paths are animated from start to end. | 1000 |

#### Hex Bin Layer

| Property | Description | Default Value |
| --- | --- | :--: |
| hex-bin-points-data | Getter/setter for the list of points to aggregate using the hex bin map layer. Each point is added to an hexagonal prism 3D object that represents all the points within a tesselated portion of the space. | `[]` |
| hex-bin-point-lat | Point object accessor function, attribute or a numeric constant for the latitude coordinate. | `lat` |
| hex-bin-point-lng | Point object accessor function, attribute or a numeric constant for the longitude coordinate. | `lng` |
| hex-bin-pointWeight | Point object accessor function, attribute or a numeric constant for the weight of the point. Weights for points in the same bin are summed and determine the hexagon default altitude. | 1 |
| hex-bin-resolution | The geographic binning resolution as defined by [H3](https://uber.github.io/h3/#/documentation/core-library/resolution-table). Determines the area of the hexagons that tesselate the globe's surface. Accepts values between `0` and `15`. Level 0 partitions the earth in 122 (mostly) hexagonal cells. Each subsequent level sub-divides the previous in roughly 7 hexagons. | 4 |
| hex-margin | The radial margin of each hexagon. Margins above `0` will create gaps between adjacent hexagons and serve only a visual purpose, as the data points within the margin still contribute to the hexagon's data. The margin is specified in terms of fraction of the hexagon's surface diameter. Values below `0` or above `1` are disadvised. This property also supports using an accessor method based on the hexagon's aggregated data, following the syntax: `hexMargin(({ points, sumWeight, center: { lat, lng }}) => ...)`. This method should return a numeric constant. | 0.2 |
| hex-altitude | The altitude of each hexagon, in terms of globe radius units (`0` = 0 altitude (flat hexagon), `1` = globe radius). This property also supports using an accessor method based on the hexagon's aggregated data, following the syntax: `hex-altitude(({ points, sumWeight, center: { lat, lng }}) => ...)`. This method should return a numeric constant. | `({ sumWeight }) => sumWeight * 0.01` |
| hex-top-curvature-resolution | The resolution (in angular degrees) of the top surface curvature. The finer the resolution, the more the top area is fragmented into smaller faces to approximate the spheric surface, at the cost of performance. | 5 |
| hex-top-color | Accessor method for each hexagon's top color. The method should follow the signature: `hexTopColor(({ points, sumWeight, center: { lat, lng }}) => ...)` and return a color string. | `() => '#ffffaa'` |
| hex-side-color | Accessor method for each hexagon's side color. The method should follow the signature: `hexSideColor(({ points, sumWeight, center: { lat, lng }}) => ...)` and return a color string. | `() => '#ffffaa'` |
| hex-bin-merge | Getter/setter for whether to merge all the hexagon meshes into a single ThreeJS object, for improved rendering performance. Visually both options are equivalent, setting this option only affects the internal organization of the ThreeJS objects. | `false` |
| hex-transition-duration | Getter/setter for duration (ms) of the transition to animate hexagon changes related to geometry modifications (altitude, radius). A value of `0` will move the hexagons immediately to their final position. New hexagons are animated by scaling them from the ground up. Only works if `hex-bin-merge` is disabled. | 1000 |

#### Hexed Polygons Layer

| Property | Description | Default Value |
| --- | --- | :--: |
| hex-polygons-data | Getter/setter for the list of polygon shapes to represent in the hexed polygons map layer. Each polygon is displayed as a tesselated group of hexagons that approximate the polygons shape according to the resolution specified in `hex-polygon-resolution`. | `[]` |
| hex-polygon-geo-json-geometry | Hexed polygon object accessor function or attribute for the GeoJson geometry specification of the polygon's shape. The returned value should have a minimum of two fields: `type` and `coordinates`. Only GeoJson geometries of type `Polygon` or `MultiPolygon` are supported, other types will be skipped. | `geometry` |
| hex-polygon-color | Hexed polygon object accessor function or attribute for the color of each hexagon in the polygon. | `() => '#ffffaa'` |
| hex-polygon-altitude | Hexed polygon object accessor function, attribute or a numeric constant for the polygon's hexagons altitude in terms of globe radius units (`0` = 0 altitude, `1` = globe radius). | 0.001 |
| hex-polygon-resolution | Hexed polygon object accessor function, attribute or a numeric constant for the geographic binning resolution as defined by [H3](https://uber.github.io/h3/#/documentation/core-library/resolution-table). Determines the area of the hexagons that tesselate the globe's surface. Accepts values between `0` and `15`. Level 0 partitions the earth in 122 (mostly) hexagonal cells. Each subsequent level sub-divides the previous in roughly 7 hexagons. | 3 |
| hex-polygon-margin | Hexed polygon object accessor function, attribute or a numeric constant for the radial margin of each hexagon. Margins above `0` will create gaps between adjacent hexagons within a polygon. The margin is specified in terms of fraction of the hexagon's surface diameter. Values below `0` or above `1` are disadvised. | 0.2 |
| hex-polygon-curvature-resolution | Hexed polygon object accessor function, attribute or a numeric constant for the resolution (in angular degrees) of each hexed polygon surface curvature. The finer the resolution, the more the polygon hexes are fragmented into smaller faces to approximate the spheric surface, at the cost of performance. | 5 |
| hex-polygons-transition-duration | Getter/setter for duration (ms) of the transition to animate hexed polygons altitude and margin changes. A value of `0` will move the hexagons immediately to their final state. New hexed polygons are animated by sizing each hexagon from `0` radius. | 0 |

### Tiles Layer

| Property | Description | Default Value |
| --- | --- | :--: |
| tiles-data | Getter/setter for the list of tiles to represent in the tiles map layer. Each tile is displayed as a spherical surface segment. The segments can be placed side-by-side for a tiled surface and each can be styled separately. | `[]` |
| tile-lat | Tile object accessor function, attribute or a numeric constant for the segment's centroid latitude coordinate. | `lat` |
| tile-lng | Tile object accessor function, attribute or a numeric constant for the segment's centroid longitude coordinate. | `lng` |
| tile-altitude | Tile object accessor function, attribute or a numeric constant for the segment's altitude in terms of globe radius units. | 0.01 |
| tile-width | Tile object accessor function, attribute or a numeric constant for the segment's longitudinal width, in angular degrees. | 1 |
| tile-height | Tile object accessor function, attribute or a numeric constant for the segment's latitudinal height, in angular degrees. | 1 |
| tile-use-globe-projection | Tile object accessor function, attribute or a boolean constant for whether to use the globe's projection to shape the segment to its relative tiled position (`true`), or break free from this projection and shape the segment as if it would be laying directly on the equatorial perimeter (`false`). | `true` |
| tile-material | Tile object accessor function, attribute or material object for the [ThreeJS material](https://threejs.org/docs/#api/en/materials/Material) used to style the segment's surface. | `() => new MeshLambertMaterial({ color: '#ffbb88' })` |
| tile-curvature-resolution | Tile object accessor function, attribute or a numeric constant for the resolution (in angular degrees) of the surface curvature. The finer the resolution, the more the tile geometry is fragmented into smaller faces to approximate the spheric surface, at the cost of performance. | 5 |
| tiles-transition-duration | Getter/setter for duration (ms) of the transition to animate tile changes involving geometry modifications. A value of `0` will move the tiles immediately to their final position. New tiles are animated by scaling them from the centroid outwards. | 1000 |

#### Labels Layer

| Property | Description | Default Value |
| --- | --- | :--: |
| labels-data | Getter/setter for the list of label objects to represent in the labels map layer. | `[]` |
| label-lat | Label object accessor function, attribute or a numeric constant for the latitude coordinate. | `lat` |
| label-lng | Label object accessor function, attribute or a numeric constant for the longitude coordinate. | `lng` |
| label-text | Label object accessor function or attribute for the label text. | `text` |
| label-color | Label object accessor function or attribute for the label color. | `() => 'lightgrey'` |
| label-altitude | Label object accessor function, attribute or a numeric constant for the label altitude in terms of globe radius units. | 0 |
| label-size | Label object accessor function, attribute or a numeric constant for the label text height, in angular degrees. | 0.5 |
| label-type-face | Getter/setter for the text font typeface JSON object. Supports any typeface font generated by [Facetype.js](http://gero3.github.io/facetype.js/). | [helvetiker regular](https://github.com/mrdoob/three.js/blob/dev/examples/fonts/helvetiker_regular.typeface.json) |
| label-rotation | Label object accessor function, attribute or a numeric constant for the label rotation in degrees. The rotation is performed clockwise along the axis of its latitude parallel plane. | 0 |
| label-resolution | Getter/setter for the text geometric resolution of each label, expressed in how many segments to use in the text curves. Higher values yield smoother labels. | 3 |
| label-include-dot | Label object accessor function, attribute or a boolean constant for whether to include a dot marker next to the text indicating the exact `lat`, `lng` coordinates of the label. If enabled the text will be rendered offset from the dot. | `true` |
| label-dot-radius | Label object accessor function, attribute or a numeric constant for the radius of the dot marker, in angular degrees. | 0.1 |
| label-dot-orientation | Label object accessor function or attribute for the orientation of the label if the dot marker is present. Possible values are `right`, `top` and `bottom`. | `() => 'bottom'` |
| labels-transition-duration | Getter/setter for duration (ms) of the transition to animate label changes involving position modifications (`lat`, `lng`, `altitude`, `rotation`). A value of `0` will move the labels immediately to their final position. New labels are animated by scaling their size. | 1000 |

#### Custom Layer

| Property | Description | Default Value |
| --- | --- | :--: |
| custom-layer-data | Getter/setter for the list of items to represent in the custom map layer. Each item is rendered according to the `customThreeObject` method. | `[]` |
| custom-three-object | Object accessor function or attribute for generating a custom 3d object to render as part of the custom map layer. Should return an instance of [ThreeJS Object3d](https://threejs.org/docs/index.html#api/core/Object3D). The callback method's signature includes the object's data as well as the globe radius: `customThreeObject((objData, globeRadius) => { ... })`. | `null` |
| custom-three-object-update | Object accessor function or attribute for updating an existing custom 3d object with new data. This can be used for performance improvement on data updates as the objects don't need to be removed and recreated at each update. The callback method's signature includes the object to be update, its new data and the globe radius: `customThreeObjectUpdate((obj, objData, globeRadius) => { ... })`. | `null` |

There are also internal methods that can be invoked via the [components object](https://aframe.io/docs/0.8.0/core/component.html#accessing-a-component%E2%80%99s-members-and-methods):

| Method | Arguments | Description |
| --- | --- | --- |
| globeMaterial | - | Access the internal ThreeJS [MeshPhongMaterial](https://threejs.org/docs/#api/en/materials/MeshPhongMaterial) used to wrap the globe. Can be used for more advanced styling of the globe. |
| getCoords | lat: <i>number</i>, lng: <i>number</i> [, altitude: <i>number</i>] | Utility method to translate spherical coordinates. Given a pair of latitude/longitude coordinates and optionally altitude (in terms of globe radius units), returns the equivalent `{x, y, z}` cartesian spatial coordinates. |
| toGeoCoords | { x: <i>number</i>, y: <i>number</i>, z: <i>number</i> } | Utility method to translate cartesian coordinates to the geographic domain. Given a set of 3D cartesian coordinates `{x, y, z}`, returns the equivalent `{lat, lng, altitude}` spherical coordinates. Altitude is defined in terms of globe radius units. |

#### Interaction

| Property | Description | Default Value |
| --- | --- | :--: |
| label | Globe item accessor function or attribute for name (shown in label). The item's data and object type are passed as an object: `{ data, type }`. | - |
| desc | Globe item accessor function or attribute for description (shown under label). The item's data and object type are passed as an object: `{ data, type }`. | - |
| on-center-hover | Callback function for globe item's hover events at the center of the viewport. The item's data and object type (or `null` if there's no object under the central line of sight) is included as the first argument, and the previous item (or null) as second argument. | - |

### Installation

#### Browser

Install and use by directly including the [browser files](dist):

```html
<head>
  <title>My A-Frame Scene</title>
  <script src="https://aframe.io/releases/1.0.0/aframe.min.js"></script>
  <script src="https://unpkg.com/aframe-globe-component/dist/aframe-globe-component.min.js"></script>
</head>

<body>
  <a-scene>
    <a-entity globe="points-data: [{ lat: 9.2, lng: 49.37 }, { lat: 23, lng: -125.4 }]"></a-entity>
  </a-scene>
</body>
```

#### npm

Install via npm:

```bash
npm install aframe-globe-component
```

Then require and use.

```js
require('aframe');
require('aframe-globe-component');
```

## Giving Back

[![paypal](https://www.paypalobjects.com/en_US/i/btn/btn_donate_SM.gif)](https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=L398E7PKP47E8&currency_code=USD&source=url) If this project has helped you and you'd like to contribute back, you can always [buy me a ☕](https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=L398E7PKP47E8&currency_code=USD&source=url)!
