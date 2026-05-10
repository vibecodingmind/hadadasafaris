/**
 * Kilimanjaro Route Coordinates
 * Approximate GPS polylines for each climbing route from gate to summit.
 * Coordinates follow [latitude, longitude] format.
 * Each route includes camp markers and the full trek path.
 */

export interface CampMarker {
  name: string;
  elevation: string;
  position: [number, number];
}

export interface RouteMapData {
  slug: string;
  center: [number, number];
  zoom: number;
  path: [number, number][];
  camps: CampMarker[];
}

export const kilimanjaroRouteMaps: Record<string, RouteMapData> = {
  machame: {
    slug: 'machame',
    center: [-3.07, 37.35],
    zoom: 12,
    path: [
      [-3.0600, 37.1500], // Machame Gate
      [-3.0650, 37.1600],
      [-3.0720, 37.1800],
      [-3.0780, 37.2000], // Machame Camp
      [-3.0820, 37.2150],
      [-3.0860, 37.2300],
      [-3.0900, 37.2450], // Shira Camp
      [-3.0950, 37.2600],
      [-3.1000, 37.2750],
      [-3.1020, 37.2900], // Lava Tower
      [-3.0980, 37.3000],
      [-3.0930, 37.3100],
      [-3.0880, 37.3150], // Barranco Camp
      [-3.0830, 37.3250],
      [-3.0780, 37.3350], // Karanga Camp
      [-3.0730, 37.3450],
      [-3.0680, 37.3550], // Barafu Camp
      [-3.0630, 37.3650],
      [-3.0580, 37.3750],
      [-3.0550, 37.3850],
      [-3.0520, 37.3950],
      [-3.0500, 37.4050],
      [-3.0470, 37.4100],
      [-3.0654, 37.3528], // Uhuru Peak (summit)
    ],
    camps: [
      { name: 'Machame Gate', elevation: '1,490m', position: [-3.0600, 37.1500] },
      { name: 'Machame Camp', elevation: '2,980m', position: [-3.0780, 37.2000] },
      { name: 'Shira Camp', elevation: '3,840m', position: [-3.0900, 37.2450] },
      { name: 'Lava Tower', elevation: '4,630m', position: [-3.1020, 37.2900] },
      { name: 'Barranco Camp', elevation: '3,960m', position: [-3.0880, 37.3150] },
      { name: 'Karanga Camp', elevation: '4,040m', position: [-3.0780, 37.3350] },
      { name: 'Barafu Camp', elevation: '4,670m', position: [-3.0680, 37.3550] },
      { name: 'Uhuru Peak', elevation: '5,895m', position: [-3.0654, 37.3528] },
    ],
  },

  lemosho: {
    slug: 'lemosho',
    center: [-3.10, 37.25],
    zoom: 12,
    path: [
      [-3.0400, 37.1100], // Lemosho Glades
      [-3.0450, 37.1200],
      [-3.0520, 37.1350],
      [-3.0580, 37.1500], // Mti Mkubwa Camp
      [-3.0650, 37.1700],
      [-3.0720, 37.1900],
      [-3.0780, 37.2100], // Shira Camp 1
      [-3.0840, 37.2300],
      [-3.0900, 37.2450], // Shira Camp 2
      [-3.0950, 37.2600],
      [-3.1000, 37.2750],
      [-3.1020, 37.2900], // Lava Tower
      [-3.0980, 37.3000],
      [-3.0930, 37.3100],
      [-3.0880, 37.3150], // Barranco Camp
      [-3.0830, 37.3250],
      [-3.0780, 37.3350], // Karanga Camp
      [-3.0730, 37.3450],
      [-3.0680, 37.3550], // Barafu Camp
      [-3.0630, 37.3650],
      [-3.0580, 37.3750],
      [-3.0550, 37.3850],
      [-3.0520, 37.3950],
      [-3.0500, 37.4050],
      [-3.0654, 37.3528], // Uhuru Peak
    ],
    camps: [
      { name: 'Lemosho Glades', elevation: '2,100m', position: [-3.0400, 37.1100] },
      { name: 'Mti Mkubwa Camp', elevation: '2,820m', position: [-3.0580, 37.1500] },
      { name: 'Shira Camp 1', elevation: '3,500m', position: [-3.0780, 37.2100] },
      { name: 'Shira Camp 2', elevation: '3,840m', position: [-3.0900, 37.2450] },
      { name: 'Lava Tower', elevation: '4,630m', position: [-3.1020, 37.2900] },
      { name: 'Barranco Camp', elevation: '3,960m', position: [-3.0880, 37.3150] },
      { name: 'Karanga Camp', elevation: '4,040m', position: [-3.0780, 37.3350] },
      { name: 'Barafu Camp', elevation: '4,670m', position: [-3.0680, 37.3550] },
      { name: 'Uhuru Peak', elevation: '5,895m', position: [-3.0654, 37.3528] },
    ],
  },

  marangu: {
    slug: 'marangu',
    center: [-3.05, 37.38],
    zoom: 12,
    path: [
      [-3.0300, 37.2100], // Marangu Gate
      [-3.0320, 37.2250],
      [-3.0350, 37.2400],
      [-3.0380, 37.2550], // Mandara Huts
      [-3.0420, 37.2750],
      [-3.0460, 37.2950],
      [-3.0480, 37.3100], // Horombo Huts
      [-3.0500, 37.3250],
      [-3.0520, 37.3400],
      [-3.0540, 37.3500], // Kibo Hut
      [-3.0560, 37.3550],
      [-3.0580, 37.3600],
      [-3.0600, 37.3630],
      [-3.0620, 37.3600],
      [-3.0640, 37.3560],
      [-3.0654, 37.3528], // Uhuru Peak
      // Descent back
      [-3.0640, 37.3560],
      [-3.0620, 37.3600],
      [-3.0600, 37.3630],
      [-3.0580, 37.3600],
      [-3.0560, 37.3550],
      [-3.0540, 37.3500],
      [-3.0520, 37.3400],
      [-3.0500, 37.3250],
      [-3.0480, 37.3100], // Horombo (descent)
      [-3.0460, 37.2950],
      [-3.0420, 37.2750],
      [-3.0380, 37.2550],
      [-3.0350, 37.2400],
      [-3.0320, 37.2250],
      [-3.0300, 37.2100], // Marangu Gate (end)
    ],
    camps: [
      { name: 'Marangu Gate', elevation: '1,870m', position: [-3.0300, 37.2100] },
      { name: 'Mandara Huts', elevation: '2,720m', position: [-3.0380, 37.2550] },
      { name: 'Horombo Huts', elevation: '3,720m', position: [-3.0480, 37.3100] },
      { name: 'Kibo Hut', elevation: '4,730m', position: [-3.0540, 37.3500] },
      { name: 'Uhuru Peak', elevation: '5,895m', position: [-3.0654, 37.3528] },
    ],
  },

  umbwe: {
    slug: 'umbwe',
    center: [-3.08, 37.30],
    zoom: 12,
    path: [
      [-3.0500, 37.1750], // Umbwe Gate
      [-3.0560, 37.1900],
      [-3.0620, 37.2100],
      [-3.0680, 37.2300], // Umbwe Cave Camp
      [-3.0740, 37.2550],
      [-3.0800, 37.2800],
      [-3.0880, 37.3150], // Barranco Camp
      [-3.0830, 37.3250],
      [-3.0780, 37.3350], // Karanga Camp
      [-3.0730, 37.3450],
      [-3.0680, 37.3550], // Barafu Camp
      [-3.0630, 37.3650],
      [-3.0580, 37.3750],
      [-3.0550, 37.3850],
      [-3.0520, 37.3950],
      [-3.0654, 37.3528], // Uhuru Peak
    ],
    camps: [
      { name: 'Umbwe Gate', elevation: '1,650m', position: [-3.0500, 37.1750] },
      { name: 'Umbwe Cave Camp', elevation: '2,940m', position: [-3.0680, 37.2300] },
      { name: 'Barranco Camp', elevation: '3,960m', position: [-3.0880, 37.3150] },
      { name: 'Karanga Camp', elevation: '4,040m', position: [-3.0780, 37.3350] },
      { name: 'Barafu Camp', elevation: '4,670m', position: [-3.0680, 37.3550] },
      { name: 'Uhuru Peak', elevation: '5,895m', position: [-3.0654, 37.3528] },
    ],
  },

  rongai: {
    slug: 'rongai',
    center: [-3.04, 37.38],
    zoom: 12,
    path: [
      [-3.0100, 37.3200], // Rongai Gate
      [-3.0150, 37.3300],
      [-3.0200, 37.3350], // Simba Camp
      [-3.0250, 37.3400],
      [-3.0300, 37.3450],
      [-3.0350, 37.3480], // Kikelewa Camp
      [-3.0380, 37.3500],
      [-3.0400, 37.3520], // Mawenzi Tarn
      [-3.0440, 37.3500],
      [-3.0480, 37.3480],
      [-3.0510, 37.3490], // Kibo Hut
      [-3.0540, 37.3500],
      [-3.0560, 37.3520],
      [-3.0580, 37.3530],
      [-3.0600, 37.3540],
      [-3.0620, 37.3545],
      [-3.0654, 37.3528], // Uhuru Peak
      // Descent via Marangu
      [-3.0620, 37.3545],
      [-3.0600, 37.3540],
      [-3.0580, 37.3530],
      [-3.0540, 37.3500],
      [-3.0480, 37.3100], // Horombo Huts (descent)
      [-3.0380, 37.2550],
      [-3.0300, 37.2100], // Marangu Gate (end)
    ],
    camps: [
      { name: 'Rongai Gate', elevation: '1,950m', position: [-3.0100, 37.3200] },
      { name: 'Simba Camp', elevation: '2,650m', position: [-3.0200, 37.3350] },
      { name: 'Kikelewa Camp', elevation: '3,600m', position: [-3.0350, 37.3480] },
      { name: 'Mawenzi Tarn', elevation: '4,330m', position: [-3.0400, 37.3520] },
      { name: 'Kibo Hut', elevation: '4,730m', position: [-3.0510, 37.3490] },
      { name: 'Uhuru Peak', elevation: '5,895m', position: [-3.0654, 37.3528] },
    ],
  },

  shira: {
    slug: 'shira',
    center: [-3.10, 37.25],
    zoom: 12,
    path: [
      [-3.0850, 37.2100], // Shira Gate (driven to)
      [-3.0870, 37.2200], // Shira Camp 1
      [-3.0890, 37.2350],
      [-3.0900, 37.2450], // Shira Camp 2
      [-3.0950, 37.2600],
      [-3.1000, 37.2750],
      [-3.1020, 37.2900], // Lava Tower
      [-3.0980, 37.3000],
      [-3.0930, 37.3100],
      [-3.0880, 37.3150], // Barranco Camp
      [-3.0830, 37.3250],
      [-3.0780, 37.3350], // Karanga Camp
      [-3.0730, 37.3450],
      [-3.0680, 37.3550], // Barafu Camp
      [-3.0630, 37.3650],
      [-3.0580, 37.3750],
      [-3.0550, 37.3850],
      [-3.0520, 37.3950],
      [-3.0500, 37.4050],
      [-3.0654, 37.3528], // Uhuru Peak
    ],
    camps: [
      { name: 'Shira Gate', elevation: '3,500m', position: [-3.0850, 37.2100] },
      { name: 'Shira Camp 1', elevation: '3,500m', position: [-3.0870, 37.2200] },
      { name: 'Shira Camp 2', elevation: '3,840m', position: [-3.0900, 37.2450] },
      { name: 'Lava Tower', elevation: '4,630m', position: [-3.1020, 37.2900] },
      { name: 'Barranco Camp', elevation: '3,960m', position: [-3.0880, 37.3150] },
      { name: 'Karanga Camp', elevation: '4,040m', position: [-3.0780, 37.3350] },
      { name: 'Barafu Camp', elevation: '4,670m', position: [-3.0680, 37.3550] },
      { name: 'Uhuru Peak', elevation: '5,895m', position: [-3.0654, 37.3528] },
    ],
  },
};

export function getRouteMapData(slug: string): RouteMapData | undefined {
  return kilimanjaroRouteMaps[slug];
}
