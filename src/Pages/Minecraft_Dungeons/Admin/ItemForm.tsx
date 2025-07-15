import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import api from '../service/api'
import type { Categoria } from "../types";
import '../styles/itemForm.css'
import '../styles/dungeons.css'

export default function ItemForm() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const [nome, setNome] = useState('');
    const [poder, setPoder] = useState(0);
    const [raridade, setRaridade] = useState('comum');
    const [categoriaId, setCategoriaId] = useState<number | ''>('');
    const [categorias, setCategorias] = useState<Categoria[]>([]);
    const [error, setError] = useState('');

    useEffect(() => {
        api.get('/api/categorias').then(response => {
            setCategorias(response.data);
        }).catch(() => setError('Não foi possível carregar as categorias'));
    }, []);

    useEffect(() => {
        if (id) {
            api.get(`/api/itens/${id}`).then(response => {
                const item = response.data;
                setNome(item.nome);
                setPoder(item.poder);
                setRaridade(item.raridade);
                setCategoriaId(item.categoria_id);
            }).catch(() => setError('Não foi possível carregar os dados do item para edição.'));
        }
    }, [id]);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setError('');

        if (!nome || poder <= 0 || !categoriaId) {
            setError('todos os campos precisam estar preenchidos')
            return;
        }
        const itemData = { nome, poder, raridade, categoria_id: Number(categoriaId) };

        try {
            if (id) {
                await api.put(`/api/itens/${id}`, itemData);
                alert('Item atualizado com sucesso!');
            } else {
                await api.post('/api/itens', itemData)
                alert('item criado com sucesso!');
            }
            navigate('/admin/dungeons');
        } catch (err) {
            setError("Ocooreu um erro ao salvar. Tente Novamente.");
            console.error(err)
        }
    };

    return (
         <div className="dungeons-form-container"> 
            <h2>
                {id ? 'Editar Item' : 'Adicionar Novo Item'}
            </h2>
            {error && <p className="form-error">{error}</p>}
            <form onSubmit={handleSubmit} className="dungeons-form">
                <div className="form-group">
                    <label>Nome:</label>
                    <input type="text" value={nome} onChange={e => setNome(e.target.value)} />
                </div>
                <div className="form-group">
                    <label>Poder:</label>
                    <input type="number" value={poder} onChange={e => setPoder(Number(e.target.value))}/>
                </div>
                <div className="form-group">
                    <label>Raridade:</label>
                    <select value={raridade} onChange={e=>setRaridade(e.target.value)}>
                        <option value="Comum">Comum</option>
                        <option value="Raro">Raro</option>
                        <option value="Único">Único</option>
                    </select>
                </div>
                <div className="form-group">
                    <label>Categoria:</label>
                    <select value={categoriaId} onChange={e=> setCategoriaId(Number(e.target.value))}>
                        <option value="">Selecione...</option>
                        {categorias.map(cat=>(
                            <option key={cat.id} value={cat.id}>{cat.nome}</option>
                        ))}
                    </select>
                </div>
                <button type="submit" className="btn btn-add">Salvar</button>
            </form>
        </div>
    );
}