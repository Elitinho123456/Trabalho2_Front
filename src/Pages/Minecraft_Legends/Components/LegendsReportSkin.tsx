import React, { useState, useEffect, useCallback } from 'react';

interface LegendsItem {
  id: string;
  name: string;
  type: string;
  description: string;
  // Adicione outras propriedades relevantes para o relatório
}

const API_BASE_URL_LEGENDS = 'http://localhost:8888/api/legends/items'; // **AJUSTE ESTA URL SE NECESSÁRIO**

const LegendsReportPage: React.FC = () => {
  const [items, setItems] = useState<LegendsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchLegendsItemsForReport = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch(API_BASE_URL_LEGENDS);
      if (!response.ok) {
        throw new Error(`Erro ao buscar dados para relatório: ${response.statusText}`);
      }
      const data: LegendsItem[] = await response.json();
      setItems(data);
    } catch (err: any) {
      setError(err.message);
      console.error("Erro ao buscar dados para relatório de Legends:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchLegendsItemsForReport();
  }, [fetchLegendsItemsForReport]);

  if (loading) return <div style={{ padding: '20px', textAlign: 'center' }}>Gerando relatório de Legends...</div>;
  if (error) return <div style={{ padding: '20px', color: 'red', textAlign: 'center' }}>Erro ao carregar relatório: {error}</div>;

  const itemCountsByType = items.reduce((acc, item) => {
    acc[item.type] = (acc[item.type] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div style={{ padding: '20px', maxWidth: '900px', margin: '0 auto' }}>
      <h2>Relatório de Entidades de Minecraft Legends</h2>
      
      <div style={{ marginBottom: '25px', padding: '15px', border: '1px solid #e0e0e0', borderRadius: '8px', backgroundColor: '#f9f9f9' }}>
        <h3>Visão Geral:</h3>
        <p><strong>Total de entidades cadastradas:</strong> {items.length}</p>
      </div>

      <div style={{ marginBottom: '25px', padding: '15px', border: '1px solid #e0e0e0', borderRadius: '8px', backgroundColor: '#f9f9f9' }}>
        <h3>Contagem por Tipo de Entidade:</h3>
        {Object.entries(itemCountsByType).length > 0 ? (
          <ul style={{ listStyleType: 'none', padding: 0 }}>
            {Object.entries(itemCountsByType).map(([type, count]) => (
              <li key={type} style={{ marginBottom: '5px' }}>
                <strong>{type}:</strong> {count} {count === 1 ? 'entidade' : 'entidades'}
              </li>
            ))}
          </ul>
        ) : (
          <p>Nenhuma entidade encontrada para o relatório.</p>
        )}
      </div>

      <h3>Detalhes das Entidades:</h3>
      {items.length === 0 ? (
        <p>Nenhuma entidade para exibir na lista detalhada.</p>
      ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
          <thead>
            <tr style={{ backgroundColor: '#eef' }}>
              <th style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'left' }}>ID</th>
              <th style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'left' }}>Nome</th>
              <th style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'left' }}>Tipo</th>
              <th style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'left' }}>Descrição</th>
            </tr>
          </thead>
          <tbody>
            {items.map(item => (
              <tr key={item.id} style={{ borderBottom: '1px solid #eee' }}>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>{item.id}</td>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>{item.name}</td>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>{item.type}</td>
                <td style={{ padding: '10px', border: '1px solid #ddd', fontSize: '0.9em' }}>{item.description.substring(0, 100)}{item.description.length > 100 ? '...' : ''}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default LegendsReportPage;