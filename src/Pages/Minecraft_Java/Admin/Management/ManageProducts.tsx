import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { PlusCircle, Edit, Trash2 } from 'lucide-react';
import '../../../../CSS/Management.css'
import '../../../../CSS/filtros.css'

// Interfaces
interface Product {
    id: number;
    name: string;
    description: string;
    type_name: string;
    type_id: number;
    download_url: string;
}

interface ProductType {
    id: number;
    name: string;
}

const API_URL = 'http://localhost:8888/api';

const ManageProducts: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [productTypes, setProductTypes] = useState<ProductType[]>([]);
    const [filters, setFilters] = useState({ name: '', type: '' });
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentProduct, setCurrentProduct] = useState<Partial<Product> | null>(null);
    const [error, setError] = useState<string | null>(null);

    // Busca produtos e tipos de produtos
    const fetchData = React.useCallback(async () => {
        try {
            const [productsRes, typesRes] = await Promise.all([
                axios.get(`${API_URL}/products`, { params: filters }),
                axios.get(`${API_URL}/product-types`)
            ]);
            setProducts(productsRes.data);
            setProductTypes(typesRes.data);
        } catch (err) {
            setError('Falha ao carregar dados.');
            console.error(err);
        }
    }, [filters]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    // Modal handlers
    const handleOpenModal = (product: Partial<Product> | null = null) => {
        setCurrentProduct(product ? { ...product } : { name: '', description: '', type_id: 1, download_url: '' });
        setIsModalOpen(true);
        setError(null);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setCurrentProduct(null);
    };

    // Save (Create/Update)
    const handleSave = async () => {
        if (!currentProduct || !currentProduct.name || !currentProduct.type_id || !currentProduct.download_url) {
            setError("Nome, tipo e URL de download são obrigatórios.");
            return;
        }

        try {
            const url = currentProduct.id ? `${API_URL}/products/${currentProduct.id}` : `${API_URL}/products`;
            const method = currentProduct.id ? 'put' : 'post';
            await axios[method](url, currentProduct);

            fetchData();
            handleCloseModal();
        } catch (err: unknown) {
            if (axios.isAxiosError(err)) {
                setError(err.response?.data?.message || 'Erro ao salvar produto.');
            } else {
                setError('Erro ao salvar produto.');
            }
            console.error(err);
        }
    };

    // Delete
    const handleDelete = async (id: number) => {
        if (window.confirm('Tem certeza que deseja deletar este produto?')) {
            try {
                await axios.delete(`${API_URL}/products/${id}`);
                fetchData();
            } catch (err) {
                setError('Erro ao deletar produto.');
                console.error(err);
            }
        }
    };

    const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFilters({
            ...filters,
            [e.target.name]: e.target.value
        });
    };

    return (
        <div className="management-page">
            <div className="management-header">
                <h1>Gerenciar Produtos (Mods, Texturas, etc.)</h1>
                <button className="btn btn-primary" onClick={() => handleOpenModal()}>
                    <PlusCircle size={18} /> Novo Produto
                </button>
            </div>

            <div className="filters">
                <input
                    type="text"
                    name="name"
                    placeholder="Filtrar por nome..."
                    value={filters.name}
                    onChange={handleFilterChange}
                />
                <select name="type" value={filters.type} onChange={handleFilterChange}>
                    <option value="">Todos os Tipos</option>
                    {productTypes.map(type => (
                        <option key={type.id} value={type.name}>{type.name}</option>
                    ))}
                </select>
            </div>

            {error && <p className="error-message">{error}</p>}

            <table className="data-table">
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Tipo</th>
                        <th>Descrição</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product) => (
                        <tr key={product.id}>
                            <td>{product.name}</td>
                            <td>{product.type_name}</td>
                            <td>{product.description}</td>
                            <td className="actions-cell">
                                <button className="btn btn-secondary" onClick={() => handleOpenModal(product)}>
                                    <Edit size={16} />
                                </button>
                                <button className="btn btn-danger" onClick={() => handleDelete(product.id)}>
                                    <Trash2 size={16} />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {isModalOpen && currentProduct && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h2>{currentProduct.id ? 'Editar Produto' : 'Novo Produto'}</h2>
                        {error && <p className="error-message" style={{ color: 'red' }}>{error}</p>}
                        <div className="form-group">
                            <label>Nome</label>
                            <input type="text" value={currentProduct.name} onChange={(e) => setCurrentProduct({ ...currentProduct, name: e.target.value })} />
                        </div>
                        <div className="form-group">
                            <label>Tipo</label>
                            <select value={currentProduct.type_id} onChange={(e) => setCurrentProduct({ ...currentProduct, type_id: parseInt(e.target.value) })}>
                                {productTypes.map(type => (
                                    <option key={type.id} value={type.id}>{type.name}</option>
                                ))}
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Descrição</label>
                            <textarea value={currentProduct.description} onChange={(e) => setCurrentProduct({ ...currentProduct, description: e.target.value })} />
                        </div>
                        <div className="form-group">
                            <label>URL de Download</label>
                            <input type="text" value={currentProduct.download_url} onChange={(e) => setCurrentProduct({ ...currentProduct, download_url: e.target.value })} />
                        </div>
                        <div className="form-actions">
                            <button className="btn btn-secondary" onClick={handleCloseModal}>Cancelar</button>
                            <button className="btn btn-primary" onClick={handleSave}>Salvar</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ManageProducts;
