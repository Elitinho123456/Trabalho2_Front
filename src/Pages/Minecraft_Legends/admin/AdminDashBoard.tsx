// src/components/AdminDashboard.tsx
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Importa Link e useNavigate
import '../Legends.css'; // Importa o arquivo CSS (considere criar um CSS específico para admin)

interface Skin {
  id: string;
  name: string;
  imageUrl: string;
  rarity: string;
  price: number;
}

// Componente funcional AdminDashboard (nome corrigido)
const AdminDashboard: React.FC = () => {
  const [skins, setSkins] = useState<Skin[]>([]);
  const navigate = useNavigate(); // Hook para navegação programática

  // Efeito que carrega as skins do localStorage na montagem inicial do componente
  useEffect(() => {
    const storedSkins = localStorage.getItem('minecraftSkins');
    if (storedSkins) {
      setSkins(JSON.parse(storedSkins));
    } else {
      setSkins([
        { id: '1', name: 'Knight Armor', imageUrl: 'https://via.placeholder.com/150/0000FF/FFFFFF?text=Knight', rarity: 'Rare', price: 150 },
        { id: '2', name: 'Dragon Slayer', imageUrl: 'https://via.placeholder.com/150/FF0000/FFFFFF?text=Dragon', rarity: 'Epic', price: 300 },
        { id: '3', name: 'Forest Spirit', imageUrl: 'https://via.placeholder.com/150/00FF00/FFFFFF?text=Forest', rarity: 'Common', price: 50 },
      ]);
    }
  }, []); // Array de dependências vazio significa que este efeito roda apenas uma vez

  // Função para lidar com a exclusão de uma skin
  const handleDelete = (id: string) => {
    if (window.confirm('Tem certeza que deseja excluir esta skin?')) {
      const updatedSkins = skins.filter(skin => skin.id !== id);
      setSkins(updatedSkins);
      // Salva a lista atualizada imediatamente após a exclusão
      localStorage.setItem('minecraftSkins', JSON.stringify(updatedSkins));
    }
  };

  // Função auxiliar para buscar dados (poderiam ser chamadas API)
  const fetchSkins = () => {
    const storedSkins = localStorage.getItem('minecraftSkins');
    if (storedSkins) {
      setSkins(JSON.parse(storedSkins));
    } else {
      setSkins([]); // Garante que a lista esteja vazia se não houver nada
    }
  };

  // Recarrega as skins sempre que a página é acessada (útil para ver edições/adições)
  useEffect(() => {
    fetchSkins();
  }, [navigate]); // Dependência do navigate para recarregar quando a rota é alcançada

  return (
    <div className="admin-dashboard">
      <div className="admin-header">
        <h1>Admin Dashboard - Gerenciar Skins</h1>
        <div style={{ display: 'flex', gap: '15px' }}>
            <Link to="/" className="btn-back">Voltar à Página Principal</Link>
            <Link to="/admin/skins/add" className="btn-primary">Adicionar Nova Skin</Link> {/* Botão para adicionar */}
            <Link to="/admin/skins/report" className="btn-secondary">Relatório de Skins</Link> {/* Botão para relatório */}
        </div>
      </div>

      <div className="admin-content">
        <div className="skin-list-section" style={{ flex: 'none', width: '100%' }}> {/* Ajusta o estilo para ocupar 100% */}
          <h2>Skins Existentes</h2>
          {skins.length === 0 ? (
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
                      {/* Botão de Editar que navega para a página de edição */}
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

export default AdminDashboard; // Exporta o componente AdminDashboard