// AdminDashBoard.tsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './adminLegends.css';

// A URL base da sua API Fastify para as rotas de skins
const API_BASE_URL = 'http://localhost:8000/api/skins';

// A interface deve corresponder exatamente à do backend
interface Skin {
  id: number; // O ID do banco de dados é um número
  name: string;
  imageUrl: string;
  rarity: string;
  price: number;
}

const AdminDashboard: React.FC = () => {
  const [skins, setSkins] = useState<Skin[]>([]);
  const [isLoading, setIsLoading] = useState(true); // Estado para UX de carregamento

  // Função para buscar os dados da API
  const fetchSkins = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(API_BASE_URL);
      if (!response.ok) {
        throw new Error('Falha ao buscar dados da API. Verifique se o backend está rodando.');
      }
      const data: Skin[] = await response.json();
      setSkins(data);
    } catch (error) {
      console.error(error);
      alert(error instanceof Error ? error.message : "Ocorreu um erro desconhecido.");
    } finally {
      setIsLoading(false);
    }
  };

  // Efeito que busca os dados da API na montagem inicial do componente
  useEffect(() => {
    fetchSkins();
  }, []); // Array vazio executa apenas uma vez

  // Função para DELETAR uma skin através da API
  const handleDelete = async (id: number) => {
    if (window.confirm('Tem certeza que deseja excluir esta skin?')) {
      try {
        const response = await fetch(`${API_BASE_URL}/${id}`, {
          method: 'DELETE',
        });

        if (!response.ok) {
          throw new Error('Falha ao excluir a skin.');
        }

        // Se a exclusão no backend for bem-sucedida, atualiza o estado no frontend
        setSkins(skins.filter(skin => skin.id !== id));
        alert('Skin excluída com sucesso!');
      } catch (error) {
        console.error(error);
        alert(error instanceof Error ? error.message : "Ocorreu um erro ao excluir.");
      }
    }
  };

  return (
    <div className="admin-dashboard">
      <div className="admin-header">
        <h1>Admin Dashboard - Gerenciar Skins</h1>
        <div style={{ display: 'flex', gap: '15px' }}>
          <Link to="/" className="btn-back">Voltar à Página Principal</Link>
          <Link to="/admin/skins/add" className="btn-primary">Adicionar Nova Skin</Link>
          <Link to="/admin/skins/report" state={{ skins: skins }} className="btn-secondary">Relatório de Skins</Link>
        </div>
      </div>

      <div className="admin-content">
        <div className="skin-list-section" style={{ flex: 'none', width: '100%' }}>
          <h2>Skins Existentes</h2>
          {isLoading ? (
            <p>Carregando skins do servidor...</p>
          ) : skins.length === 0 ? (
            <p>Nenhuma skin cadastrada ainda.</p>
          ) : (
            <table className="skin-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Imagem</th>
                  <th>Nome</th>
                  <th>Raridade</th>
                  <th>Preço</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {skins.map(skin => (
                  <tr key={skin.id}>
                    <td data-label="ID">{skin.id}</td>
                    <td data-label="Imagem">
                      <img src={skin.imageUrl} alt={skin.name} className="skin-thumbnail" />
                    </td>
                    <td data-label="Nome">{skin.name}</td>
                    <td data-label="Raridade">{skin.rarity}</td>
                    <td data-label="Preço">${skin.price.toFixed(2)}</td>
                    <td className="table-actions" data-label="Ações">
                      <Link to={`/admin/skins/edit/${skin.id}`} className="btn-edit">Editar</Link>
                      <button onClick={() => handleDelete(skin.id)} className="btn-delete">Excluir</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;