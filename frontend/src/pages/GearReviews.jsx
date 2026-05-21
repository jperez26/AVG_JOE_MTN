import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '../components/ui/card';
import { Star } from 'lucide-react';
import { gearAPI } from '../services/api';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';

const GearReviews = () => {
  const [gearReviews, setGearReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    loadGear();
  }, []);

  const loadGear = async () => {
    try {
      const data = await gearAPI.getAll();
      setGearReviews(data);
    } catch (error) {
      console.error('Failed to load gear:', error);
    } finally {
      setLoading(false);
    }
  };

  const specificCategories = ['All', 'Climbing Gear', 'Footwear', 'Clothing', 'Packs', 'Everything Else'];
  const filteredGear = selectedCategory === 'All'
    ? gearReviews
    : gearReviews.filter(item => item.category === selectedCategory);

  if (loading) {
    return (
      <div className="min-h-screen bg-stone-900 pt-24 pb-16 flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  const RatingBar = ({ rating }) => (
    <div className="flex items-center gap-2">
      <div className="flex-1 h-2 bg-stone-700 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-amber-800 to-amber-600"
          style={{ width: `${rating * 10}%` }}
        />
      </div>
      <span className="text-white font-bold text-lg w-8">{rating}</span>
    </div>
  );

  return (
    <div className="min-h-screen bg-stone-900 pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1
            className="text-5xl md:text-6xl font-bold text-white mb-4"
            style={{ fontFamily: 'Bebas Neue, sans-serif' }}
          >
            Gear Reviews
          </h1>
          <p className="text-xl text-stone-400">
            Reviews of gear I have used
          </p>
        </div>

        {/* Category Filter */}
        <Tabs defaultValue="All" className="mb-8">
          <TabsList className="bg-stone-800 border border-stone-700">
            {specificCategories.map((category) => (
              <TabsTrigger
                key={category}
                value={category}
                onClick={() => setSelectedCategory(category)}
                className="data-[state=active]:bg-amber-800 data-[state=active]:text-white"
              >
                {category}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        {/* Gear Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGear.map((gear) => (
            <Card
              key={gear.id}
              className="bg-stone-800 border-stone-700 overflow-hidden hover:shadow-2xl hover:scale-[1.02] transition-all"
            >
              <div className="relative h-48 overflow-hidden group">
                <img
                  src={gear.image}
                  alt={gear.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-900 to-transparent" />
                <div className="absolute top-4 right-4">
                  <div className="flex items-center gap-1 bg-amber-800 px-3 py-1 rounded-full">
                    <Star className="w-4 h-4 text-white fill-white" />
                    <span className="text-white font-bold text-sm">{gear.rating}/10</span>
                  </div>
                </div>
              </div>
              <CardContent className="p-6">
                <div className="inline-block px-3 py-1 bg-stone-700 text-amber-700 text-xs font-semibold rounded-full mb-3">
                  {gear.category}
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{gear.name}</h3>
                <div className="mb-4">
                  <RatingBar rating={gear.rating} />
                </div>
                <p className="text-stone-300 text-sm mb-4 leading-relaxed line-clamp-3">
                  {gear.review}
                </p>
                <div className="border-t border-stone-700 pt-4 mt-4">
                  <div className="text-amber-700 font-bold text-lg">${gear.price}</div>
                </div>

                {/* Pros and Cons */}
                <div className="mt-4 space-y-2">
                  <div>
                    <div className="text-amber-600 font-semibold text-xs mb-1">PROS</div>
                    <ul className="text-stone-400 text-xs space-y-0.5">
                      {gear.pros.slice(0, 2).map((pro, idx) => (
                        <li key={idx}>• {pro}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <div className="text-red-400 font-semibold text-xs mb-1">CONS</div>
                    <ul className="text-stone-400 text-xs space-y-0.5">
                      {gear.cons.slice(0, 1).map((con, idx) => (
                        <li key={idx}>• {con}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GearReviews;