/* global AFRAME */

if (typeof AFRAME === 'undefined') {
  throw new Error('Component attempted to register before AFRAME was available.');
}

var accessorFn = require('accessor-fn');
var ThreeGlobe = require('three-globe');

if (ThreeGlobe.hasOwnProperty('default')) {
  // unwrap default export
  ThreeGlobe = ThreeGlobe.default;
}

var parseJson = function (prop) {
  return (typeof prop === 'string')
    ? JSON.parse(prop)
    : prop; // already parsed
};

var parseFn = function (prop) {
  if (typeof prop === 'function') return prop; // already a function
  var geval = eval; // Avoid using eval directly https://github.com/rollup/rollup/wiki/Troubleshooting#avoiding-eval
  try {
    var evalled = geval('(' + prop + ')');
    return evalled;
  } catch (e) {} // Can't eval, not a function
  return null;
};

var parseAccessor = function (prop) {
  if (!isNaN(parseFloat(prop))) { return parseFloat(prop); } // parse numbers
  if (parseFn(prop)) { return parseFn(prop); } // parse functions
  return prop; // strings
};

/**
 * 3D Globe component for A-Frame.
 */
AFRAME.registerComponent('globe', {
  schema: {
    label: { parse: parseAccessor, default: null },
    desc: { parse: parseAccessor, default: null },
    onCenterHover: { parse: parseFn, default: null },
    globeImageUrl: { type: 'string', default: '' },
    bumpImageUrl: { type: 'string', default: '' },
    showAtmosphere: { type: 'boolean', default: true },
    showGraticules: { type: 'boolean', default: false },
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
    polygonSideColor: { parse: parseAccessor, default: function () { return '#ffffaa'; } },
    polygonStrokeColor: { parse: parseAccessor, default: null },
    polygonAltitude: { parse: parseAccessor, default: 0.1 },
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
    hexBinPointsData: { parse: parseJson, default: [] },
    hexBinPointLat: { parse: parseAccessor, default: 'lat' },
    hexBinPointLng: { parse: parseAccessor, default: 'lng' },
    hexBinPointWeight: { parse: parseAccessor, default: 1 },
    hexBinResolution: { type: 'number', default: 4 },
    hexMargin: { parse: parseAccessor, default: 0.2 },
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
    hexPolygonsTransitionDuration: { type: 'number', default: 0 },
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
    customLayerData: { parse: parseJson, default: [] },
    customThreeObject: { parse: parseAccessor, default: null },
    customThreeObjectUpdate: { parse: parseAccessor, default: null }
  },

  // Bind component methods
  getCoords: function () {
    if (!this.globe) {
      // Got here before component init -> initialize globe
      this.globe = new ThreeGlobe();
    }

    var globe = this.globe;
    var returnVal = globe.getCoords.apply(globe, arguments);

    return returnVal === globe
      ? this // return self, not the inner globe component
      : returnVal;
  },

  toGeoCoords: function () {
    if (!this.globe) {
      // Got here before component init -> initialize globe
      this.globe = new ThreeGlobe();
    }

    var globe = this.globe;
    var returnVal = globe.toGeoCoords.apply(globe, arguments);

    return returnVal === globe
      ? this // return self, not the inner globe component
      : returnVal;
  },

  init: function () {
    var state = this.state = {}; // Internal state

    // Setup tooltip
    state.tooltipEl = document.createElement('a-text');
    state.tooltipEl.setAttribute('position', '0 -0.5 -1'); // Aligned to canvas bottom
    state.tooltipEl.setAttribute('width', 2);
    state.tooltipEl.setAttribute('align', 'center');
    state.tooltipEl.setAttribute('color', 'lavender');
    state.tooltipEl.setAttribute('value', '');

    // Setup sub-tooltip
    state.subTooltipEl = document.createElement('a-text');
    state.subTooltipEl.setAttribute('position', '0 -0.6 -1'); // Aligned to canvas bottom
    state.subTooltipEl.setAttribute('width', 1.5);
    state.subTooltipEl.setAttribute('align', 'center');
    state.subTooltipEl.setAttribute('color', 'lavender');
    state.subTooltipEl.setAttribute('value', '');

    // Get camera dom element and attach fixed view elements to camera
    var cameraEl = document.querySelector('a-entity[camera], a-camera');
    cameraEl.appendChild(state.tooltipEl);
    cameraEl.appendChild(state.subTooltipEl);

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
    this.el.object3D.add(this.globe);
  },

  remove: function () {
    // Clean-up elems
    this.state.tooltipEl.remove();
    this.state.subTooltipEl.remove();
  },

  update: function (oldData) {
    var comp = this;
    var elData = this.data;
    var diff = AFRAME.utils.diff(elData, oldData);

    var globeProps = [
      'globeImageUrl',
      'bumpImageUrl',
      'showAtmosphere',
      'showGraticules',
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
      'polygonSideColor',
      'polygonStrokeColor',
      'polygonAltitude',
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
      'hexBinPointsData',
      'hexBinPointLat',
      'hexBinPointLng',
      'hexBinPointWeight',
      'hexBinResolution',
      'hexMargin',
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
      'hexPolygonsTransitionDuration',
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
      'customLayerData',
      'customThreeObject',
      'customThreeObjectUpdate'
    ];

    globeProps
      .filter(function (p) { return p in diff && elData[p] !== undefined; })
      .forEach(function (p) { comp.globe[p](elData[p] !== '' ? elData[p] : null); }); // Convert blank values into nulls
  },

  tick: function (t, td) {
    var topObject = null;
    if (this.data.label || this.data.desc || this.data.onCenterHover) {
      // Update tooltip
      var centerRaycaster = new THREE.Raycaster();
      centerRaycaster.linePrecision = 0.2;
      centerRaycaster.setFromCamera(
        new THREE.Vector2(0, 0), // Canvas center
        this.state.cameraObj
      );

      var intersects = centerRaycaster.intersectObjects(this.globe.children, true)
        .map(function (o) {
          return o.object;
        })
        .map(getGlobeObj)
        .filter(function (o) { // Check only globe data layer objects
          return o.__globeObjType && ['globe', 'atmosphere'].indexOf(o.__globeObjType) === -1;
        });

      topObject = intersects.length ? intersects[0] : null;
    }

    if (topObject !== this.state.hoverObj) {
      this.data.onCenterHover && this.data.onCenterHover(formatObj(topObject), formatObj(this.state.hoverObj));

      this.state.hoverObj = topObject;
      this.state.tooltipEl.setAttribute('value', topObject ? accessorFn(this.data.label)(formatObj(topObject)) || '' : '');
      this.state.subTooltipEl.setAttribute('value', topObject ? accessorFn(this.data.desc)(formatObj(topObject)) || '' : '');
    }

    //

    function getGlobeObj (obj) {
      // recursively find globe object from parent chain
      return !obj.parent || obj.__globeObjType ? obj : getGlobeObj(obj.parent);
    }

    function formatObj (obj) {
      return !obj ? obj : {
        type: obj.__globeObjType,
        data: obj.__globeObjType === 'polygon' ? obj.__data.data : obj.__data
      };
    }
  }
});
