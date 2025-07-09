import React from 'react';
import { Edit, Trash2 } from 'lucide-react';

interface DataListProps<T> {
    data: T[];
    columns: { header: string; accessor: keyof T | ((item: T) => React.ReactNode) }[];
    onEdit: (item: T) => void;
    onDelete: (id: string | number) => void;
    idKey?: keyof T; // Key to identify unique items (e.g., 'id')
}

const DataList = <T extends Record<string, any>>({ data, columns, onEdit, onDelete, idKey = 'id' as keyof T }: DataListProps<T>) => {
    if (!data || data.length === 0) {
        return <p>Nenhum dado encontrado.</p>;
    }

    return (
        <div className="data-list-container">
            <table>
                <thead>
                    <tr>
                        {columns.map((col, index) => (
                            <th key={index}>{col.header}</th>
                        ))}
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, rowIndex) => (
                        <tr key={item[idKey] || rowIndex}>
                            {columns.map((col, colIndex) => (
                                <td key={colIndex}>
                                    {typeof col.accessor === 'function' ? col.accessor(item) : item[col.accessor]}
                                </td>
                            ))}
                            <td className="actions-cell">
                                <button onClick={() => onEdit(item)} className="btn-icon edit-btn" title="Editar">
                                    <Edit size={18} />
                                </button>
                                <button onClick={() => onDelete(item[idKey])} className="btn-icon delete-btn" title="Excluir">
                                    <Trash2 size={18} />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default DataList;