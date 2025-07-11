// src/Pages/Minecraft_Dungeons/pages/ItemList.tsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../service/api';
import type { Item } from '../types'; // Verifique se o caminho do 'types' está correto
import '../styles/ItemList.css'; // Mantenha seus estilos


export default function ItemList() {
    const [itens, setItens] = useState<Item[]>([]);
    const [raridadeFiltro, setRaridadeFiltro] = useState(''); // Usei 'raridadeFiltro' para seguir a convenção de nomenclatura
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // O useEffect agora observa diretamente a mudança no filtro.
    // Esta é a forma padrão e mais limpa de fazer isso.
    useEffect(() => {
        // A função de fetch agora vive dentro do useEffect
        const fetchItens = async () => {
            setLoading(true);
            setError(null);

            try {
                // A chamada para a API já está correta com o /api
                const response = await api.get('/api/itens', {
                    params: { raridade: raridadeFiltro || undefined },
                });
                setItens(response.data);
            } catch (err) {
                setError('Falha ao carregar os itens. Verifique se o backend está ligado e o proxy configurado.');
                console.error("ERRO AO BUSCAR ITENS:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchItens();
    }, [raridadeFiltro]); // A ÚNICA dependência necessária é o filtro

    const handleDelete = async (id: number) => {
        if (window.confirm('Tem certeza que deseja excluir este item?')) {
            try {
                await api.delete(`/api/itens/${id}`);
                alert('Item excluído com sucesso!');
                // Força um novo fetch dos itens filtrando novamente
                // Para isso, precisamos refazer a chamada. Podemos criar uma função separada.
                // OU, uma forma mais simples, é filtrar o estado localmente.
                setItens(prevItens => prevItens.filter(item => item.id !== id));
            } catch (err) {
                alert('Erro ao excluir o item.');
                console.error("ERRO AO DELETAR:", err);
            }
        }
    };

    if (loading) return <p>Carregando itens...</p>;
    if (error) return <p style={{ color: 'red' }}>{error}</p>;

    return (
        <div className="item-list-container">
            <h2>Itens Cadastrados</h2>
            <div className="dungeons-actions-bar">
                {/* O link para o admin está correto */}
                <Link to="/admin/dungeons/novo" className='btn btn-add'>Adicionar Novo Item</Link>

                <div> {/* Adicionei uma div para agrupar o label e o select */}
                    <label style={{ marginRight: '10px' }}>Filtrar por Raridade: </label>
                    <select value={raridadeFiltro} onChange={(e) => setRaridadeFiltro(e.target.value)}>
                        <option value="">Todas</option>
                        <option value="Comum">Comum</option>
                        <option value="Raro">Raro</option>
                        <option value="Único">Único</option>
                    </select>
                </div>
            </div>

            <table className="dungeons-table">
                {/* ... seu código da tabela, que está perfeito ... */}
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