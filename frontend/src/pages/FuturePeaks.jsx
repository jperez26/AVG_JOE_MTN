import React from 'react';
import { Card, CardContent } from '../components/ui/card';
import { MapPin, Calendar, TrendingUp } from 'lucide-react';
import { summits } from '../mock';

const FuturePeaks = () => {
  return (
    <div className="min-h-screen bg-stone-900">
      {/* Hero with Anapurna Background */}
      <section className="relative h-96 flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1575143367176-df82a0d4ff48')`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-stone-900/70 via-stone-900/50 to-stone-900" />
        </div>

        <div className="relative z-10 text-center px-4">
          <h1
            className="text-5xl md:text-7xl font-bold text-white mb-4"
            style={{ fontFamily: 'Bebas Neue, sans-serif' }}
          >
            Future Peaks
          </h1>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Planned Summits */}
        <div className="mb-16">
          <h2
            className="text-3xl md:text-4xl font-bold text-white mb-8"
            style={{ fontFamily: 'Bebas Neue, sans-serif' }}
          >
            Planned Expeditions
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {summits.planned.map((summit) => (
              <Card
                key={summit.id}
                className="bg-stone-800 border-stone-700 overflow-hidden hover:shadow-2xl hover:scale-105 transition-all group"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={summit.image}
                    alt={summit.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-900 to-transparent" />
                  <div className="absolute top-4 right-4">
                    <div className="px-3 py-1 bg-green-500 text-white text-xs font-bold rounded-full">
                      PLANNED
                    </div>
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3
                    className="text-2xl font-bold text-white mb-2"
                    style={{ fontFamily: 'Bebas Neue, sans-serif' }}
                  >
                    {summit.name}
                  </h3>
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-stone-400 text-sm">
                      <MapPin className="w-4 h-4 text-green-500" />
                      <span>{summit.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-stone-400 text-sm">
                      <TrendingUp className="w-4 h-4 text-green-500" />
                      <span>{summit.elevation.toLocaleString()} feet</span>
                    </div>
                    <div className="flex items-center gap-2 text-stone-400 text-sm">
                      <Calendar className="w-4 h-4 text-green-500" />
                      <span>{new Date(summit.date).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</span>
                    </div>
                  </div>
                  <div className="inline-block px-3 py-1 bg-stone-700 text-green-500 text-xs font-semibold rounded-full mb-3">
                    {summit.difficulty}
                  </div>
                  <p className="text-stone-300 text-sm leading-relaxed">
                    {summit.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Dream Summits */}
        <div>
          <h2
            className="text-3xl md:text-4xl font-bold text-white mb-4"
            style={{ fontFamily: 'Bebas Neue, sans-serif' }}
          >
            Dream Summits
          </h2>
          <p className="text-stone-400 mb-8">
            The ultimate goals. These legendary peaks represent the pinnacle of mountaineering achievement.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            {summits.dreams.map((summit) => (
              <Card
                key={summit.id}
                className="bg-gradient-to-br from-purple-900/30 to-stone-800 border-purple-700/50 overflow-hidden hover:shadow-2xl hover:shadow-purple-900/50 transition-all group"
              >
                <div className="grid md:grid-cols-2">
                  <div className="relative h-64 md:h-auto overflow-hidden">
                    <img
                      src={summit.image}
                      alt={summit.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent to-purple-900/50" />
                  </div>
                  <CardContent className="p-6 flex flex-col justify-center">
                    <div className="px-3 py-1 bg-purple-500/20 text-purple-400 text-xs font-bold rounded-full mb-3 w-fit">
                      DREAM SUMMIT
                    </div>
                    <h3
                      className="text-2xl font-bold text-white mb-2"
                      style={{ fontFamily: 'Bebas Neue, sans-serif' }}
                    >
                      {summit.name}
                    </h3>
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2 text-stone-300 text-sm">
                        <MapPin className="w-4 h-4 text-purple-400" />
                        <span>{summit.location}</span>
                      </div>
                      <div className="flex items-center gap-2 text-stone-300 text-sm">
                        <TrendingUp className="w-4 h-4 text-purple-400" />
                        <span>{summit.elevation.toLocaleString()} feet</span>
                      </div>
                    </div>
                    <div className="inline-block px-3 py-1 bg-stone-700 text-purple-400 text-xs font-semibold rounded-full mb-3">
                      {summit.difficulty}
                    </div>
                    <p className="text-stone-300 text-sm leading-relaxed">
                      {summit.description}
                    </p>
                  </CardContent>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FuturePeaks;