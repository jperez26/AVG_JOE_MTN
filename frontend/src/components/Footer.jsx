import React, { useState, useEffect } from 'react';
import { Mountain, Mail, Instagram, Facebook } from 'lucide-react';
import { Link } from 'react-router-dom';
import { statsAPI } from '../services/api';

const Footer = () => {
  const [stats, setStats] = useState({ totalSummits: 0, totalElevation: 0, plannedPeaks: 0 });

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const data = await statsAPI.get();
      setStats(data);
    } catch (error) {
      console.error('Failed to load stats:', error);
    }
  };

  return (
    <footer className="bg-[#2C5530] border-t border-[#1a331c]">
      {/* Mountain Peak Divider */}
      <div className="h-16 relative overflow-hidden">
        <svg
          viewBox="0 0 1200 100"
          className="absolute bottom-0 w-full h-full text-[#1a331c]"
          preserveAspectRatio="none"
        >
          <path
            d="M0,100 L0,40 L200,40 L300,0 L400,40 L600,10 L700,40 L900,20 L1000,40 L1200,40 L1200,100 Z"
            fill="currentColor"
          />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Mountain className="w-8 h-8 text-amber-600" />
              <div className="flex flex-col">
                <span className="text-white font-bold text-lg leading-tight" style={{ fontFamily: 'Bebas Neue, sans-serif' }}>
                  AVERAGE JOE
                </span>
                <span className="text-stone-300 text-sm leading-tight">
                  MOUNTAINEERING
                </span>
              </div>
            </div>
            <p className="text-stone-300 text-sm mb-4">
              Get Out There
            </p>
            <div className="flex gap-4">
              <a
                href="mailto:contact@averagejoeclimbing.com"
                className="text-stone-300 hover:text-amber-600 transition-colors"
                aria-label="Email"
              >
                <Mail className="w-5 h-5" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-stone-300 hover:text-amber-600 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-stone-300 hover:text-amber-600 transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4" style={{ fontFamily: 'Bebas Neue, sans-serif' }}>
              EXPLORE
            </h3>
            <ul className="space-y-2">
              <li>
                <Link to="/past-summits" className="text-stone-300 hover:text-amber-600 transition-colors text-sm">
                  Past Summits
                </Link>
              </li>
              <li>
                <Link to="/future-peaks" className="text-stone-300 hover:text-amber-600 transition-colors text-sm">
                  Future Peaks
                </Link>
              </li>
              <li>
                <Link to="/map" className="text-stone-300 hover:text-amber-600 transition-colors text-sm">
                  Summit Map
                </Link>
              </li>
              <li>
                <Link to="/gear" className="text-stone-300 hover:text-amber-600 transition-colors text-sm">
                  Gear Reviews
                </Link>
              </li>
              <li>
                <Link to="/gallery" className="text-stone-300 hover:text-amber-600 transition-colors text-sm">
                  Photo Gallery
                </Link>
              </li>
            </ul>
          </div>

          {/* Stats */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4" style={{ fontFamily: 'Bebas Neue, sans-serif' }}>
              JOURNEY STATS
            </h3>
            <div className="space-y-3">
              <div>
                <div className="text-amber-600 text-2xl font-bold" style={{ fontFamily: 'Bebas Neue, sans-serif' }}>{stats.totalSummits}</div>
                <div className="text-stone-300 text-sm">Total Summits</div>
              </div>
              <div>
                <div className="text-amber-600 text-2xl font-bold" style={{ fontFamily: 'Bebas Neue, sans-serif' }}>{stats.totalElevation.toLocaleString()} ft</div>
                <div className="text-stone-300 text-sm">Total Elevation Climbed</div>
              </div>
              <div>
                <div className="text-amber-600 text-2xl font-bold" style={{ fontFamily: 'Bebas Neue, sans-serif' }}>{stats.plannedPeaks}</div>
                <div className="text-stone-300 text-sm">Peaks Planned</div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-[#1a331c] text-center text-stone-300 text-sm">
          <p>&copy; {new Date().getFullYear()} Average Joe Mountaineering. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;