import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './i18n';
import Home from './pages/Home';
import Souvenirs from './pages/Souvenirs';
import About from './pages/About';
import Trips from './pages/Trips';
import Confirmation from './pages/Confirmation';
import AdminPanel from './pages/AdminPanel';
import './styles/globals.css';
import DivingTours from './pages/DivingTours';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/souvenirs" element={<Souvenirs />} />
        <Route path="/About" element={<About />} />
        <Route path="/trips" element={<Trips />} />
        <Route path="/diving-tours" element={<DivingTours />} />
        <Route path="/confirmation" element={<Confirmation />} />
        <Route path="/admin" element={<AdminPanel />} />
      </Routes>
    </Router>
  );
}

export default App;