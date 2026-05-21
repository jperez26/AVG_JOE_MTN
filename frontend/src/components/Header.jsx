import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Mountain } from 'lucide-react';

const Header = () => {
  const location = useLocation();

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/past-summits', label: 'Past Summits' },
    { path: '/future-peaks', label: 'Future Peaks' },
    { path: '/map', label: 'Summit Map' },
    { path: '/gear', label: 'Gear Reviews' },
    { path: '/gallery', label: 'Gallery' },
    { path: '/contact', label: 'Contact' }
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#2C5530] backdrop-blur-sm border-b border-[#1a331c]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <Mountain className="w-8 h-8 text-amber-600 group-hover:text-amber-500 transition-colors" />
            <div className="flex flex-col leading-tight">
              <span className="text-white font-bold text-base" style={{ fontFamily: 'Bebas Neue, sans-serif', letterSpacing: '0.05em' }}>
                AVG JOE
              </span>
              <span className="text-white font-bold text-xs" style={{ fontFamily: 'Bebas Neue, sans-serif', letterSpacing: '0.05em' }}>
                MOUNTAINEERING
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-medium transition-colors relative whitespace-nowrap ${
                  isActive(link.path)
                    ? 'text-white'
                    : 'text-amber-600 hover:text-white'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Mobile Navigation */}
        <nav className="md:hidden pb-4 flex flex-wrap gap-4 justify-center">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`text-xs font-medium transition-colors ${
                isActive(link.path)
                  ? 'text-white'
                  : 'text-amber-600 hover:text-white'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Header;