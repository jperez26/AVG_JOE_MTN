import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import PastSummits from './pages/PastSummits';
import FuturePeaks from './pages/FuturePeaks';
import SummitMap from './pages/SummitMap';
import GearReviews from './pages/GearReviews';
import Gallery from './pages/Gallery';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/past-summits" element={<PastSummits />} />
          <Route path="/future-peaks" element={<FuturePeaks />} />
          <Route path="/map" element={<SummitMap />} />
          <Route path="/gear" element={<GearReviews />} />
          <Route path="/gallery" element={<Gallery />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;