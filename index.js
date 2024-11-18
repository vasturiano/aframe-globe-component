/* global AFRAME */

if (typeof AFRAME === 'undefined') {
  throw new Error('Component attempted to register before AFRAME was available.');
}

let accessorFn = require('accessor-fn');
if ('default' in accessorFn) {
  // unwrap default export
  accessorFn = accessorFn.default;
}

let ThreeGlobe = require('three-globe');
if ('default' in ThreeGlobe) {
  // unwrap default export
  ThreeGlobe = ThreeGlobe.default;
}

const parseJson = function (prop) {
  return (typeof prop === 'string')
    ? JSON.parse(prop)
    : prop; // already parsed
};

const parseFn = function (prop) {
  if (typeof prop === 'function') return prop; // already a function
  const geval = eval; // Avoid using eval directly https://github.com/rollup/rollup/wiki/Troubleshooting#avoiding-eval
  try {
    const evalled = geval('(' + prop + ')');
    return evalled;
  } catch (e) {} // Can't eval, not a function
  return null;
};

const parseAccessor = function (prop) {
  if (!isNaN(parseFloat(prop))) { return parseFloat(prop); } // parse numbers
  if (parseFn(prop)) { return parseFn(prop); } // parse functions
  return prop; // strings
};

/**
 * 3D Globe component for A-Frame.
 */
