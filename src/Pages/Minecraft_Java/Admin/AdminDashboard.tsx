import React from 'react';
import { Link } from 'react-router-dom';
import { Users, Package, FileText, Settings } from 'lucide-react';
import './Admin/admin.css'; // Assuming you'll create a specific CSS for admin

const AdminDashboard: React.FC = () => {
    return (
        <div className="admin-dashboard-wrapper">
            <header className="admin-header">
                <h1>Painel de Administração</h1>
                <p>Gerencie o conteúdo e os dados do site.</p>
            </header>

            <nav className="admin-nav">
                <Link to="/admin/users" className="admin-nav-item">
                    <Users size={32} />
                    <span>Gerenciar Usuários</span>
                </Link>
                <Link to="/admin/products" className="admin-nav-item">
                    <Package size={32} />
                    <span>Gerenciar Produtos</span>
                </Link>
                <Link to="/admin/reports" className="admin-nav-item">
                    <FileText size={32} />
                    <span>Visualizar Relatórios</span>
                </Link>
                {/* Add more management links as needed */}
                <Link to="/admin/settings" className="admin-nav-item">
                    <Settings size={32} />
                    <span>Configurações</span>
                </Link>
            </nav>

            <section className="admin-overview">
                <h2>Visão Geral Rápida</h2>
                <div className="overview-cards">
                    <div className="overview-card">
                        <h3>Total de Usuários</h3>
                        <p>1,234</p> {/* This would come from an API call */}
                    </div>
                    <div className="overview-card">
                        <h3>Produtos em Estoque</h3>
                        <p>567</p> {/* This would come from an API call */}
                    </div>
                    <div className="overview-card">
                        <h3>Vendas Hoje</h3>
                        <p>R$ 1.500</p> {/* This would come from an API call */}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default AdminDashboard;