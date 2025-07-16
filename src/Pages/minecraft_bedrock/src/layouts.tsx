// src/layouts.tsx
import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { Button } from './ui'; // Importa o Button do arquivo ui.tsx

// --- Layout Principal (Frontend) ---
interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const navigate = useNavigate();

  return (
    <div id="root">
      {children}
      <footer className="footer">
        <p>© {new Date().getFullYear()} Minecraft. Todos os direitos reservados.</p>
        <p>Desenvolvido com <span style={{ color: '#ef4444' }}>♥</span> para aprendizado</p>
        <div className="footer-admin-link">
          <Button
            variant="secondary"
            onClick={() => navigate('/adm')}
            className="admin-access-button"
          >
            Acesso Administrativo
          </Button>
        </div>
      </footer>
    </div>
  );
};

// --- Layout do Painel Administrativo ---
export const AdminLayout: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <h3>Painel Admin</h3>
        <nav>
          <ul>
            <li><button onClick={() => navigate('/adm')}>Dashboard</button></li>
            <li><button onClick={() => navigate('/adm/banners')}>Banners</button></li>
            <li><button onClick={() => navigate('/adm/reports')}>Relatórios</button></li>
            <li><button onClick={() => navigate('/')}>Voltar ao Site</button></li>
          </ul>
        </nav>
      </aside>
      <main className="admin-main">
        <Outlet /> {/* Renderiza o conteúdo das rotas filhas aqui */}
      </main>
    </div>
  );
};