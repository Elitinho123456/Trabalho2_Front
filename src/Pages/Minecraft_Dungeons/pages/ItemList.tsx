import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import api from '../service/api'
import type { Item } from '../types';


export default function ItemList() {
    const [itens, setItens] = useState<Item[]>([]);
    const [RaridadeFiltro, setRaridadeFiltro] = useState('');
    const [Loading, setLoading] = useState(true)
    const [Error, setError] = useState<String | null>(null)

    const fetchItens = async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await api.get('/itens', {
                params: { raridade: RaridadeFiltro || undefined },
            });
            setItens(response.data);
        } catch (err) {
            setError('Falha ao carregar os itens. Verifque se o backend está ligado');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchItens();
    }, [RaridadeFiltro]);

    const handleDelete = async (id: number) => {
        if (window.confirm('Tem certeza que deseja excluir este item?')) {
            try {
                await api.delete(`/itens/${id}`);
                alert('Item excluído com sucesso!');
                fetchItens();
            } catch (err) {
                alert('erro ao excluir')
            }
        }
    };

    if (Loading)
        return <p>Carregando itens...</p>;
    if (Error)
        return <p style ={{color:'red'}}>{Error}</p>

    return (
        <div>
            <h2>Itens Cadastrados</h2>
            <Link to="/dungeons/novo">Adicionar Novo Item</Link>

            <div style={{ margin: '1rem 0' }}>
                <label>Filtrar por Raridade: </label>
                <select value={RaridadeFiltro} onChange={(e) => setRaridadeFiltro(e.target.value)}>
                    <option value="">Todas</option>
                    <option value="Comum">Comum</option>
                    <option value="Raro">Raro</option>
                    <option value="Único">Único</option>
                </select>
            </div>

            <table border={1} style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Poder</th>
                        <th>Raridade</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {itens.map((item) => (
                        <tr key={item.id}>
                            <td>{item.nome}</td>
                            <td>{item.poder}</td>
                            <td>{item.raridade}</td>
                            <td>
                                <Link to={`/dungeons/editar/${item.id}`}>Editar</Link>
                                {' | '}
                                <button onClick={() => handleDelete(item.id)}>Excluir</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}