import React from 'react';
import { Link } from 'react-router-dom';
import { Mountain, TrendingUp, Award, Calendar } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { summits, stats } from '../mock';

const Home = () => {
  const latestSummit = summits.past[summits.past.length - 1];
  const nextPeak = summits.planned[0];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1650275536755-c3f78da9e0a8?crop=entropy&cs=srgb&fm=jpg&q=85')`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-stone-900/70 via-stone-900/50 to-stone-900" />
        </div>

        <div className="relative z-10 text-center px-4 max-w-4xl">
          <Mountain className="w-16 h-16 text-emerald-500 mx-auto mb-6 animate-pulse" />
          <h1
            className="text-6xl md:text-8xl font-bold text-white mb-4 tracking-wider"
            style={{ fontFamily: 'Bebas Neue, sans-serif' }}
          >
            GET OUT THERE
          </h1>
          <p className="text-xl md:text-2xl text-stone-300 mb-8">
            From Local Peaks to Global Summits
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/past-summits">
              <Button className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-6 text-lg">
                Explore Summits
              </Button>
            </Link>
            <Link to="/map">
              <Button variant="outline" className="border-white text-white hover:bg-white/10 px-8 py-6 text-lg">
                View Map
              </Button>
            </Link>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <div className="w-1.5 h-3 bg-white/50 rounded-full mt-2" />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-stone-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <Award className="w-12 h-12 text-emerald-500 mx-auto mb-4" />
              <div className="text-4xl font-bold text-white mb-2" style={{ fontFamily: 'Bebas Neue, sans-serif' }}>
                {stats.totalSummits}
              </div>
              <div className="text-stone-400">Summits Conquered</div>
            </div>
            <div className="text-center">
              <TrendingUp className="w-12 h-12 text-emerald-500 mx-auto mb-4" />
              <div className="text-4xl font-bold text-white mb-2" style={{ fontFamily: 'Bebas Neue, sans-serif' }}>
                {stats.totalElevation.toLocaleString()}
              </div>
              <div className="text-stone-400">Feet Climbed</div>
            </div>
            <div className="text-center">
              <Calendar className="w-12 h-12 text-emerald-500 mx-auto mb-4" />
              <div className="text-4xl font-bold text-white mb-2" style={{ fontFamily: 'Bebas Neue, sans-serif' }}>
                {stats.plannedPeaks}
              </div>
              <div className="text-stone-400">Peaks Planned</div>
            </div>
            <div className="text-center">
              <Mountain className="w-12 h-12 text-emerald-500 mx-auto mb-4" />
              <div className="text-4xl font-bold text-white mb-2" style={{ fontFamily: 'Bebas Neue, sans-serif' }}>
                {stats.dreamPeaks}
              </div>
              <div className="text-stone-400">Dream Summits</div>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Summit */}
      <section className="py-20 bg-stone-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2
            className="text-4xl md:text-5xl font-bold text-white mb-12 text-center"
            style={{ fontFamily: 'Bebas Neue, sans-serif' }}
          >
            Latest Conquest
          </h2>
          <Card className="bg-stone-800 border-stone-700 overflow-hidden hover:shadow-2xl transition-shadow">
            <div className="grid md:grid-cols-2">
              <div
                className="h-96 md:h-auto bg-cover bg-center"
                style={{ backgroundImage: `url('${latestSummit.image}')` }}
              />
              <CardContent className="p-8 flex flex-col justify-center">
                <div className="inline-block px-3 py-1 bg-emerald-500/20 text-emerald-500 text-sm font-semibold rounded-full mb-4 w-fit">
                  {latestSummit.difficulty}
                </div>
                <h3
                  className="text-3xl font-bold text-white mb-2"
                  style={{ fontFamily: 'Bebas Neue, sans-serif' }}
                >
                  {latestSummit.name}
                </h3>
                <p className="text-stone-400 mb-4">
                  {latestSummit.location} • {latestSummit.elevation.toLocaleString()} ft
                </p>
                <p className="text-stone-300 mb-6 leading-relaxed">
                  {latestSummit.story.substring(0, 200)}...
                </p>
                <Link to="/past-summits">
                  <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">
                    Read Full Story
                  </Button>
                </Link>
              </CardContent>
            </div>
          </Card>
        </div>
      </section>

      {/* Next Challenge */}
      <section className="py-20 bg-stone-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2
            className="text-4xl md:text-5xl font-bold text-white mb-12 text-center"
            style={{ fontFamily: 'Bebas Neue, sans-serif' }}
          >
            Next Challenge
          </h2>
          <Card className="bg-stone-900 border-stone-700 overflow-hidden">
            <div className="grid md:grid-cols-2">
              <CardContent className="p-8 flex flex-col justify-center order-2 md:order-1">
                <div className="inline-block px-3 py-1 bg-green-500/20 text-green-500 text-sm font-semibold rounded-full mb-4 w-fit">
                  Planned • July 2025
                </div>
                <h3
                  className="text-3xl font-bold text-white mb-2"
                  style={{ fontFamily: 'Bebas Neue, sans-serif' }}
                >
                  {nextPeak.name}
                </h3>
                <p className="text-stone-400 mb-4">
                  {nextPeak.location} • {nextPeak.elevation.toLocaleString()} ft
                </p>
                <p className="text-stone-300 mb-6 leading-relaxed">
                  {nextPeak.description}
                </p>
                <Link to="/future-peaks">
                  <Button variant="outline" className="border-emerald-500 text-emerald-500 hover:bg-emerald-500 hover:text-white">
                    View All Future Peaks
                  </Button>
                </Link>
              </CardContent>
              <div
                className="h-96 md:h-auto bg-cover bg-center order-1 md:order-2"
                style={{ backgroundImage: `url('${nextPeak.image}')` }}
              />
            </div>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-stone-900 to-stone-800 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path d="M0,50 Q25,30 50,50 T100,50 L100,100 L0,100 Z" fill="currentColor" className="text-emerald-900" />
          </svg>
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <Mountain className="w-16 h-16 text-emerald-500 mx-auto mb-6" />
          <h2
            className="text-4xl md:text-5xl font-bold text-white mb-6"
            style={{ fontFamily: 'Bebas Neue, sans-serif' }}
          >
            JOIN THE JOURNEY
          </h2>
          <p className="text-xl text-stone-300 mb-8">
            Follow along as we tackle peaks from the Pacific Northwest to the Himalayas.
            Every summit has a story, every climb a lesson.
          </p>
          <Link to="/gallery">
            <Button className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-6 text-lg">
              View Photo Gallery
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;