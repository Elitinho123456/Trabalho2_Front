// src/App.tsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Importa os layouts diretamente de src/layouts.tsx
import { Layout, AdminLayout } from './layouts.tsx';

// Importa as páginas de suas respectivas localizações dentro de pages/
import HomePage from '../pages/HomePage';
import { AdminDashboard, ReportsPage } from '../pages/AdminPages';
import BannerManager from '../pages/BannerManager.tsx';

// Importa o CSS principal
import './index.css'; 

const App: React.FC = () => {
  return (
    <Routes>
      {/* Rotas Públicas */}
      <Route path="/" element={<Layout><HomePage /></Layout>} />

      {/* Rotas Administrativas */}
      <Route path="/adm" element={<AdminLayout />}>
        <Route index element={<AdminDashboard />} />
        <Route path="banners" element={<BannerManager />} />
        <Route path="reports" element={<ReportsPage />} />
      </Route>
    </Routes>
  );
};

export default App;