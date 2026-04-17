import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Card, CardContent } from '../components/ui/card';
import { summits } from '../mock';
import { MapPin, TrendingUp, Calendar } from 'lucide-react';

// Fix default marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

// Custom marker icons
const createCustomIcon = (color) => {
  return L.divIcon({
    className: 'custom-marker',
    html: `<div style="
      background-color: ${color};
      width: 30px;
      height: 30px;
      border-radius: 50% 50% 50% 0;
      transform: rotate(-45deg);
      border: 3px solid white;
      box-shadow: 0 4px 6px rgba(0,0,0,0.3);
    "><div style="
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%) rotate(45deg);
      width: 10px;
      height: 10px;
      background-color: white;
      border-radius: 50%;
    "></div></div>`,
    iconSize: [30, 30],
    iconAnchor: [15, 30],
    popupAnchor: [0, -30]
  });
};

const greyIcon = createCustomIcon('#8B8680');
const greenIcon = createCustomIcon('#22C55E');
const purpleIcon = createCustomIcon('#A855F7');

const MapController = ({ selectedSummit }) => {
  const map = useMap();

  useEffect(() => {
    if (selectedSummit) {
      map.flyTo(selectedSummit.coords, 6, {
        duration: 2
      });
    }
  }, [selectedSummit, map]);

  return null;
};

