// A plain JavaScript port of the Craft CMS Globe component logic.
// The code expects the GlobeKit runtime to be available in the environment.
// Pass the classes explicitly via the `kit` option or make sure they exist
// on `window` (e.g. window.GlobeKitView, window.Atmosphere, window.PointGlobe, window.Points).

const DEFAULT_POINTS = [
  [57.7081718444824, 11.8347101211548],
  [40.0272407531738, 52.9574394226074],
  [26.1854000091553, 91.8089981079102],
  [-8.77620029449463, 13.2980003356934],
  [39.8024215698242, -104.946899414063],
  [34.2496604919434, 108.885803222656],
  [53.4786491394042, 9.95092582702637],
  [30.7630596160889, -88.0528869628906],
  [12.1287698745728, -68.9296264648438],
  [31.1377754211426, 29.8462600708008],
  [32.8426704406738, -104.390701293945],
  [29.3759307861328, -94.9062576293945],
  [5.66900014877319, 0.00700000021606684],
  [12.1829996109009, -86.7580032348633],
  [53.5491790771484, -113.362396240234],
  [33.7700004577637, -118.161697387695],
  [14.5311498641968, 120.599502563477],
  [42.8580017089844, -106.24299621582],
  [53.0831985473633, 48.3923988342285],
  [41.1269989013672, -104.791999816895],
  [30.2863998413086, -93.144401550293],
  [28.7345409393311, 33.2216110229492],
  [38.3763694763184, -82.5981979370117],
  [35.955638885498, -101.879096984863],
  [45.7559814453125, 126.737899780273],
  [45.0998497009277, 8.87681865692139],
  [34.1054916381836, 135.117202758789],
  [13.7208595275879, 121.068901062012],
  [-35.8436012268066, 174.493499755859],
  [31.0383071899414, -102.589447021484],
  [53.6428985595703, -0.254200011491776],
  [25.4626693725586, 55.4901504516602],
  [17.9841003417969, -66.1138000488281],
  [15.4204196929932, 45.338680267334],
  [36.820068359375, 34.7006301879883],
  [27.3784599304199, 77.6866226196289],
  [30.4820003509521, 18.5419998168945],
  [27.818323135376, -97.5031356811523],
  [44.644588470459, -63.5356788635254],
  [35.2945289611816, -118.918197631836],
  [29.9439792633057, -90.330192565918],
  [45.1381187438965, 9.991379737854],
  [46.5143013000488, 30.684700012207],
  [22.5799999237061, 120.360000610352],
  [39.8409004211426, -75.2570495605469],
  [59.3141593933105, 10.5156803131104],
  [51.0192108154297, 2.2702169418335],
  [57.6988983154297, 11.8503999710083],
  [31, -89.4523010253906],
  [32.0448989868164, 23.9756603240967],
  [51.4442291259766, 3.72949910163879],
  [-3.71657299995422, -38.469310760498],
  [-32.721118927002, -60.7445106506348],
  [29.7227191925049, -95.2543106079102],
  [34.0360412597656, 131.816192626953],
  [36.1539993286133, -95.9927978515625],
  [39.9137496948242, -75.1983413696289],
  [37.9219398498535, 23.0765895843506],
  [70.2537078857422, -148.379806518555],
  [22.2674999237061, 91.8011016845703],
  [35.3699989318848, -119.019996643066],
  [29.2609996795654, -97.7870025634766],
  [41.6427001953125, -88.0513305664063],
  [-9.45566654205322, 147.114807128906],
  [36.1194305419922, -96.0013122558594],
  [45.1468811035156, 10.8261995315552],
  [14.5997104644775, -61.0759696960449],
  [35.0050010681152, 43.4933013916016],
  [38.0699996948242, -117.230003356934],
  [48.5049591064453, 44.6507415771484],
  [51.2513198852539, 4.33975601196289],
  [30.5093994140625, 117.101402282715],
  [56.4654502868652, -2.94580411911011],
  [50.5623893737792, 13.6154003143311],
  [46.6749305725098, 32.5686492919922],
  [38.8334007263184, -90.099998474121],
  [51.4566688537598, 45.9369201660156],
  [45.8139991760254, -108.433502197266],
  [46.5615692138672, 124.827201843262],
  [29.7393703460693, -94.9998168945313],
  [57.3390998840332, -111.751800537109],
  [48.311450958252, -101.744903564453],
  [-27.4030094146729, 153.139404296875],
  [53.0946006774902, 14.2352695465088],
  [27.8089408874512, -97.4245376586914],
  [31.2463550567627, 45.2543792724609],
  [49.4750099182129, 0.550767481327057],
  [41.657299041748, -87.6800003051758],
  [37.0546493530273, 14.2894296646118],
  [29.3726005554199, 113.162902832031],
  [21.3116493225098, -158.1123046875],
  [38.4794692993164, 106.06120300293],
  [34.3610916137695, 108.758697509766],
  [34.3603706359863, 108.763999938965],
  [47.523998260498, -111.291999816895],
  [-6.76710605621338, 111.956146240234],
  [54.851318359375, 56.1064910888672],
  [34.2049903869629, -97.1047668457031],
  [38.0706596374512, -122.137802124023],
  [52.557201385498, 7.31403779983521],
  [-34.161190032959, -58.9497718811035],
  [-4.73699998855591, 11.8479995727539],
  [47.2502593994141, 22.5372695922852],
  [-22.8852405548096, -43.238899230957],
  [34.7005310058594, 112.519599914551],
  [36.1819190979004, -5.39591598510742],
  [37.7960014343262, -96.8730010986328],
  [5.25975799560547, -3.99239301681519],
  [33.8128089904785, -118.244102478027],
  [25.0109996795654, 55.0582008361816],
  [34.497859954834, 133.75390625],
  [44.8524017333984, -93.0039978027344],
  [33.7859992980957, -118.233596801758],
  [53.100658416748, 49.8957099914551],
  [10.4830904006958, -68.120002746582],
  [30.5382804870605, 47.8222389221191],
  [22.7185306549072, 39.0170593261719],
  [54.8803482055664, 56.083911895752],
  [42.2820014953613, -83.1529998779297],
  [56.0183486938477, -3.6767270565033],
  [40.5068016052246, -74.2654037475586],
  [-25.5680999755859, -49.3540000915527],
  [-22.727560043335, -47.128360748291],
  [10.5090999603271, -71.6401596069336],
  [42.8349685668945, -80.0484085083008],
  [64.7349166870117, -147.346801757813],
  [51.1918487548828, 12.3568496704102],
  [37.1825790405273, -6.90594482421875],
  [6.44099998474121, 4.00699996948242],
  [40.6129417419434, -80.6289672851563],
  [40.4286804199219, 71.5127563476563],
  [43.8496017456055, -104.213500976563],
  [32.0810012817383, -81.0899963378906],
  [30.6523303985596, 114.429000854492],
  [46.2411689758301, 26.7643394470215],
  [22.3742504119873, 73.1194763183594],
  [31.7700004577637, -106.403999328613],
  [31.8445301055908, 34.6828117370605],
  [35.9104804992676, 140.701599121094],
  [49.0561103820801, 8.32718944549561],
  [29.7761001586914, -95.1147003173828],
  [29.7341804504395, -95.2158889770508],
  [53.4576606750488, -2.11932992935181],
  [40.1400985717773, -104.166999816895],
  [36.7846984863281, -4.06278991699219],
  [48.8567008972168, 2.3517599105835],
  [44.292308807373, -88.337272644043],
  [43.0163993835449, -78.9598999023438],
  [43.0866012573242, -79.0472030639648],
  [37.9169998168945, -122.332000732422],
  [47.2929992675781, -122.333000183105],
  [48.8563995361328, 2.35219979286194],
  [34.0194091796875, -118.491203308105],
  [19.3969993591309, -99.5305023193359],
  [42.9165992736816, -78.9012994766235],
  [47.2610015869141, -122.335998535156],
  [19.4328994750977, -99.1332015991211],
  [48.8712005615234, 2.35689997673035],
  [47.197998046875, -122.235000610352],
  [40.8540992736816, 14.2463998794556],
  [45.5227012634277, -122.681999206543],
  [45.4199981689453, -122.716003417969],
  [45.5237998962402, -122.670997619629],
  [-23.5503005981445, -46.6338996887207],
  [59.9131011962891, 10.7392997741699]
];

