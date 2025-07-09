import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import api from '../service/api'
import type { Item } from '../types';
import '../styles/ItemList.css'
import '../styles/dungeonsShared.css'

export default function ItemList() {
    const [itens, setItens] = useState<Item[]>([]);
    const [RaridadeFiltro, setRaridadeFiltro] = useState('');
    const [Loading, setLoading] = useState(true)
    const [Error, setError] = useState<string | null>(null)

    const fetchItens = React.useCallback(async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await api.get('/itens', {
                params: { raridade: RaridadeFiltro || undefined },
            });
            setItens(response.data);
        } catch (err) {
            setError('Falha ao carregar os itens. Verifque se o backend está ligado');
            console.log(err)
        } finally {
            setLoading(false);
        }
    }, [RaridadeFiltro]);

    useEffect(() => {
        fetchItens();
    }, [fetchItens]);

    const handleDelete = async (id: number) => {
        if (window.confirm('Tem certeza que deseja excluir este item?')) {
            try {
                await api.delete(`/itens/${id}`);
                alert('Item excluído com sucesso!');
                fetchItens();
            } catch (err) {
                alert('erro ao excluir')
                console.error(err)
            }
        }
    };

    if (Loading)
        return <p>Carregando itens...</p>;
    if (Error)
        return <p style={{color:'red'}}>{Error}</p>

    return (
        <div className="item-list-container">
            <h2>Itens Cadastrados</h2>
            <div className="dungeons-actions-bar">
                <Link to="/admin/dungeons/novo" className='btn btn-add'>Adicionar Novo Item</Link>

                <label>Filtrar por Raridade: </label>
                <select value={RaridadeFiltro} onChange={(e) => setRaridadeFiltro(e.target.value)}>
                    <option value="">Todas</option>
                    <option value="Comum">Comum</option>
                    <option value="Raro">Raro</option>
                    <option value="Único">Único</option>
                </select>
            </div>

            <table className="dungeons-table">
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
                                <Link to={`/admin/dungeons/editar/${item.id}`} className="btn-edit-link">Editar</Link>
                                {' | '}
                                <button onClick={() => handleDelete(item.id)} className="btn btn-delete">Excluir</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}