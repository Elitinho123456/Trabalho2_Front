// Arquivo: Pages/Minecraft_Legends/Components/LegendsItemForm.tsx

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../admin/adminLegends.css';

const API_BASE_URL = 'http://10.10.65.27:8888/api/skins';

interface SkinFormState {
  name: string;
  imageUrl: string;
  rarity: string;
  price: string;
}

const LegendsItemForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEditing = Boolean(id);

  const [form, setForm] = useState<SkinFormState>({
    name: '',
    imageUrl: '',
    rarity: 'Common',
    price: ''
  });
  const [loading, setLoading] = useState(isEditing);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isEditing) {
      const fetchSkinToEdit = async () => {
        try {
          const response = await fetch(`${API_BASE_URL}/${id}`);
          if (!response.ok) throw new Error('Skin não encontrada.');
          const data = await response.json();
          setForm({
            name: data.name,
            imageUrl: data.imageUrl,
            rarity: data.rarity,
            price: String(data.price)
          });
        } catch (err) {
          setError('Erro ao carregar dados da skin para edição.');
          console.error(err);
        } finally {
          setLoading(false);
        }
      };
      fetchSkinToEdit();
    }
  }, [id, isEditing]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm(prevForm => ({ ...prevForm, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.imageUrl || !form.price) {
      alert('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    const skinData = { ...form, price: parseFloat(form.price) };

    try {
      const url = isEditing ? `${API_BASE_URL}/${id}` : API_BASE_URL;
      const method = isEditing ? 'PUT' : 'POST';
      await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(skinData),
      });
      alert(`Skin ${isEditing ? 'atualizada' : 'criada'} com sucesso!`);
      navigate('/admin/legends');
    } catch (err) {
      alert('Não foi possível salvar a skin.');
      console.error(err);
    }
  };

  if (loading) return <div className="admin-page"><p>Carregando formulário...</p></div>;
  if (error) return <div className="admin-page"><p className="error-message">{error}</p></div>;

  return (
    <div className="admin-page">
        <div className="form-container">
            <h2>{isEditing ? 'Editar Entidade' : 'Adicionar Nova Entidade'}</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Nome</label>
                    <input type="text" id="name" name="name" value={form.name} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label htmlFor="imageUrl">URL da Imagem</label>
                    <input type="text" id="imageUrl" name="imageUrl" value={form.imageUrl} onChange={handleChange} required />
                </div>
                 <div className="form-group">
                    <label htmlFor="rarity">Raridade</label>
                    <select id="rarity" name="rarity" value={form.rarity} onChange={handleChange}>
                        <option value="Common">Comum</option>
                        <option value="Rare">Raro</option>
                        <option value="Epic">Épico</option>
                        <option value="Legendary">Lendário</option>
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="price">Preço</label>
                    <input type="number" step="0.01" id="price" name="price" value={form.price} onChange={handleChange} required />
                </div>
                <div className="form-actions">
                    <button type="submit" className="btn-admin btn-primary-admin">{isEditing ? 'Atualizar' : 'Adicionar'}</button>
                    <button type="button" onClick={() => navigate('/admin/legends')} className="btn-admin btn-secondary-admin">Cancelar</button>
                </div>
            </form>
        </div>
    </div>
  );
};

export default LegendsItemForm;