export async function createGlobe(canvas, userOptions = {}) {
  if (!canvas) {
    throw new Error("createGlobe requires a valid <canvas> element.");
  }

  const {
    kit,
    hasDots = false,
    points = DEFAULT_POINTS,
    bgColor = 0xffffff,
    dotColor = 0xffffff,
    landColor = "#183C55",
    wasmPath = "./assets/gkweb_bg.wasm",
    pointDataPath = "./assets/pointglobe.bin",
    noiseTexture = "./assets/clouds.png",
    atmosphereTexture = "./assets/disk-glow-border.png",
    atmosphereScale = 1.3,
    startLat = 29.7,
    startLon = -95.3
  } = userOptions;

  const classes = resolveGlobeKitClasses(kit);
  const backgroundColor = normalizeColorNumber(bgColor);
  const dotColorNumber = normalizeColorNumber(dotColor);

  const gkOptions = {
    apiKey: "",
    wasmPath,
    clearColor: [
      ((backgroundColor >> 16) & 0xff) / 255,
      ((backgroundColor >> 8) & 0xff) / 255,
      (backgroundColor & 0xff) / 255
    ],
    attributes: { alpha: false }
  };

  const view = new classes.GlobeKitView(canvas, gkOptions);

  const atmosphere = new classes.Atmosphere({ texture: atmosphereTexture });
  atmosphere.nScale = atmosphereScale;
  view.addDrawable(atmosphere);

  const pointResponse = await fetch(pointDataPath);
  if (!pointResponse.ok) {
    throw new Error(`Failed to load point globe data (${pointResponse.status})`);
  }
  const pointBuffer = await pointResponse.arrayBuffer();

  const pointGlobe = new classes.PointGlobe(
    { noise: noiseTexture },
    pointBuffer,
    {
      pointSize: 0.008,
      randomPointSizeVariance: 0.0025,
      randomPointSizeRatio: 0.02,
      minPointAlpha: 0,
      minPointSize: 0.0035,
      color: landColor
    }
  );
  pointGlobe.setInteractive(true, true, false);
  view.addDrawable(pointGlobe, () => {
    view.startDrawing();
    canvas.classList.add("globe-canvas--ready");
  });

  const dots = new classes.Points();
  const dotColorVector = new Float32Array([
    ((dotColorNumber >> 16) & 0xff) / 255,
    ((dotColorNumber >> 8) & 0xff) / 255,
    (dotColorNumber & 0xff) / 255,
    1
  ]);
  dots.transform = function transform(_, out) {
    out.color = dotColorVector;
    out.size = 4 + Math.random();
    return out;
  };

  if (hasDots) {
    dots.addGeojson(pointsToGeoJson(points));
  }

  dots.setInteractive(true, true, false);
  view.addDrawable(dots);

  if (view.movementModel && typeof view.movementModel.setLatLon === "function") {
    view.movementModel.setLatLon(startLat, startLon);
  }

  return {
    view,
    atmosphere,
    pointGlobe,
    dots
  };
}

