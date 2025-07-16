// src/Pages/Minecraft_Dungeons/pages/ReportPage.tsx
import { useState, useEffect } from "react";
import api from '../service/api';
import type { ReportItem } from "../types";

// Importe os novos estilos e mantenha os antigos para a tabela
import '../styles/ReportPage.css'; 
import '../styles/ItemList.css';

// Defina um valor máximo de poder para calcular a porcentagem da barra
const MAX_POWER = 150; 

export default function ReportPage() {
    const [reportData, setReportData] = useState<ReportItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setLoading(true);
        setError(null);
        api.get('/api/relatorio/itens')
            .then(response => {
                setReportData(response.data);
            })
            .catch(err => {
                setError('Falha ao carregar o relatório.');
                console.error(err);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    // Função auxiliar para retornar a classe CSS correta para a raridade
    const getRarityClass = (rarity: string) => {
        switch (rarity.toLowerCase()) {
            case 'comum': return 'rarity-comum';
            case 'raro': return 'rarity-raro';
            case 'único': return 'rarity-unico';
            default: return '';
        }
    };

    if (loading) return <p>Gerando relatório...</p>;
    if (error) return <p style={{ color: 'red' }}>{error}</p>;

    return (
        <div className="report-container">
            {/* Cabeçalho Aprimorado */}
            <h1>Relatório de Itens por Categoria</h1>
            <p className="subtitle">Visão geral de todos os itens cadastrados no sistema.</p>
            
            <table className="dungeons-table">
                <thead>
                    <tr>
                        <th>Nome do Item</th>
                        <th>Poder</th>
                        <th>Raridade</th>
                        <th>Categoria</th>
                    </tr>
                </thead>
                <tbody>
                    {reportData.map(item => (
                        <tr key={item.id}>
                            <td>{item.nome}</td>
                            <td>
                                {/* Barra de Poder Visual */}
                                <div className="power-bar-container">
                                    <div 
                                        className="power-bar-fill"
                                        style={{ width: `${(item.poder / MAX_POWER) * 100}%` }}
                                    >
                                        {item.poder}
                                    </div>
                                </div>
                            </td>
                            <td>
                                {/* Badge de Raridade Colorido */}
                                <span className={`rarity-badge ${getRarityClass(item.raridade)}`}>
                                    {item.raridade}
                                </span>
                            </td>
                            <td>{item.nome_categoria}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}