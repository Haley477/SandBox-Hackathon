import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import SettingUp from './pages/SettingUp'; 
import TimeFrame from './pages/TimeFrame'; 
import Troubleshoot from './pages/Troubleshoot'; 

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/setting-up" element={<SettingUp />} />
        <Route path="/time-frame" element={<TimeFrame />} />
        <Route path="/troubleshoot" element={<Troubleshoot />} />
      </Routes>
    </Router>
  </React.StrictMode>
);

