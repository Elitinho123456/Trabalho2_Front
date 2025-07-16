// SkinForm.tsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';


interface SkinFormState {
  name: string;
  imageUrl: string;
  rarity: string;
  price: string; // Usamos string no formulário para facilitar a digitação
}

const SkinForm: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Pega o ID da URL se estiver editando
  const navigate = useNavigate();
  const isEditing = Boolean(id);

  const [form, setForm] = useState<SkinFormState>({
    name: '',
    imageUrl: '',
    rarity: '',
    price: ''
  });

  // Se estiver editando, busca os dados da skin para preencher o formulário
  useEffect(() => {
    if (isEditing) {
      const fetchSkin = async () => {
        try {
          const response = await fetch(`${API_BASE_URL}/${id}`);
          const data = await response.json();
          setForm({
            name: data.name,
            imageUrl: data.imageUrl,
            rarity: data.rarity,
            price: String(data.price)
          });
        } catch (error) {
          console.error("Erro ao buscar skin para edição:", error);
          alert("Não foi possível carregar a skin.");
        }
      };
      fetchSkin();
    }
  }, [id, isEditing]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validação dos dados
    if (!form.name || !form.imageUrl || !form.rarity || !form.price) {
      alert("Todos os campos são obrigatórios.");
      return;
    }

    const skinData = {
      ...form,
      price: parseFloat(form.price) // Converte o preço para número antes de enviar
    };

    const url = isEditing ? `${API_BASE_URL}/${id}` : API_BASE_URL;
    const method = isEditing ? 'PUT' : 'POST';

    try {
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(skinData),
      });

      if (!response.ok) {
        throw new Error(`Erro ao ${isEditing ? 'atualizar' : 'criar'} a skin.`);
      }

      alert(`Skin ${isEditing ? 'atualizada' : 'criada'} com sucesso!`);
      navigate('/admin/dashboard'); // Redireciona para o dashboard após sucesso
    } catch (error) {
      console.error(error);
      alert(error instanceof Error ? error.message : "Ocorreu um erro desconhecido.");
    }
  };

  return (
    <div className="admin-dashboard">
      <div className="admin-header">
        <h1>{isEditing ? 'Editar Skin' : 'Adicionar Nova Skin'}</h1>
      </div>
      <div className="admin-content">
        <form onSubmit={handleSubmit} className="skin-form">
          <div className="form-group">
            <label>Nome</label>
            <input type="text" name="name" value={form.name} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>URL da Imagem</label>
            <input type="text" name="imageUrl" value={form.imageUrl} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Raridade</label>
            <input type="text" name="rarity" value={form.rarity} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Preço</label>
            <input type="number" step="0.01" name="price" value={form.price} onChange={handleChange} />
          </div>
          <div className="form-actions">
            <button type="submit" className="btn-primary">{isEditing ? 'Atualizar' : 'Salvar'}</button>
            <button type="button" onClick={() => navigate('/admin/dashboard')} className="btn-secondary">Cancelar</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SkinForm;