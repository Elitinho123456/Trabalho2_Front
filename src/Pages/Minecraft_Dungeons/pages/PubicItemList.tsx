import React, { useEffect, useState } from 'react';
import api from '../service/api';
import type { Item } from '../types';
import '../styles/itemList.css';
import '../styles/dungeonsShared.css';

export default function PublicItemList() {
    const [items, setItems] = useState<Item[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setLoading(true);
        setError(null);
        api.get('/itens')
            .then(response => {
                setItems(response.data);
            })
            .catch(() => {
                setError('Não foi possível carregar os itens do jogo no momento.');
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    if (loading) return <p>Carregando base de dados do Dungeons...</p>;
    if (error) return <p style={{ color: 'red' }}>{error}</p>;

    return(
        <div className='item-list-container'>
            <h2>Itens do Jogo</h2>
            <p>Uma lista de todos os itens encontrados em Minecraft Dungeons</p>

            <table className="dungeons-table">
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Poder</th>
                        <th>Raridade</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map((item)=>{
                        <tr key={item.id}>
                            <td>{item.nome}</td>
                            <td>{item.poder}</td>
                            <td>{item.raridade}</td>
                        </tr>
                    })}
                </tbody>
            </table>
        </div>
    )
 }