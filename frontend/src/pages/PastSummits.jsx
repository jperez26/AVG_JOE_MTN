import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '../components/ui/card';
import { MapPin, Calendar, TrendingUp } from 'lucide-react';
import { summitsAPI } from '../services/api';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../components/ui/dialog';
import { Button } from '../components/ui/button';

const PastSummits = () => {
  const [summits, setSummits] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSummits();
  }, []);

  const loadSummits = async () => {
    try {
      const data = await summitsAPI.getAll('past');
      setSummits(data);
    } catch (error) {
      console.error('Failed to load summits:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-stone-900 pt-24 pb-16 flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-stone-900 pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1
            className="text-5xl md:text-6xl font-bold text-white mb-4"
            style={{ fontFamily: 'Bebas Neue, sans-serif' }}
          >
            Past Summits
          </h1>
          <p className="text-xl text-stone-400">
            The peaks I've conquered and the stories behind them
          </p>
        </div>

        {/* Summits Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {summits.map((summit) => (
            <Dialog key={summit.id}>
              <DialogTrigger asChild>
                <Card className="bg-stone-800 border-stone-700 overflow-hidden cursor-pointer hover:shadow-2xl hover:scale-[1.02] transition-all group">
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={summit.image}
                      alt={summit.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-stone-900 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="inline-block px-3 py-1 bg-stone-700/80 text-amber-700 text-sm font-semibold rounded-full mb-2">
                        {summit.difficulty}
                      </div>
                      <h3
                        className="text-3xl font-bold text-white"
                        style={{ fontFamily: 'Bebas Neue, sans-serif' }}
                      >
                        {summit.name}
                      </h3>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-stone-400">
                        <MapPin className="w-4 h-4 text-amber-700" />
                        <span>{summit.location}</span>
                      </div>
                      <div className="flex items-center gap-2 text-stone-400">
                        <TrendingUp className="w-4 h-4 text-amber-700" />
                        <span>{summit.elevation.toLocaleString()} feet</span>
                      </div>
                      <div className="flex items-center gap-2 text-stone-400">
                        <Calendar className="w-4 h-4 text-amber-700" />
                        <span>{new Date(summit.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                      </div>
                    </div>
                    <p className="text-stone-300 mt-4 line-clamp-3">
                      {summit.story}
                    </p>
                    <Button className="w-full mt-4 bg-amber-800 hover:bg-amber-900 text-white">
                      Read Full Story
                    </Button>
                  </CardContent>
                </Card>
              </DialogTrigger>

              <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-stone-800 border-stone-700 text-white">
                <DialogHeader>
                  <DialogTitle
                    className="text-4xl font-bold text-white"
                    style={{ fontFamily: 'Bebas Neue, sans-serif' }}
                  >
                    {summit.name}
                  </DialogTitle>
                </DialogHeader>

                <div className="space-y-6">
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <div className="text-stone-400 text-sm mb-1">Location</div>
                      <div className="text-white font-semibold">{summit.location}</div>
                    </div>
                    <div>
                      <div className="text-stone-400 text-sm mb-1">Elevation</div>
                      <div className="text-white font-semibold">{summit.elevation.toLocaleString()} ft</div>
                    </div>
                    <div>
                      <div className="text-stone-400 text-sm mb-1">Date</div>
                      <div className="text-white font-semibold">
                        {new Date(summit.date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                      </div>
                    </div>
                  </div>

                  <div className="inline-block px-3 py-1 bg-amber-700/20 text-amber-700 text-sm font-semibold rounded-full">
                    {summit.difficulty}
                  </div>

                  <div>
                    <h4 className="text-xl font-bold mb-3 text-amber-700">The Story</h4>
                    <p className="text-stone-300 leading-relaxed">{summit.story}</p>
                  </div>

                  <div>
                    <h4 className="text-xl font-bold mb-3 text-amber-700">Photos</h4>
                    <div className="grid grid-cols-2 gap-4">
                      {summit.photos.map((photo, idx) => (
                        <img
                          key={idx}
                          src={photo}
                          alt={`${summit.name} photo ${idx + 1}`}
                          className="w-full h-48 object-cover rounded-lg"
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PastSummits;