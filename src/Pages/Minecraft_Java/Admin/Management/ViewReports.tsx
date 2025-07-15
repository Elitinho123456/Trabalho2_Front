import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../../../CSS/Management.css';

// Interface para os dados do relatório
interface ReportData {
    user_id: number;
    user_name: string;
    user_email: string;
    product_id: number;
    product_name: string;
    product_type: string;
    download_date: string;
}

const API_URL = 'http://localhost:8888/api/reports/user-downloads';

const ViewReports: React.FC = () => {
    const [reportData, setReportData] = useState<ReportData[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    // Função para buscar os dados do relatório
    const fetchReportData = async () => {
        setLoading(true);
        try {
            const response = await axios.get(API_URL);
            setReportData(response.data);
            setError(null);
        } catch (err) {
            setError('Falha ao carregar o relatório.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchReportData();
    }, []);

    return (
        <div className="management-page">
            <div className="management-header">
                <h1>Relatório de Downloads por Usuário</h1>
            </div>

            {loading && <p>Carregando relatório...</p>}
            {error && <p className="error-message">{error}</p>}

            {!loading && !error && (
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Usuário</th>
                            <th>Email do Usuário</th>
                            <th>Produto Baixado</th>
                            <th>Tipo de Produto</th>
                            <th>Data do Download</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reportData.length === 0 ? (
                            <tr>
                                <td colSpan={5} style={{ textAlign: 'center' }}>Nenhum download registrado.</td>
                            </tr>
                        ) : (
                            reportData.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.user_name}</td>
                                    <td>{item.user_email}</td>
                                    <td>{item.product_name}</td>
                                    <td>{item.product_type}</td>
                                    <td>{new Date(item.download_date).toLocaleString('pt-BR')}</td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default ViewReports;
