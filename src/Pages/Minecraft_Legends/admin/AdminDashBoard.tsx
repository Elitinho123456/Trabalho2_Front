// src/admin/AdminSkinsDashboard.tsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './adminLegends.css'; // Reutilizando seu CSS existente ou crie um novo: adminSkins.css

// Definição da interface MinecraftSkin (deve ser a mesma do backend)
interface MinecraftSkin {
    id?: string;
    name: string;
    author?: string;
    type: 'Player' | 'Mob' | 'Custom';
    image_url: string;
    creation_date?: string;
    last_updated?: string;
    tags?: string[];
    downloads?: number;
    is_premium?: boolean;
}

const API_BASE_URL = 'http://localhost:3001/api/skins'; // URL do seu backend de skins

export default function AdminSkinsDashboard() {
    const [skins, setSkins] = useState<MinecraftSkin[]>([]);
    const [currentSkin, setCurrentSkin] = useState<MinecraftSkin | null>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchSkins();
    }, []);

    const fetchSkins = async () => {
        try {
            const response = await fetch(API_BASE_URL);
            if (!response.ok) {
                throw new Error(`Erro HTTP! status: ${response.status}`);
            }
            const data: MinecraftSkin[] = await response.json();
            setSkins(data);
        } catch (error) {
            console.error("Erro ao buscar skins:", error);
            alert("Não foi possível carregar as skins.");
        }
    };

    // 🔹 Funções CRUD

    const handleCreate = () => {
        setCurrentSkin(null);
        setIsEditing(true);
    };

    const handleEdit = (skin: MinecraftSkin) => {
        setCurrentSkin(skin);
        setIsEditing(true);
    };

    const handleDelete = async (id: string) => {
        if (window.confirm('Tem certeza que deseja deletar esta skin?')) {
            try {
                const response = await fetch(`${API_BASE_URL}/${id}`, {
                    method: 'DELETE',
                });
                if (!response.ok) {
                    throw new Error(`Erro HTTP! status: ${response.status}`);
                }
                setSkins(skins.filter((skin) => skin.id !== id));
                alert("Skin deletada com sucesso!");
            } catch (error) {
                console.error("Erro ao deletar skin:", error);
                alert("Erro ao deletar skin. Verifique o console.");
            }
        }
    };

    const handleSave = async (skinData: Omit<MinecraftSkin, 'id' | 'creation_date' | 'last_updated' | 'downloads'>) => {
        try {
            let response;
            if (currentSkin) {
                // Atualizar
                response = await fetch(`${API_BASE_URL}/${currentSkin.id}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(skinData),
                });
            } else {
                // Criar
                response = await fetch(API_BASE_URL, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(skinData),
                });
            }

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || `Erro HTTP! status: ${response.status}`);
            }
            await fetchSkins(); // Recarrega a lista de skins após a operação
            setIsEditing(false);
            setCurrentSkin(null);
            alert("Skin salva com sucesso!");
        } catch (error: any) {
            console.error("Erro ao salvar skin:", error);
            alert(`Erro ao salvar skin: ${error.message}. Verifique o console.`);
        }
    };

    // Função de "Resetar" (zerar downloads de uma skin)
    const handleResetDownloads = async (id: string) => {
        if (window.confirm('Tem certeza que deseja zerar os downloads desta skin?')) {
            try {
                const response = await fetch(`${API_BASE_URL}/${id}/reset`, {
                    method: 'PATCH',
                });
                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.message || `Erro HTTP! status: ${response.status}`);
                }
                await fetchSkins();
                alert("Downloads da skin resetados!");
            } catch (error: any) {
                console.error("Erro ao resetar downloads:", error);
                alert(`Erro ao resetar downloads: ${error.message}. Verifique o console.`);
            }
        }
    };

    // 🔹 Filtrar skins
    const filteredSkins = skins.filter((skin) =>
        skin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (skin.author && skin.author.toLowerCase().includes(searchTerm.toLowerCase())) ||
        skin.type.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="admin-container">
            <header className="admin-header">
                <h1>🎨 Minecraft Skins Dashboard</h1>
                <nav>
                    {/* Exemplo de link para o dashboard de itens existente */}
                    <Link to="/admin/items" className="nav-link">Gerenciar Itens</Link>
                    <Link to="/" className="nav-link">Voltar ao Site</Link>
                </nav>
            </header>

            <div className="admin-content">
                {/* Search & Add Skin */}
                <div className="admin-controls">
                    <input
                        type="text"
                        placeholder="Buscar skins por nome, autor ou tipo..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <button onClick={handleCreate} className="minecraft-button">
                        + Adicionar Skin
                    </button>
                </div>

                {/* Skins Table */}
                {filteredSkins.length === 0 ? (
                    <p>Nenhuma skin encontrada.</p>
                ) : (
                    <table className="minecraft-table">
                        <thead>
                            <tr>
                                <th>Nome</th>
                                <th>Autor</th>
                                <th>Tipo</th>
                                <th>URL Imagem</th> {/* Adicionado para visualização */}
                                <th>Downloads</th>
                                <th>Premium</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredSkins.map((skin) => (
                                <tr key={skin.id}>
                                    <td>{skin.name}</td>
                                    <td>{skin.author || 'N/A'}</td>
                                    <td>{skin.type}</td>
                                    <td><a href={skin.image_url} target="_blank" rel="noopener noreferrer">Ver Imagem</a></td>
                                    <td>{skin.downloads}</td>
                                    <td>{skin.is_premium ? 'Sim' : 'Não'}</td>
                                    <td className="actions">
                                        <button
                                            onClick={() => handleEdit(skin)}
                                            className="edit-button"
                                        >
                                            Editar
                                        </button>
                                        <button
                                            onClick={() => handleDelete(skin.id!)}
                                            className="delete-button"
                                        >
                                            Deletar
                                        </button>
                                        <button
                                            onClick={() => handleResetDownloads(skin.id!)}
                                            className="minecraft-button"
                                            style={{backgroundColor: '#FFD700', color: '#5A3921'}}
                                        >
                                            Resetar Downloads
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}

                {/* Edit/Create Form */}
                {isEditing && (
                    <div className="item-form">
                        <h2>{currentSkin ? 'Editar Skin' : 'Criar Nova Skin'}</h2>
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                const formData = new FormData(e.currentTarget);
                                const skinData: Omit<MinecraftSkin, 'id' | 'creation_date' | 'last_updated' | 'downloads'> = {
                                    name: formData.get('name') as string,
                                    author: formData.get('author') as string || undefined,
                                    type: formData.get('type') as 'Player' | 'Mob' | 'Custom',
                                    image_url: formData.get('image_url') as string,
                                    tags: formData.get('tags') ? (formData.get('tags') as string).split(',').map(tag => tag.trim()) : [],
                                    is_premium: formData.get('is_premium') === 'on' // Checkbox value is 'on' when checked
                                };
                                handleSave(skinData);
                            }}
                        >
                            <div className="form-group">
                                <label>Nome da Skin:</label>
                                <input
                                    name="name"
                                    defaultValue={currentSkin?.name || ''}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label>Autor:</label>
                                <input
                                    name="author"
                                    defaultValue={currentSkin?.author || ''}
                                />
                            </div>

                            <div className="form-group">
                                <label>Tipo:</label>
                                <select
                                    name="type"
                                    defaultValue={currentSkin?.type || 'Player'}
                                    required
                                >
                                    <option value="Player">Jogador</option>
                                    <option value="Mob">Mob</option>
                                    <option value="Custom">Personalizada</option>
                                </select>
                            </div>

                            <div className="form-group">
                                <label>URL da Imagem:</label>
                                <input
                                    name="image_url"
                                    defaultValue={currentSkin?.image_url || ''}
                                    required
                                    type="url"
                                />
                            </div>

                            <div className="form-group">
                                <label>Tags (separadas por vírgula):</label>
                                <input
                                    name="tags"
                                    defaultValue={currentSkin?.tags?.join(', ') || ''}
                                    placeholder="ex: fantasia, heroi, animal"
                                />
                            </div>

                            <div className="form-group" style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
                                <input
                                    type="checkbox"
                                    name="is_premium"
                                    defaultChecked={currentSkin?.is_premium || false}
                                    style={{width: 'auto', margin: '0'}}
                                />
                                <label style={{margin: '0'}}>Skin Premium?</label>
                            </div>

                            <div className="form-actions">
                                <button type="submit" className="save-button">
                                    Salvar Skin
                                </button>
                                <button
                                    type="button"
                                    onClick={() => {setIsEditing(false); setCurrentSkin(null);}}
                                    className="cancel-button"
                                >
                                    Cancelar
                                </button>
                            </div>
                        </form>
                    </div>
                )}
            </div>
        </div>
    );
}
// src/Pages/Minecraft_Legends/Legends.tsx

import React from 'react';
import { Link } from 'react-router-dom'; // Importe o Link
import './Legends.css'; // Seu CSS existente para Legends.tsx

export default function Legends() {
  return (
    <div className="legends-container">
      <header className="legends-header">
        <h1>Bem-vindo ao Mundo das Lendas do Minecraft!</h1>
        <p>Explore, crie e gerencie suas skins e itens.</p>
        <nav>
          {/* Adicione o botão aqui */}
          <Link to="/admin/skins" className="admin-button">
            Gerenciar Skins 🎨
          </Link>
          {/* Opcional: Adicione um link para o CRUD de itens também se existir */}
          <Link to="/admin/items" className="admin-button" style={{ marginLeft: '10px' }}>
            Gerenciar Itens ⚔️
          </Link>
        </nav>
      </header>

      <section className="legends-content">
        <h2>Últimas Skins Adicionadas:</h2>
        {/* Aqui você pode renderizar algumas das skins buscadas do seu backend */}
        <p>Conteúdo principal da sua página Legends...</p>
        {/* Exemplo: <SkinGallery /> */}
      </section>

      <footer className="legends-footer">
        <p>&copy; 2024 Minecraft Legends. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
}