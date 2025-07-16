// src/pages/AdminPages.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Button } from '../ui'; // Importa Card e Button
import { Report } from '../types'; // Importa a interface

// --- AdminDashboard Component ---
export const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="dashboard">
      <h2>Painel de Administração</h2>
      <div className="dashboard-grid">
        <Card className="dashboard-card">
          <h3>Banners</h3>
          <p>Gerencie os banners da página inicial</p>
          <Button variant="secondary" onClick={() => navigate('/adm/banners')}>Gerenciar</Button>
        </Card>
        <Card className="dashboard-card">
          <h3>Relatórios</h3>
          <p>Visualize relatórios do sistema</p>
          <Button variant="secondary" onClick={() => navigate('/adm/reports')}>Visualizar</Button>
        </Card>
        <Card className="dashboard-card">
          <h3>Configurações</h3>
          <p>Configurações do sistema</p>
          <Button variant="secondary" disabled>Em breve</Button>
        </Card>
      </div>
    </div>
  );
};

// --- ReportsPage Component ---
export const ReportsPage: React.FC = () => {
  const navigate = useNavigate();
  const [reports] = useState<Report[]>([
    { id: '1', title: 'Visitas Mensais', data: '1,200 visitas em Julho', createdAt: '2023-07-01' },
    { id: '2', title: 'Downloads', data: '850 downloads no último mês', createdAt: '2023-07-05' },
    { id: '3', title: 'Banners Mais Visualizados', data: 'Banner principal: 95% visualizações', createdAt: '2023-07-10' }
  ]);

  return (
    <div className="admin-content">
      <div className="admin-header">
        <h2>Relatórios</h2>
        <Button variant="secondary" onClick={() => navigate('/adm')}>Voltar</Button>
      </div>
      <div className="reports-grid">
        {reports.map(report => (
          <Card key={report.id} className="report-card">
            <h3>{report.title}</h3>
            <p>{report.data}</p>
            <div className="report-footer">
              <span>Gerado em: {new Date(report.createdAt).toLocaleDateString()}</span>
              <Button variant="secondary">Exportar</Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};