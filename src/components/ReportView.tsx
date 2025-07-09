import React, { useState, useEffect } from 'react';
import * as api from '../../services/api';
import DataList from '../../components/DataList'; // Reusing DataList for tabular reports

interface SalesReportEntry {
    month: string;
    total_sales: number;
    total_orders: number;
}

const ReportView: React.FC = () => {
    const [salesReport, setSalesReport] = useState<SalesReportEntry[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchSalesReport = async () => {
        setLoading(true);
        setError(null);
        try {
            // Assuming an endpoint like /reports/sales-by-month that returns sales data
            const data = await api.get('/reports/sales-by-month');
            setSalesReport(data);
        } catch (err) {
            console.error('Failed to fetch sales report:', err);
            setError('Falha ao carregar o relatório de vendas. Tente novamente mais tarde.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSalesReport();
    }, []);

    const salesReportColumns = [
        { header: 'Mês', accessor: 'month' },
        { header: 'Total de Vendas', accessor: (item: SalesReportEntry) => `R$ ${item.total_sales.toFixed(2)}` },
        { header: 'Total de Pedidos', accessor: 'total_orders' },
    ];

    return (
        <div className="admin-section">
            <h2>Relatório de Vendas por Mês</h2>

            {error && <div className="alert alert-danger">{error}</div>}

            {loading ? (
                <p>Carregando relatório...</p>
            ) : (
                <>
                    {salesReport.length === 0 ? (
                        <p>Nenhum dado de vendas encontrado para o período.</p>
                    ) : (
                        <DataList<SalesReportEntry>
                            data={salesReport}
                            columns={salesReportColumns}
                            // Reports typically don't have edit/delete, so we provide dummy functions
                            onEdit={() => {}}
                            onDelete={() => {}}
                            idKey="month" // Use month as a pseudo-ID for this report
                        />
                    )}
                </>
            )}

            <h3>Outros Relatórios</h3>
            <ul>
                <li><a href="#">Relatório de Usuários Ativos</a></li>
                <li><a href="#">Produtos Mais Vendidos</a></li>
            </ul>
        </div>
    );
};

export default ReportView;