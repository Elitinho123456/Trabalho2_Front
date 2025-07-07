import React from 'react';

import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import HomePage from './pages_dungeons/HomePage';
import HeroesPage from './pages_dungeons/HeroesPage';
import ArtifactsPage from './pages_dungeons/ArtifactsPage';
import ReportsPage from './pages_dungeons/ReportsPage';
import LoginPage from './pages_dungeons/LoginPage';

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />

      {All authenticated users (admin or not) can access these routes}
      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="heroes" element={<HeroesPage />} />
          <Route path="artifacts" element={<ArtifactsPage />} />
          <Route path="reports" element={<ReportsPage />} />
        </Route>
      </Route>
      
      { Fallback redirect for any other path}
      <Route path="*" element={<AuthRedirect />} />
    </Routes>
  );
};

const AuthRedirect: React.FC = () => {
  const { user } = useAuth();
  // If user is not logged in, redirect to login
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  // If user is logged in, but on a wrong path, redirect to home
  return <Navigate to="/" replace />;
};

const Dungeons: React.FC = () => {
  return (
    <HashRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </HashRouter>
  );
};

export default Dungeons;