function resolveGlobeKitClasses(candidate) {
  const sources = [];
  if (candidate) sources.push(candidate);
  if (candidate && candidate.default) sources.push(candidate.default);
  if (candidate && candidate.GlobeKit) sources.push(candidate.GlobeKit);
  if (typeof window !== "undefined") {
    sources.push(window);
    if (window.GlobeKit) sources.push(window.GlobeKit);
  }

  for (const source of sources) {
    if (!source) continue;
    const GlobeKitView = source.GlobeKitView || source.GKView || source.GLKView;
    const Atmosphere = source.Atmosphere;
    const PointGlobe = source.PointGlobe;
    const Points = source.Points;
    if (GlobeKitView && Atmosphere && PointGlobe && Points) {
      return { GlobeKitView, Atmosphere, PointGlobe, Points };
    }
  }

  throw new Error(
    "GlobeKit classes not found. Pass them via the `kit` option " +
      "or ensure they exist on the global window object."
  );
}

function normalizeColorNumber(value) {
  if (typeof value === "number") return value >>> 0;
  if (typeof value === "string") {
    const cleaned = value.trim();
    if (cleaned.startsWith("#")) {
      return parseInt(cleaned.slice(1), 16) >>> 0;
    }
    if (cleaned.startsWith("0x")) {
      return parseInt(cleaned, 16) >>> 0;
    }
  }
  throw new Error(`Unsupported color format: ${value}`);
}

function pointsToGeoJson(latLonPairs) {
  return {
    type: "FeatureCollection",
    features: latLonPairs.map(([lat, lon]) => ({
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [lon, lat]
      }
    }))
  };
}

export { DEFAULT_POINTS };
