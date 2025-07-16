import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './adminLegends.css'; // Estilos para o painel

// Definindo o tipo da nossa entidade para ter um código mais seguro
export interface DlcEntity {
  id: number;
  title: string;
  imageUrl: string;
  description: string;
}

// Dados iniciais para simular um banco de dados
const initialEntities: DlcEntity[] = [
  { id: 1, title: 'Construindo Sua Base', imageUrl: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1928870/ss_65720eb73a2dd8fc993172cfbfcdc8fe40ec44c2.1920x1080.jpg?t=1746133966', description: 'Aprenda a construir e fortificar sua base contra hordas inimigas.' },
  { id: 2, title: 'Invadindo Castelo', imageUrl: 'https://static1.cbrimages.com/wordpress/wp-content/uploads/2022/06/Minecraft-Legends-gameplay.jpg', description: 'Lidere seus aliados em uma invasão épica a um castelo dos Piglins.' },
  { id: 3, title: 'Montarias Únicas', imageUrl: 'https://cdnb.artstation.com/p/assets/images/images/072/761/757/large/lisha-leston-legends-render-hero-champion.jpg?1708125789', description: 'Descubra e dome novas montarias com habilidades especiais.' },
];

const AdminLegends: React.FC = () => {
  const [entities, setEntities] = useState<DlcEntity[]>(initialEntities);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [editingEntity, setEditingEntity] = useState<DlcEntity | undefined>(undefined);
  const navigate = useNavigate();

  // Função para deletar uma entidade
  const handleDelete = (id: number) => {
    if (window.confirm('Tem certeza de que deseja excluir esta entidade?')) {
      setEntities(entities.filter((entity) => entity.id !== id));
    }
  };

  // Função para abrir o formulário para edição
  const handleEdit = (entity: DlcEntity) => {
    setEditingEntity(entity);
    setIsFormVisible(true);
  };

  // Função para abrir o formulário para criação
  const handleAdd = () => {
    setEditingEntity(undefined);
    setIsFormVisible(true);
  };

  // Função para salvar (criar ou atualizar) uma entidade
  const handleSave = (entityToSave: Omit<DlcEntity, 'id'> & { id?: number }) => {
    if (entityToSave.id) {
      // Atualizar
      setEntities(entities.map((e) => (e.id === entityToSave.id ? { ...e, ...entityToSave } as DlcEntity : e)));
    } else {
      // Criar (simulando um novo ID)
      const newEntity: DlcEntity = {
        ...entityToSave,
        id: Date.now(), // Usando timestamp como ID único para o exemplo
      };
      setEntities([...entities, newEntity]);
    }
    setIsFormVisible(false);
  };

  // Função para navegar para a página de relatório
  const handleViewReport = () => {
    // Passando os dados atuais para a página de relatório através do estado da rota
    navigate('/admin/legends/report', { state: { entities: entities } });
  };

  return (
    <div className="admin-container">
      <div className="admin-header">
        <h1>Gerenciador de Entidades de Legends</h1>
        <div className="admin-actions">
          <button onClick={handleAdd} className="btn-add">Adicionar Nova Entidade</button>
          <button onClick={handleViewReport} className="btn-report">Gerar Relatório</button>
        </div>
      </div>

      <table className="admin-table">
        <thead>
          <tr>
            <th>Imagem</th>
            <th>Título</th>
            <th>Descrição</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {entities.map((entity) => (
            <tr key={entity.id}>
              <td><img src={entity.imageUrl} alt={entity.title} className="entity-image-thumbnail" /></td>
              <td>{entity.title}</td>
              <td>{entity.description}</td>
              <td className="actions-cell">
                <button onClick={() => handleEdit(entity)} className="btn-edit">Editar</button>
                <button onClick={() => handleDelete(entity.id)} className="btn-delete">Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isFormVisible && (
        <EntityForm
          initialData={editingEntity}
          onSave={handleSave}
          onCancel={() => setIsFormVisible(false)}
        />
      )}
    </div>
  );
};

export default AdminLegends;