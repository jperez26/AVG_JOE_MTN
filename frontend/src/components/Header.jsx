import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Moon, Sun } from 'lucide-react';
import { Button } from './ui/button';

const Header = () => {
  const location = useLocation();
  const [theme, setTheme] = React.useState('dark');

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/past-summits', label: 'Past Summits' },
    { path: '/future-peaks', label: 'Future Peaks' },
    { path: '/map', label: 'Summit Map' },
    { path: '/gear', label: 'Gear Reviews' },
    { path: '/gallery', label: 'Gallery' }
  ];

  const isActive = (path) => location.pathname === path;

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    document.documentElement.classList.toggle('dark');
  };

  React.useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-stone-900/95 dark:bg-stone-900/95 backdrop-blur-sm border-b border-stone-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            {/* Annapurna outline SVG */}
            <svg
              className="w-10 h-10 text-emerald-500 group-hover:text-emerald-400 transition-colors"
              viewBox="0 0 100 100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10 80 L25 60 L35 70 L45 50 L55 65 L65 45 L75 55 L90 35 L95 80 Z"
                stroke="currentColor"
                strokeWidth="3"
                fill="none"
                strokeLinejoin="round"
              />
              <path
                d="M45 50 L50 40 L55 65"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
              />
            </svg>
            <span className="text-white font-bold text-xl" style={{ fontFamily: 'Bebas Neue, sans-serif', letterSpacing: '0.05em' }}>
              AVERAGE JOE MOUNTAINEERING
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-medium transition-colors relative ${
                  isActive(link.path)
                    ? 'text-white'
                    : 'text-emerald-500 hover:text-white'
                }`}
              >
                {link.label}
              </Link>
            ))}
            
            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="text-emerald-500 hover:text-white hover:bg-stone-800"
            >
              {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </Button>
          </nav>

          {/* Mobile - Show theme toggle only */}
          <div className="md:hidden flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="text-emerald-500 hover:text-white"
            >
              {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation - Always visible on small screens */}
        <nav className="md:hidden pb-4 flex flex-wrap gap-4 justify-center">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`text-xs font-medium transition-colors ${
                isActive(link.path)
                  ? 'text-white'
                  : 'text-emerald-500 hover:text-white'
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