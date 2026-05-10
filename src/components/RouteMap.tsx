'use client';

import { useEffect, useState } from 'react';
import { RouteMapData } from '@/data/routeMaps';

export default function RouteMap({ mapData }: { mapData: RouteMapData }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-full h-full min-h-[320px] md:min-h-[380px] bg-[#e8e4de] rounded-2xl flex items-center justify-center">
        <div className="text-center">
          <div className="w-10 h-10 border-2 border-[#B78A42]/30 border-t-[#B78A42] rounded-full animate-spin mx-auto mb-3" />
          <span className="text-xs text-[#333333]/40 font-semibold tracking-wider uppercase">Loading Map...</span>
        </div>
      </div>
    );
  }

  // Dynamically import leaflet components only on client
  return <MapInner mapData={mapData} />;
}

function MapInner({ mapData }: { mapData: RouteMapData }) {
  const [L, setL] = useState<typeof import('leaflet') | null>(null);
  const [RL, setRL] = useState<typeof import('react-leaflet') | null>(null);

  useEffect(() => {
    Promise.all([
      import('leaflet'),
      import('react-leaflet'),
    ]).then(([leaflet, reactLeaflet]) => {
      // Fix leaflet default marker icon issue
      delete (leaflet.Icon.Default.prototype as any)._getIconUrl;
      leaflet.Icon.Default.mergeOptions({
        iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
        iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
      });
      setL(leaflet);
      setRL(reactLeaflet);
    });
  }, []);

  if (!L || !RL) {
    return (
      <div className="w-full h-full min-h-[320px] md:min-h-[380px] bg-[#e8e4de] rounded-2xl flex items-center justify-center">
        <div className="text-center">
          <div className="w-10 h-10 border-2 border-[#B78A42]/30 border-t-[#B78A42] rounded-full animate-spin mx-auto mb-3" />
          <span className="text-xs text-[#333333]/40 font-semibold tracking-wider uppercase">Loading Map...</span>
        </div>
      </div>
    );
  }

  const { MapContainer, TileLayer, Polyline, Marker, Popup, Tooltip } = RL;

  // Custom icon for camps
  const campIcon = L.divIcon({
    className: 'custom-camp-icon',
    html: `<div style="
      width: 24px; height: 24px; border-radius: 50%;
      background: #B78A42; border: 2px solid white;
      box-shadow: 0 2px 6px rgba(0,0,0,0.3);
      display: flex; align-items: center; justify-content: center;
    "><svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg></div>`,
    iconSize: [24, 24],
    iconAnchor: [12, 12],
  });

  // Special summit icon
  const summitIcon = L.divIcon({
    className: 'custom-summit-icon',
    html: `<div style="
      width: 30px; height: 30px; border-radius: 50%;
      background: #1a1a1a; border: 3px solid #B78A42;
      box-shadow: 0 2px 8px rgba(183,138,66,0.5);
      display: flex; align-items: center; justify-content: center;
    "><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#B78A42" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m8 3 4 8 5-5 5 15H2L8 3z"/></svg></div>`,
    iconSize: [30, 30],
    iconAnchor: [15, 15],
  });

  const isSummit = (name: string) => name.toLowerCase().includes('uhuru') || name.toLowerCase().includes('peak') || name.toLowerCase().includes('summit');

  return (
    <>
      <link
        rel="stylesheet"
        href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
        integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
        crossOrigin=""
      />
      <div className="w-full h-full min-h-[320px] md:min-h-[380px] rounded-2xl overflow-hidden relative">
        <MapContainer
          center={mapData.center}
          zoom={mapData.zoom}
          scrollWheelZoom={true}
          zoomControl={true}
          className="w-full h-full"
          style={{ minHeight: '320px' }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {/* Route path */}
          <Polyline
            positions={mapData.path as [number, number][]}
            pathOptions={{
              color: '#B78A42',
              weight: 4,
              opacity: 0.85,
              dashArray: '8, 6',
              lineCap: 'round',
              lineJoin: 'round',
            }}
          />
          {/* Camp markers */}
          {mapData.camps.map((camp, i) => (
            <Marker
              key={i}
              position={camp.position}
              icon={isSummit(camp.name) ? summitIcon : campIcon}
            >
              <Tooltip direction="top" offset={[0, -14]} permanent={isSummit(camp.name)}>
                <div className="text-center">
                  <div className="font-bold text-[10px] text-[#333]">{camp.name}</div>
                  <div className="text-[9px] text-[#B78A42] font-semibold">{camp.elevation}</div>
                </div>
              </Tooltip>
              <Popup>
                <div className="text-center p-1">
                  <div className="font-bold text-sm text-[#333]">{camp.name}</div>
                  <div className="text-xs text-[#B78A42] font-semibold">{camp.elevation}</div>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>

        {/* Map legend overlay */}
        <div className="absolute bottom-3 left-3 z-[1000] bg-white/90 backdrop-blur-xl border border-[#B78A42]/10 rounded-xl px-3 py-2 shadow-lg">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-5 h-0.5 bg-[#B78A42] rounded" style={{ borderStyle: 'dashed' }} />
            <span className="text-[9px] font-semibold text-[#333333]/60 uppercase tracking-wider">Trek Route</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-[#B78A42] rounded-full border-2 border-white shadow-sm" />
            <span className="text-[9px] font-semibold text-[#333333]/60 uppercase tracking-wider">Camp / Hut</span>
          </div>
          <div className="flex items-center gap-2 mt-1">
            <div className="w-3.5 h-3.5 bg-[#1a1a1a] rounded-full border-2 border-[#B78A42]" />
            <span className="text-[9px] font-semibold text-[#333333]/60 uppercase tracking-wider">Summit</span>
          </div>
        </div>
      </div>
    </>
  );
}
