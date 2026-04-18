import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Mountain, Package, Image, LogOut } from 'lucide-react';
import { statsAPI } from '../../services/api';

const AdminDashboard = () => {
  const { logout } = useAuth();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const data = await statsAPI.get();
      setStats(data);
    } catch (error) {
      console.error('Failed to load stats:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-stone-900">
      {/* Header */}
      <header className="bg-stone-800 border-b border-stone-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-white" style={{ fontFamily: 'Bebas Neue, sans-serif' }}>
              Admin Dashboard
            </h1>
            <Button
              onClick={logout}
              variant="outline"
              className="border-amber-700 text-amber-700 hover:bg-amber-700 hover:text-white"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        {!loading && stats && (
          <div className="grid md:grid-cols-4 gap-6 mb-8">
            <Card className="bg-stone-800 border-stone-700">
              <CardContent className="p-6">
                <div className="text-4xl font-bold text-amber-700 mb-2">{stats.totalSummits}</div>
                <div className="text-stone-400">Summits Conquered</div>
              </CardContent>
            </Card>
            <Card className="bg-stone-800 border-stone-700">
              <CardContent className="p-6">
                <div className="text-4xl font-bold text-amber-700 mb-2">{stats.totalElevation.toLocaleString()}</div>
                <div className="text-stone-400">Feet Climbed</div>
              </CardContent>
            </Card>
            <Card className="bg-stone-800 border-stone-700">
              <CardContent className="p-6">
                <div className="text-4xl font-bold text-amber-700 mb-2">{stats.plannedPeaks}</div>
                <div className="text-stone-400">Peaks Planned</div>
              </CardContent>
            </Card>
            <Card className="bg-stone-800 border-stone-700">
              <CardContent className="p-6">
                <div className="text-4xl font-bold text-amber-700 mb-2">{stats.dreamPeaks}</div>
                <div className="text-stone-400">Dream Summits</div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Management Links */}
        <div className="grid md:grid-cols-3 gap-6">
          <Link to="/admin/summits">
            <Card className="bg-stone-800 border-stone-700 hover:border-amber-700 transition-colors cursor-pointer">
              <CardHeader>
                <Mountain className="w-12 h-12 text-amber-700 mb-4" />
                <CardTitle className="text-white" style={{ fontFamily: 'Bebas Neue, sans-serif' }}>
                  Manage Summits
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-stone-400">Add, edit, or delete summit records</p>
              </CardContent>
            </Card>
          </Link>

          <Link to="/admin/gear">
            <Card className="bg-stone-800 border-stone-700 hover:border-amber-700 transition-colors cursor-pointer">
              <CardHeader>
                <Package className="w-12 h-12 text-amber-700 mb-4" />
                <CardTitle className="text-white" style={{ fontFamily: 'Bebas Neue, sans-serif' }}>
                  Manage Gear Reviews
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-stone-400">Add, edit, or delete gear reviews</p>
              </CardContent>
            </Card>
          </Link>

          <Link to="/admin/gallery">
            <Card className="bg-stone-800 border-stone-700 hover:border-amber-700 transition-colors cursor-pointer">
              <CardHeader>
                <Image className="w-12 h-12 text-amber-700 mb-4" />
                <CardTitle className="text-white" style={{ fontFamily: 'Bebas Neue, sans-serif' }}>
                  Manage Gallery
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-stone-400">Add, edit, or delete gallery photos</p>
              </CardContent>
            </Card>
          </Link>
        </div>

        {/* Quick Link to Public Site */}
        <div className="mt-8 text-center">
          <Link to="/">
            <Button variant="outline" className="border-amber-700 text-amber-700 hover:bg-amber-700 hover:text-white">
              View Public Site
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
