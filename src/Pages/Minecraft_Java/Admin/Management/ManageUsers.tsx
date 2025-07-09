import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { PlusCircle, Edit, Trash2 } from 'lucide-react';
import '../../../../CSS/Management.css'

// Define a interface para um usuário
interface User {
    id: number;
    name: string;
    email: string;
    password?: string;
}

const API_URL = 'http://localhost:8888/api/users';

const ManageUsers: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentUser, setCurrentUser] = useState<Partial<User> | null>(null);
    const [error, setError] = useState<string | null>(null);

    // Função para buscar os usuários da API
    const fetchUsers = async () => {
        try {
            const response = await axios.get(API_URL);
            setUsers(response.data);
        } catch (err) {
            setError('Falha ao carregar usuários.');
            console.error(err);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    // Funções para abrir/fechar o modal
    const handleOpenModal = (user: Partial<User> | null = null) => {
        setCurrentUser(user ? { ...user } : { name: '', email: '', password: '' });
        setIsModalOpen(true);
        setError(null);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setCurrentUser(null);
    };

    // Função para salvar (criar ou atualizar) um usuário
    const handleSave = async () => {
        if (!currentUser || !currentUser.name || !currentUser.email) {
            setError("Nome e email são obrigatórios.");
            return;
        }
        
        // Se for um novo usuário, a senha é obrigatória
        if (!currentUser.id && !currentUser.password) {
            setError("Senha é obrigatória para novos usuários.");
            return;
        }

        try {
            if (currentUser.id) {
                // Atualizar usuário existente
                await axios.put(`${API_URL}/${currentUser.id}`, {
                    name: currentUser.name,
                    email: currentUser.email,
                });
            } else {
                // Criar novo usuário
                await axios.post(API_URL, currentUser);
            }
            fetchUsers();
            handleCloseModal();
        } catch (err: unknown) {
            if (axios.isAxiosError(err)) {
                setError(err.response?.data?.message || 'Erro ao salvar usuário.');
            } else {
                setError('Erro ao salvar usuário.');
            }
            console.error(err);
        }
    };

    // Função para deletar um usuário
    const handleDelete = async (id: number) => {
        if (window.confirm('Tem certeza que deseja deletar este usuário?')) {
            try {
                await axios.delete(`${API_URL}/${id}`);
                fetchUsers();
            } catch (err) {
                setError('Erro ao deletar usuário.');
                console.error(err);
            }
        }
    };

    return (
        <div className="management-page">
            <div className="management-header">
                <h1>Gerenciar Usuários</h1>
                <button className="btn btn-primary" onClick={() => handleOpenModal()}>
                    <PlusCircle size={18} /> Novo Usuário
                </button>
            </div>

            {error && <p className="error-message">{error}</p>}

            <table className="data-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>Email</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td className="actions-cell">
                                <button className="btn btn-secondary" onClick={() => handleOpenModal(user)}>
                                    <Edit size={16} />
                                </button>
                                <button className="btn btn-danger" onClick={() => handleDelete(user.id)}>
                                    <Trash2 size={16} />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {isModalOpen && currentUser && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h2>{currentUser.id ? 'Editar Usuário' : 'Novo Usuário'}</h2>
                        {error && <p className="error-message" style={{color: 'red'}}>{error}</p>}
                        <div className="form-group">
                            <label>Nome</label>
                            <input
                                type="text"
                                value={currentUser.name}
                                onChange={(e) => setCurrentUser({ ...currentUser, name: e.target.value })}
                            />
                        </div>
                        <div className="form-group">
                            <label>Email</label>
                            <input
                                type="email"
                                value={currentUser.email}
                                onChange={(e) => setCurrentUser({ ...currentUser, email: e.target.value })}
                            />
                        </div>
                        {!currentUser.id && (
                             <div className="form-group">
                                <label>Senha</label>
                                <input
                                    type="password"
                                    value={currentUser.password}
                                    onChange={(e) => setCurrentUser({ ...currentUser, password: e.target.value })}
                                />
                            </div>
                        )}
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

export default ManageUsers;
