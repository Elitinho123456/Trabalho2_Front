// src/Pages/Minecraft_Legends/Components/LegendsReportPage.tsx
import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';

interface LegendsItem {
    id: string;
    name: string;
    type: string;
    description: string;
    imageUrl?: string;
}

const API_BASE_URL_LEGENDS = 'http://localhost:8888/api/legends/items'; // **VERIFIQUE E AJUSTE ESTA URL SE NECESSÁRIO**

const LegendsReportPage: React.FC = () => {
    const [items, setItems] = useState<LegendsItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchLegendsItems = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(API_BASE_URL_LEGENDS);
            if (!response.ok) {
                throw new Error(`Erro ao buscar itens: ${response.statusText}`);
            }
            const data: LegendsItem[] = await response.json();
            setItems(data);
        } catch (err: any) {
            setError(err.message || 'Erro ao carregar itens de Legends para o relatório.');
            console.error("Erro ao carregar itens de Legends para o relatório:", err);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchLegendsItems();
    }, [fetchLegendsItems]);

    if (loading) return <div className="admin-container"><p>Gerando relatório...</p></div>;
    if (error) return <div className="admin-container"><p className="error-message">Erro ao gerar relatório: {error}</p></div>;
    if (items.length === 0) return <div className="admin-container"><p>Nenhum item de Legends encontrado para o relatório.</p></div>;

    // Métricas de exemplo para Legends
    const totalItems = items.length;
    const mobCount = items.filter(item => item.type === 'Mob').length;
    const structureCount = items.filter(item => item.type === 'Structure').length;
    const resourceCount = items.filter(item => item.type === 'Resource').length;
    const upgradeCount = items.filter(item => item.type === 'Upgrade').length;

    return (
        <div className="admin-dashboard">
            <div className="admin-header">
                <h1>Relatório de Itens do Minecraft Legends</h1>
                <Link to="/admin/legends" className="btn-back">Voltar ao Dashboard de Legends</Link>
            </div>
            <div className="admin-content">
                <div className="report-summary">
                    <h3>Resumo Geral</h3>
                    <p><strong>Total de Itens Cadastrados:</strong> {totalItems}</p>
                    <p><strong>Número de Mobs:</strong> {mobCount}</p>
                    <p><strong>Número de Estruturas:</strong> {structureCount}</p>
                    <p><strong>Número de Recursos:</strong> {resourceCount}</p>
                    <p><strong>Número de Upgrades:</strong> {upgradeCount}</p>
                </div>
                <h3>Lista Detalhada de Itens</h3>
                <table className="skin-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nome</th>
                            <th>Tipo</th>
                            <th>Descrição</th>
                            <th>URL da Imagem</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map(item => (
                            <tr key={item.id}>
                                <td>{item.id}</td>
                                <td>{item.name}</td>
                                <td>{item.type}</td>
                                <td>{item.description}</td>
                                <td>{item.imageUrl || 'N/A'}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default LegendsReportPage;