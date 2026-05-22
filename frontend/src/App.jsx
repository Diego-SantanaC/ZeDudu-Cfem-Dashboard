import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Comparacao from './pages/Comparacao';
import Relatorios from './pages/Relatorios';
import Analises from './pages/Analises';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-4 shadow-lg">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold mb-4">ZeDudu CFEM Dashboard</h1>
            <nav className="flex gap-6">
              <Link to="/" className="hover:text-blue-200 transition">Dashboard</Link>
              <Link to="/comparacao" className="hover:text-blue-200 transition">Comparação</Link>
              <Link to="/analises" className="hover:text-blue-200 transition">Análises</Link>
              <Link to="/relatorios" className="hover:text-blue-200 transition">Relatórios</Link>
            </nav>
          </div>
        </header>

        <main className="bg-gray-50 min-h-screen">
          <div className="max-w-7xl mx-auto p-4">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/comparacao" element={<Comparacao />} />
              <Route path="/analises" element={<Analises />} />
              <Route path="/relatorios" element={<Relatorios />} />
            </Routes>
          </div>
        </main>

        <footer className="bg-gray-800 text-white p-4 mt-8">
          <div className="max-w-7xl mx-auto text-center">
            <p>© 2026 ZeDudu CFEM Dashboard | Fonte: ANM</p>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
