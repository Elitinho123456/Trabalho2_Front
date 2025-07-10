import { useState, useEffect } from "react";
import api from '../service/api'
import type { ReportItem } from "../types";


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

    if (loading) return <p>Gerando relatório...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div>
            <h1>Relatório de Itens por Categoria</h1>
            <table>
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
                            <td>{item.poder}</td>
                            <td>{item.raridade}</td>
                            <td>{item.nome_categoria}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );


}
