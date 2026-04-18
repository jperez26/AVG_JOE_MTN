import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import { AuthProvider } from './contexts/AuthContext';
import { Toaster } from './components/ui/sonner';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import PastSummits from './pages/PastSummits';
import FuturePeaks from './pages/FuturePeaks';
import SummitMap from './pages/SummitMap';
import GearReviews from './pages/GearReviews';
import Gallery from './pages/Gallery';
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import ManageSummits from './pages/admin/ManageSummits';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<><Header /><Home /><Footer /></>} />
            <Route path="/past-summits" element={<><Header /><PastSummits /><Footer /></>} />
            <Route path="/future-peaks" element={<><Header /><FuturePeaks /><Footer /></>} />
            <Route path="/map" element={<><Header /><SummitMap /><Footer /></>} />
            <Route path="/gear" element={<><Header /><GearReviews /><Footer /></>} />
            <Route path="/gallery" element={<><Header /><Gallery /><Footer /></>} />
            
            {/* Admin Routes */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route
              path="/admin/dashboard"
              element={
                <ProtectedRoute>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/summits"
              element={
                <ProtectedRoute>
                  <ManageSummits />
                </ProtectedRoute>
              }
            />
          </Routes>
        </BrowserRouter>
        <Toaster />
      </AuthProvider>
    </div>
  );
}

export default App;

