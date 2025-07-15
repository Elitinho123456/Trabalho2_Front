import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Users, Package, FileText, Settings } from 'lucide-react';
import './Admin.css';

// Interfaces
// Define a interface User para os usuários
interface User {
    id: number;
    name: string;
    email: string;
    password?: string;
}

 // Define a interface Product para os produtos
interface Product {
    id: number;
    name: string;
    description: string;
    type_name: string;
    type_id: number;
    download_url: string;
}

// Página principal do painel de administração
const AdminDashboard: React.FC = () => {

    const [users, setUsers] = useState<User[]>([]); // Lista de usuários
    const [products, setProducts] = useState<Product[]>([]); // Lista de produtos
    const [error, setError] = useState<string | null>(null); // Mensagem de erro

    // Função para buscar usuários
    const dataUser = async () => {

        try {

            const response = await fetch('http://localhost:8888/api/users'); // URL da API para buscar usuários
            const newData = await response.json(); // Verifica se a resposta é um array e atualiza o estado

            if (!Array.isArray(newData)) {
                throw setError('Dados inválidos recebidos da API'); // Lança um erro se os dados não forem um array
            }

            setUsers(Array.isArray(newData) ? newData : []); // Atualiza o estado com os usuários

        } catch (error) {

            console.error('Erro ao buscar usuários: Falha na conexão com o servidor.');
            setError(`Erro ao buscar usuários: ${error instanceof Error}`);

            // Atualiza o estado de erro com a mensagem de erro
            setUsers([]); // Limpa a lista de usuários em caso de erro
            setProducts([]); // Limpa a lista de produtos em caso de erro
            setError('Erro ao buscar usuários. Por favor, tente novamente mais tarde.'); // Mensagem de erro genérica
        }
    };

    // Função para buscar produtos
    const dataProducts = async () => {

        try {

            const response = await fetch('http://localhost:8888/api/products'); // URL da API para buscar produtos
            const newData = await response.json(); // Verifica se a resposta é um array e atualiza o estado

            setProducts(Array.isArray(newData) ? newData : []); // Atualiza o estado com os produtos

        } catch (error) {
            console.error('Erro ao buscar produtos: Falha na conexão com o servidor.');
            setError(`Erro ao buscar produtos: ${error instanceof Error}`);
        }
    }

    useEffect(() => {
        dataUser();
        dataProducts();
    }, []);

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
                <Link to="/admin/#" className="admin-nav-item">
                    <Settings size={32} />
                    <span>Configurações</span>
                </Link>
            </nav>
            {error && <p className="error-message">{error}</p>}
            <section className="admin-overview">
                <h2>Visão Geral Rápida</h2>
                <div className="overview-cards">
                    <div className="overview-card"
                    >
                        <h3>Total de Usuários</h3>
                        <p>{users.length}</p>
                    </div>
                    <div className="overview-card">
                        <h3>Produtos em Estoque</h3>
                        <p>{products.length}</p>
                    </div>
                    <div className="overview-card">
                        <h3>Vendas Hoje</h3>
                        <p>R$ 1.500</p> {/* Não tá implementado porque não quero colocar preço */}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default AdminDashboard;