AFRAME.registerComponent('globe', {
  schema: {
    onHover: { parse: parseFn, default: null },
    onClick: { parse: parseFn, default: null },
    globeImageUrl: { type: 'string', default: '' },
    bumpImageUrl: { type: 'string', default: '' },
    showGlobe: { type: 'boolean', default: true },
    showGraticules: { type: 'boolean', default: false },
    showAtmosphere: { type: 'boolean', default: true },
    atmosphereColor: { type: 'string', default: 'lightskyblue' },
    atmosphereAltitude: { type: 'number', default: 0.15 },
    onGlobeReady: { parse: parseFn, default: null },
    pointsData: { parse: parseJson, default: [] },
    pointLat: { parse: parseAccessor, default: 'lat' },
    pointLng: { parse: parseAccessor, default: 'lng' },
    pointColor: { parse: parseAccessor, default: function () { return '#ffffaa'; } },
    pointAltitude: { parse: parseAccessor, default: 0.1 },
    pointRadius: { parse: parseAccessor, default: 0.25 },
    pointResolution: { type: 'number', default: 12 },
    pointsMerge: { type: 'boolean', default: false },
    pointsTransitionDuration: { type: 'number', default: 1000 },
    arcsData: { parse: parseJson, default: [] },
    arcStartLat: { parse: parseAccessor, default: 'startLat' },
    arcStartLng: { parse: parseAccessor, default: 'startLng' },
    arcEndLat: { parse: parseAccessor, default: 'endLat' },
    arcEndLng: { parse: parseAccessor, default: 'endLng' },
    arcColor: { parse: parseAccessor, default: function () { return '#ffffaa'; } },
    arcAltitude: { parse: parseAccessor, default: null },
    arcAltitudeAutoScale: { parse: parseAccessor, default: 0.5 },
    arcStroke: { parse: parseAccessor, default: null },
    arcCurveResolution: { type: 'number', default: 64 },
    arcCircularResolution: { type: 'number', default: 6 },
    arcDashLength: { parse: parseAccessor, default: 1 },
    arcDashGap: { parse: parseAccessor, default: 0 },
    arcDashInitialGap: { parse: parseAccessor, default: 0 },
    arcDashAnimateTime: { parse: parseAccessor, default: 0 },
    arcsTransitionDuration: { type: 'number', default: 1000 },
    polygonsData: { parse: parseJson, default: [] },
    polygonGeoJsonGeometry: { parse: parseAccessor, default: 'geometry' },
    polygonCapColor: { parse: parseAccessor, default: function () { return '#ffffaa'; } },
    polygonCapMaterial: { parse: parseAccessor, default: null },
    polygonSideColor: { parse: parseAccessor, default: function () { return '#ffffaa'; } },
    polygonSideMaterial: { parse: parseAccessor, default: null },
    polygonStrokeColor: { parse: parseAccessor, default: null },
    polygonAltitude: { parse: parseAccessor, default: 0.01 },
    polygonCapCurvatureResolution: { parse: parseAccessor, default: 5 },
    polygonsTransitionDuration: { type: 'number', default: 1000 },
    pathsData: { parse: parseJson, default: [] },
    pathPoints: { parse: parseAccessor, default: function (pnts) { return pnts; } },
    pathPointLat: { parse: parseAccessor, default: function (arr) { return arr[0]; } },
    pathPointLng: { parse: parseAccessor, default: function (arr) { return arr[1]; } },
    pathPointAlt: { parse: parseAccessor, default: 1e-3 },
    pathResolution: { type: 'number', default: 2 },
    pathColor: { parse: parseAccessor, default: function () { return '#ffffaa'; } },
    pathStroke: { parse: parseAccessor, default: null },
    pathDashLength: { parse: parseAccessor, default: 1 },
    pathDashGap: { parse: parseAccessor, default: 0 },
    pathDashInitialGap: { parse: parseAccessor, default: 0 },
    pathDashAnimateTime: { parse: parseAccessor, default: 0 },
    pathTransitionDuration: { type: 'number', default: 1000 },
    heatmapsData: { parse: parseJson, default: [] },
    heatmapPoints: { parse: parseAccessor, default: function (pnts) { return pnts; } },
    heatmapPointLat: { parse: parseAccessor, default: function (arr) { return arr[0]; } },
    heatmapPointLng: { parse: parseAccessor, default: function (arr) { return arr[1]; } },
    heatmapPointWeight: { parse: parseAccessor, default: 1 },
    heatmapBandwidth: { parse: parseAccessor, default: 2.5 },
    heatmapColorFn: { parse: parseAccessor, default: undefined },
    heatmapColorSaturation: { parse: parseAccessor, default: 1.5 },
    heatmapBaseAltitude: { parse: parseAccessor, default: 0.01 },
    heatmapTopAltitude: { parse: parseAccessor, default: null },
    heatmapTransitionDuration: { type: 'number', default: 0 },
    hexBinPointsData: { parse: parseJson, default: [] },
    hexBinPointLat: { parse: parseAccessor, default: 'lat' },
    hexBinPointLng: { parse: parseAccessor, default: 'lng' },
    hexBinPointWeight: { parse: parseAccessor, default: 1 },
    hexBinResolution: { type: 'number', default: 4 },
    hexMargin: { parse: parseAccessor, default: 0.2 },
    hexTopCurvatureResolution: { type: 'number', default: 5 },
    hexTopColor: { parse: parseAccessor, default: function () { return '#ffffaa'; } },
    hexSideColor: { parse: parseAccessor, default: function () { return '#ffffaa'; } },
    hexAltitude: { parse: parseAccessor, default: function (d) { return d.sumWeight * 0.01; } },
    hexBinMerge: { type: 'boolean', default: false },
    hexTransitionDuration: { type: 'number', default: 1000 },
    hexPolygonsData: { parse: parseJson, default: [] },
    hexPolygonGeoJsonGeometry: { parse: parseAccessor, default: 'geometry' },
    hexPolygonColor: { parse: parseAccessor, default: function () { return '#ffffaa'; } },
    hexPolygonAltitude: { parse: parseAccessor, default: 0.001 },
    hexPolygonResolution: { parse: parseAccessor, default: 3 },
    hexPolygonMargin: { parse: parseAccessor, default: 0.2 },
    hexPolygonUseDots: { parse: parseAccessor, default: false },
    hexPolygonCurvatureResolution: { parse: parseAccessor, default: 5 },
    hexPolygonDotResolution: { parse: parseAccessor, default: 12 },
    hexPolygonsTransitionDuration: { type: 'number', default: 0 },
    tilesData: { parse: parseJson, default: [] },
    tileLat: { parse: parseAccessor, default: 'lat' },
    tileLng: { parse: parseAccessor, default: 'lng'  },
    tileAltitude: { parse: parseAccessor, default: 0.01 },
    tileWidth: { parse: parseAccessor, default: 1 },
    tileHeight: { parse: parseAccessor, default: 1 },
    tileUseGlobeProjection: { parse: parseAccessor, default: true },
    tileMaterial: { parse: parseAccessor, default: undefined },
    tileCurvatureResolution: { parse: parseAccessor, default: 5 },
    tilesTransitionDuration: { type: 'number', default: 1000 },
    ringsData: { parse: parseJson, default: [] },
    ringLat: { parse: parseAccessor, default: 'lat' },
    ringLng: { parse: parseAccessor, default: 'lng' },
    ringAltitude: { parse: parseAccessor, default: 1.5e-3 },
    ringColor: { parse: parseAccessor, default: function () { return '#ffffaa'; } },
    ringResolution: { type: 'number', default: 64 },
    ringMaxRadius: { parse: parseAccessor, default: 2 },
    ringPropagationSpeed: { parse: parseAccessor, default: 1 },
    ringRepeatPeriod: { parse: parseAccessor, default: 700 },
    labelsData: { parse: parseJson, default: [] },
    labelLat: { parse: parseAccessor, default: 'lat' },
    labelLng: { parse: parseAccessor, default: 'lng' },
    labelAltitude: { parse: parseAccessor, default: 0 },
    labelRotation: { parse: parseAccessor, default: 0 },
    labelText: { parse: parseAccessor, default: 'text' },
    labelSize: { parse: parseAccessor, default: 0.5 },
    labelTypeFace: { parse: parseJson, default: undefined },
    labelColor: { parse: parseAccessor, default: function () { return 'lightgrey'; } },
    labelResolution: { type: 'number', default: 3 },
    labelIncludeDot: { parse: parseAccessor, default: true },
    labelDotRadius: { parse: parseAccessor, default: 0.1 },
    labelDotOrientation: { parse: parseAccessor, default: function () { return 'bottom'; } },
    labelsTransitionDuration: { type: 'number', default: 1000 },
    objectsData: { parse: parseJson, default: [] },
    objectLat: { parse: parseAccessor, default: 'lat' },
    objectLng: { parse: parseAccessor, default: 'lng'  },
    objectAltitude: { parse: parseAccessor, default: 0.01 },
    objectRotation: { parse: parseAccessor, default: null },
    objectFacesSurface: { parse: parseAccessor, default: true },
    objectThreeObject: { parse: parseAccessor, default: undefined },
    customLayerData: { parse: parseJson, default: [] },
    customThreeObject: { parse: parseAccessor, default: null },
    customThreeObjectUpdate: { parse: parseAccessor, default: null }
  },

  // Bind component methods
  globeMaterial: function() {
    if (!this.globe) {
      // Got here before component init -> initialize globe
      this.globe = new ThreeGlobe();
    }

    const globe = this.globe;
    const returnVal = globe.globeMaterial.apply(globe, arguments);

    return returnVal === globe
      ? this // return self, not the inner globe component
      : returnVal;
  },

  getGlobeRadius: function() {
    if (!this.globe) {
      // Got here before component init -> initialize globe
      this.globe = new ThreeGlobe();
    }
    const globe = this.globe;
    return globe.getGlobeRadius.apply(globe, arguments);
  },

  getCoords: function () {
    if (!this.globe) {
      // Got here before component init -> initialize globe
      this.globe = new ThreeGlobe();
    }

    const globe = this.globe;
    const returnVal = globe.getCoords.apply(globe, arguments);

    return returnVal === globe
      ? this // return self, not the inner globe component
      : returnVal;
  },

  toGeoCoords: function () {
    if (!this.globe) {
      // Got here before component init -> initialize globe
      this.globe = new ThreeGlobe();
    }

    const globe = this.globe;
    const returnVal = globe.toGeoCoords.apply(globe, arguments);

    return returnVal === globe
      ? this // return self, not the inner globe component
      : returnVal;
  },

  init: function () {
    const state = this.state = {}; // Internal state

    // Get camera dom element
    const cameraEl = document.querySelector('a-entity[camera], a-camera');

    // Keep reference to Three camera object
    state.cameraObj = cameraEl.object3D.children
      .filter(function (child) { return child.type === 'PerspectiveCamera'; })[0];

    // On camera switch
    this.el.sceneEl.addEventListener('camera-set-active', function (evt) {
      // Switch camera reference
      state.cameraObj = evt.detail.cameraEl.components.camera.camera;
    });

    // setup Globe object
    if (!this.globe) this.globe = new ThreeGlobe(); // initialize globe if it doesn't exist yet

    // interaction events
    // prefer raycaster events over mouseenter/mouseleave because they expose immediately available intersection data via detail.getIntersection()
    this.el.addEventListener('raycaster-intersected', ev => state.hoverEvent = ev);
    this.el.addEventListener('raycaster-intersected-cleared', ev => state.hoverEvent = ev);
    this.el.addEventListener('click', () => state.hoverObj && this.data.onClick && this.data.onClick(formatObjForInteraction(state.hoverObj), state.hoverEvent));
  },

  remove: function () {
    // Clean-up elems
    this.el.removeObject3D('globeGroup');
  },

  update: function (oldData) {
    const comp = this;
    const elData = this.data;
    const diff = AFRAME.utils.diff(elData, oldData);

    const globeProps = [
      'globeImageUrl',
      'bumpImageUrl',
      'showGlobe',
      'showGraticules',
      'showAtmosphere',
      'atmosphereColor',
      'atmosphereAltitude',
      'onGlobeReady',
      'pointsData',
      'pointLat',
      'pointLng',
      'pointColor',
      'pointAltitude',
      'pointRadius',
      'pointResolution',
      'pointsMerge',
      'pointsTransitionDuration',
      'arcsData',
      'arcStartLat',
      'arcStartLng',
      'arcEndLat',
      'arcEndLng',
      'arcColor',
      'arcAltitude',
      'arcAltitudeAutoScale',
      'arcStroke',
      'arcCurveResolution',
      'arcCircularResolution',
      'arcDashLength',
      'arcDashGap',
      'arcDashInitialGap',
      'arcDashAnimateTime',
      'arcsTransitionDuration',
      'polygonsData',
      'polygonGeoJsonGeometry',
      'polygonCapColor',
      'polygonCapMaterial',
      'polygonSideColor',
      'polygonSideMaterial',
      'polygonStrokeColor',
      'polygonAltitude',
      'polygonCapCurvatureResolution',
      'polygonsTransitionDuration',
      'pathsData',
      'pathPoints',
      'pathPointLat',
      'pathPointLng',
      'pathPointAlt',
      'pathResolution',
      'pathColor',
      'pathStroke',
      'pathDashLength',
      'pathDashGap',
      'pathDashInitialGap',
      'pathDashAnimateTime',
      'pathTransitionDuration',
      'heatmapsData',
      'heatmapPoints',
      'heatmapPointLat',
      'heatmapPointLng',
      'heatmapPointWeight',
      'heatmapBandwidth',
      'heatmapColorFn',
      'heatmapColorSaturation',
      'heatmapBaseAltitude',
      'heatmapTopAltitude',
      'heatmapsTransitionDuration',
      'hexBinPointsData',
      'hexBinPointLat',
      'hexBinPointLng',
      'hexBinPointWeight',
      'hexBinResolution',
      'hexMargin',
      'hexTopCurvatureResolution',
      'hexTopColor',
      'hexSideColor',
      'hexAltitude',
      'hexBinMerge',
      'hexTransitionDuration',
      'hexPolygonsData',
      'hexPolygonGeoJsonGeometry',
      'hexPolygonColor',
      'hexPolygonAltitude',
      'hexPolygonResolution',
      'hexPolygonMargin',
      'hexPolygonUseDots',
      'hexPolygonCurvatureResolution',
      'hexPolygonDotResolution',
      'hexPolygonsTransitionDuration',
      'tilesData',
      'tileLat',
      'tileLng',
      'tileAltitude',
      'tileWidth',
      'tileHeight',
      'tileUseGlobeProjection',
      'tileMaterial',
      'tileCurvatureResolution',
      'tilesTransitionDuration',
      'ringsData',
      'ringLat',
      'ringLng',
      'ringAltitude',
      'ringColor',
      'ringResolution',
      'ringMaxRadius',
      'ringPropagationSpeed',
      'ringRepeatPeriod',
      'labelsData',
      'labelLat',
      'labelLng',
      'labelAltitude',
      'labelRotation',
      'labelText',
      'labelSize',
      'labelTypeFace',
      'labelColor',
      'labelResolution',
      'labelIncludeDot',
      'labelDotRadius',
      'labelDotOrientation',
      'labelsTransitionDuration',
      'objectsData',
      'objectLat',
      'objectLng',
      'objectAltitude',
      'objectRotation',
      'objectFacesSurface',
      'objectThreeObject',
      'customLayerData',
      'customThreeObject',
      'customThreeObjectUpdate'
    ];

    globeProps
      .filter(function (p) { return p in diff && elData[p] !== undefined; })
      .forEach(function (p) { comp.globe[p](elData[p] !== '' ? elData[p] : null); }); // Convert blank values into nulls

    setTimeout(() => this.el.setObject3D('globeGroup', this.globe)); // Re-bind globe to elem
  },

  tick: function (t, td) {
    const state = this.state;
    const props = this.data;

    const hoverDetail = state.hoverEvent && state.hoverEvent.detail;

    // Update hover (intersected) object
    const intersection = hoverDetail
      ? hoverDetail.getIntersection
        ? hoverDetail.getIntersection(this.el) // available in raycaster-intersected events
        : hoverDetail.intersection || undefined // available in mouseenter/mouseleave events (with delayed update)
      : undefined;

    // Note:
    // Unfortunately we only have access to the intersected object closer to the camera (1st element in the raycaster intersectObjects result),
    // there is no ".getIntersections()" method available in the event details. Therefore, we can't prioritize hover certain globe objects over others.

    let topObject = null;
    if (props.onHover || props.onClick) {
      // recurse up until globe object is found
      topObject = intersection ? intersection.object : undefined;
      while (topObject && !topObject.hasOwnProperty('__globeObjType'))
        topObject = topObject.parent;

      // ignore certain layers
      topObject && ['globe', 'atmosphere'].includes(topObject.__globeObjType) && (topObject = null);
    }

    if (topObject !== state.hoverObj) {
      props.onHover && props.onHover(formatObjForInteraction(topObject), formatObjForInteraction(state.hoverObj));
      state.hoverObj = topObject;
    }
  }
});

//

function formatObjForInteraction (obj) {
  return !obj ? obj : {
    type: obj.__globeObjType,
    data: obj.__globeObjType === 'polygon' ? obj.__data.data : obj.__data
  };
}
