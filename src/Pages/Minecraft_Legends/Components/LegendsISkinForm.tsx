import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

interface LegendsItem {
  id?: string; // Opcional para criação
  name: string;
  type: string;
  description: string;
  imageUrl?: string;
}

const API_BASE_URL_LEGENDS = 'http://localhost:8888/api/legends/items'; // **AJUSTE ESTA URL SE NECESSÁRIO**

const LegendsItemForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [form, setForm] = useState<LegendsItem>({
    name: '',
    type: '',
    description: '',
    imageUrl: ''
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchItemForEdit = async () => {
      if (id) {
        try {
          const response = await fetch(`${API_BASE_URL_LEGENDS}/${id}`);
          if (!response.ok) {
            throw new Error(`Erro ao buscar item: ${response.statusText}`);
          }
          const itemToEdit: LegendsItem = await response.json();
          setForm(itemToEdit);
        } catch (err: any) {
          setError(err.message);
          console.error("Erro ao buscar item de Legends para edição:", err);
          alert('Não foi possível carregar os dados do item para edição.');
          navigate('/admin/legends');
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };
    fetchItemForEdit();
  }, [id, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm(prevForm => ({
      ...prevForm,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.type || !form.description) {
      alert('Por favor, preencha todos os campos obrigatórios (Nome, Tipo, Descrição).');
      return;
    }

    try {
      const method = id ? 'PUT' : 'POST';
      const url = id ? `${API_BASE_URL_LEGENDS}/${id}` : API_BASE_URL_LEGENDS;

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `Erro ao ${id ? 'atualizar' : 'adicionar'} item.`);
      }

      alert(`Item de Legends ${id ? 'atualizado' : 'adicionado'} com sucesso!`);
      navigate('/admin/legends');
    } catch (err: any) {
      console.error(`Erro ao ${id ? 'atualizar' : 'adicionar'} item de Legends:`, err);
      alert(`Não foi possível ${id ? 'atualizar' : 'adicionar'} o item: ${err.message}`);
    }
  };

  if (loading) return <div style={{ padding: '20px', textAlign: 'center' }}>Carregando dados do formulário...</div>;
  if (error) return <div style={{ padding: '20px', color: 'red', textAlign: 'center' }}>Erro ao carregar formulário: {error}</div>;

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto', border: '1px solid #ccc', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
      <h2>{id ? 'Editar Item de Legends' : 'Adicionar Novo Item de Legends'}</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <div>
          <label htmlFor="name" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Nome:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
          />
        </div>
        <div>
          <label htmlFor="type" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Tipo:</label>
          <select
            id="type"
            name="type"
            value={form.type}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
          >
            <option value="">Selecione um tipo</option>
            <option value="Mob">Mob</option>
            <option value="Structure">Estrutura</option>
            <option value="Resource">Recurso</option>
            <option value="Upgrade">Upgrade</option>
          </select>
        </div>
        <div>
          <label htmlFor="description" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Descrição:</label>
          <textarea
            id="description"
            name="description"
            value={form.description}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px', minHeight: '80px' }}
          />
        </div>
        <div>
          <label htmlFor="imageUrl" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>URL da Imagem (Opcional):</label>
          <input
            type="text"
            id="imageUrl"
            name="imageUrl"
            value={form.imageUrl || ''}
            onChange={handleChange}
            style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
          />
          {form.imageUrl && (
            <img src={form.imageUrl} alt="Preview" style={{ maxWidth: '100px', maxHeight: '100px', marginTop: '10px', display: 'block' }} />
          )}
        </div>
        <div style={{ display: 'flex', gap: '10px', marginTop: '15px' }}>
          <button
            type="submit"
            style={{ padding: '10px 20px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
          >
            {id ? 'Atualizar Item' : 'Adicionar Item'}
          </button>
          <button
            type="button"
            onClick={() => navigate('/admin/legends')}
            style={{ padding: '10px 20px', backgroundColor: '#6c757d', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};

export default LegendsItemForm;