const SummitMap = () => {
  const [selectedSummit, setSelectedSummit] = React.useState(null);

  const allSummits = [
    ...summits.past.map(s => ({ ...s, type: 'past', icon: greyIcon })),
    ...summits.planned.map(s => ({ ...s, type: 'planned', icon: greenIcon })),
    ...summits.dreams.map(s => ({ ...s, type: 'dream', icon: purpleIcon }))
  ];

  return (
    <div className="min-h-screen bg-stone-900 pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1
            className="text-5xl md:text-6xl font-bold text-white mb-4"
            style={{ fontFamily: 'Bebas Neue, sans-serif' }}
          >
            Summit Map
          </h1>
          <p className="text-xl text-stone-400 mb-6">
            Tracking my mountaineering journey across the globe
          </p>

          {/* Legend */}
          <div className="flex justify-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-stone-500"></div>
              <span className="text-stone-300">Past Summits ({summits.past.length})</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-green-500"></div>
              <span className="text-stone-300">Planned ({summits.planned.length})</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-purple-500"></div>
              <span className="text-stone-300">Dreams ({summits.dreams.length})</span>
            </div>
          </div>
        </div>

        {/* Map */}
        <Card className="bg-stone-800 border-stone-700 overflow-hidden mb-8">
          <CardContent className="p-0">
            <div className="h-[600px] w-full">
              <MapContainer
                center={[35, 0]}
                zoom={2}
                scrollWheelZoom={true}
                className="h-full w-full"
                style={{ background: '#1c1917' }}
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {allSummits.map((summit) => (
                  <Marker
                    key={summit.id}
                    position={summit.coords}
                    icon={summit.icon}
                    eventHandlers={{
                      click: () => setSelectedSummit(summit)
                    }}
                  >
                    <Popup>
                      <div className="min-w-[200px]">
                        <h3 className="font-bold text-lg mb-1">{summit.name}</h3>
                        <p className="text-sm text-gray-600 mb-2">{summit.location}</p>
                        <p className="text-sm mb-1">
                          <strong>Elevation:</strong> {summit.elevation.toLocaleString()} ft
                        </p>
                        {summit.date && (
                          <p className="text-sm">
                            <strong>Date:</strong> {new Date(summit.date).toLocaleDateString()}
                          </p>
                        )}
                      </div>
                    </Popup>
                  </Marker>
                ))}
                <MapController selectedSummit={selectedSummit} />
              </MapContainer>
            </div>
          </CardContent>
        </Card>

        {/* Selected Summit Details */}
        {selectedSummit && (
          <Card className="bg-stone-800 border-stone-700">
            <div className="grid md:grid-cols-2">
              <div
                className="h-64 md:h-auto bg-cover bg-center"
                style={{ backgroundImage: `url('${selectedSummit.image}')` }}
              />
              <CardContent className="p-6 flex flex-col justify-center">
                <div className="inline-block px-3 py-1 bg-stone-700 text-emerald-500 text-sm font-semibold rounded-full mb-3 w-fit">
                  {selectedSummit.type === 'past' && 'CONQUERED'}
                  {selectedSummit.type === 'planned' && 'PLANNED'}
                  {selectedSummit.type === 'dream' && 'DREAM SUMMIT'}
                </div>
                <h3
                  className="text-3xl font-bold text-white mb-4"
                  style={{ fontFamily: 'Bebas Neue, sans-serif' }}
                >
                  {selectedSummit.name}
                </h3>
                <div className="space-y-3 mb-4">
                  <div className="flex items-center gap-2 text-stone-300">
                    <MapPin className="w-5 h-5 text-emerald-500" />
                    <span>{selectedSummit.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-stone-300">
                    <TrendingUp className="w-5 h-5 text-emerald-500" />
                    <span>{selectedSummit.elevation.toLocaleString()} feet</span>
                  </div>
                  {selectedSummit.date && (
                    <div className="flex items-center gap-2 text-stone-300">
                      <Calendar className="w-5 h-5 text-emerald-500" />
                      <span>
                        {new Date(selectedSummit.date).toLocaleDateString('en-US', {
                          month: 'long',
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </span>
                    </div>
                  )}
                </div>
                {selectedSummit.difficulty && (
                  <div className="inline-block px-3 py-1 bg-emerald-500/20 text-emerald-500 text-sm font-semibold rounded-full mb-4 w-fit">
                    {selectedSummit.difficulty}
                  </div>
                )}
                <p className="text-stone-300 leading-relaxed">
                  {selectedSummit.story || selectedSummit.description}
                </p>
              </CardContent>
            </div>
          </Card>
        )}

        {/* Summit List */}
        <div className="mt-12 grid md:grid-cols-3 gap-8">
          <div>
            <h3
              className="text-2xl font-bold text-stone-500 mb-4"
              style={{ fontFamily: 'Bebas Neue, sans-serif' }}
            >
              Past Summits
            </h3>
            <div className="space-y-2">
              {summits.past.map((summit) => (
                <button
                  key={summit.id}
                  onClick={() => setSelectedSummit({ ...summit, type: 'past', icon: greyIcon })}
                  className="w-full text-left p-3 bg-stone-800 hover:bg-stone-700 rounded-lg transition-colors border border-stone-700"
                >
                  <div className="font-semibold text-white">{summit.name}</div>
                  <div className="text-sm text-stone-400">{summit.elevation.toLocaleString()} ft</div>
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3
              className="text-2xl font-bold text-green-500 mb-4"
              style={{ fontFamily: 'Bebas Neue, sans-serif' }}
            >
              Planned
            </h3>
            <div className="space-y-2">
              {summits.planned.map((summit) => (
                <button
                  key={summit.id}
                  onClick={() => setSelectedSummit({ ...summit, type: 'planned', icon: greenIcon })}
                  className="w-full text-left p-3 bg-stone-800 hover:bg-stone-700 rounded-lg transition-colors border border-stone-700"
                >
                  <div className="font-semibold text-white">{summit.name}</div>
                  <div className="text-sm text-stone-400">{summit.elevation.toLocaleString()} ft</div>
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3
              className="text-2xl font-bold text-purple-500 mb-4"
              style={{ fontFamily: 'Bebas Neue, sans-serif' }}
            >
              Dreams
            </h3>
            <div className="space-y-2">
              {summits.dreams.map((summit) => (
                <button
                  key={summit.id}
                  onClick={() => setSelectedSummit({ ...summit, type: 'dream', icon: purpleIcon })}
                  className="w-full text-left p-3 bg-stone-800 hover:bg-stone-700 rounded-lg transition-colors border border-stone-700"
                >
                  <div className="font-semibold text-white">{summit.name}</div>
                  <div className="text-sm text-stone-400">{summit.elevation.toLocaleString()} ft</div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SummitMap;