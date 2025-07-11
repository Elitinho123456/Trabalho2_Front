import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { PlusCircle, Edit, Trash2 } from 'lucide-react';
import type { Lesson, Subject, LessonReport } from './types';
import './Education.css';

const API_URL = 'http://localhost:8888/api/education'; // Assuming a base path for education endpoints

const AdminPage: React.FC = () => {
    const [view, setView] = useState<'list' | 'report'>('list');
    const [lessons, setLessons] = useState<Lesson[]>([]);
    const [subjects, setSubjects] = useState<Subject[]>([]);
    const [reportData, setReportData] = useState<LessonReport[]>([]);
    const [filters, setFilters] = useState({ title: '', subjectId: '' });
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentLesson, setCurrentLesson] = useState<Partial<Lesson> | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchSubjects = useCallback(async () => {
        try {
            const response = await axios.get<{ data: Subject[] }>(`${API_URL}/subjects`);
            setSubjects(response.data.data);
        } catch (err) {
            setError('Falha ao carregar as matérias.');
            console.error(err);
        }
    }, []);

    const fetchLessons = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get<{ data: Lesson[] }>(`${API_URL}/lessons`, {
                params: {
                    title: filters.title || undefined,
                    subject_id: filters.subjectId || undefined,
                },
            });
            setLessons(response.data.data);
        } catch (err) {
            setError('Falha ao carregar as aulas. Verifique se o backend está rodando em http://localhost:8888.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    }, [filters]);
    
    const fetchReport = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get<{ data: LessonReport[] }>(`${API_URL}/report`);
            setReportData(response.data.data);
        } catch (err) {
            setError('Falha ao carregar o relatório.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchSubjects();
    }, [fetchSubjects]);

    useEffect(() => {
        if (view === 'list') {
            fetchLessons();
        } else {
            fetchReport();
        }
    }, [view, fetchLessons, fetchReport]);


    const handleOpenModal = (lesson: Partial<Lesson> | null = null) => {
        setCurrentLesson(lesson ? { ...lesson } : { title: '', description: '', subject_id: subjects[0]?.id || 0, target_age_group: '', content_url: '' });
        setIsModalOpen(true);
        setError(null);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setCurrentLesson(null);
    };

    const handleSave = async () => {
        if (!currentLesson || !currentLesson.title || !currentLesson.subject_id) {
            setError("Título e matéria são obrigatórios.");
            return;
        }

        try {
            const url = currentLesson.id ? `${API_URL}/lessons/${currentLesson.id}` : `${API_URL}/lessons`;
            const method = currentLesson.id ? 'put' : 'post';
            await axios[method](url, currentLesson);
            fetchLessons();
            handleCloseModal();
        } catch (err) {
            setError('Erro ao salvar a aula.');
            console.error(err);
        }
    };

    const handleDelete = async (id: number) => {
        if (window.confirm('Tem certeza que deseja deletar esta aula?')) {
            try {
                await axios.delete(`${API_URL}/lessons/${id}`);
                fetchLessons();
            } catch (err) {
                setError('Erro ao deletar a aula.');
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

    const renderListView = () => (
        <>
            <div className="admin-edu-filters">
                <input
                    type="text"
                    name="title"
                    placeholder="Filtrar por título..."
                    value={filters.title}
                    onChange={handleFilterChange}
                />
                <select name="subjectId" value={filters.subjectId} onChange={handleFilterChange}>
                    <option value="">Todas as Matérias</option>
                    {subjects.map(sub => <option key={sub.id} value={sub.id}>{sub.name}</option>)}
                </select>
            </div>
            {loading ? <p>Carregando...</p> : (
                <table className="admin-edu-table">
                    <thead>
                        <tr>
                            <th>Título</th>
                            <th>Matéria</th>
                            <th>Faixa Etária</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {lessons.map((lesson) => (
                            <tr key={lesson.id}>
                                <td>{lesson.title}</td>
                                <td>{subjects.find(s => s.id === lesson.subject_id)?.name || 'N/A'}</td>
                                <td>{lesson.target_age_group}</td>
                                <td className="actions-cell">
                                    <button className="btn-edit" onClick={() => handleOpenModal(lesson)}><Edit size={18} /></button>
                                    <button className="btn-delete" onClick={() => handleDelete(lesson.id)}><Trash2 size={18} /></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </>
    );

    const renderReportView = () => (
        <>
            <h2>Relatório de Aulas por Matéria</h2>
            {loading ? <p>Carregando relatório...</p> : (
                 <table className="admin-edu-table">
                    <thead>
                        <tr>
                            <th>Matéria</th>
                            <th>Título da Aula</th>
                            <th>Faixa Etária</th>
                            <th>Descrição</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reportData.map((item) => (
                             <tr key={item.id}>
                                 <td>{item.subject_name}</td>
                                 <td>{item.title}</td>
                                 <td>{item.target_age_group}</td>
                                 <td>{item.description}</td>
                             </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </>
    );

    return (
        <div className="admin-edu-page">
            <div className="admin-edu-header">
                <h1>Painel Administrativo - Education</h1>
                <button className="edu-btn edu-btn-primary" onClick={() => handleOpenModal()}>
                    <PlusCircle size={18} /> Nova Aula
                </button>
            </div>
            
            <nav className="admin-edu-nav">
                <button onClick={() => setView('list')} className={view === 'list' ? 'active' : ''}>Gerenciar Aulas</button>
                <button onClick={() => setView('report')} className={view === 'report' ? 'active' : ''}>Relatório</button>
            </nav>

            {error && <p style={{ color: 'red', textAlign: 'center', background: '#fee2e2', padding: '0.5rem', borderRadius: '0.25rem' }}>{error}</p>}
            
            {view === 'list' ? renderListView() : renderReportView()}

            {isModalOpen && currentLesson && (
                <div className="edu-modal-overlay" onClick={handleCloseModal}>
                    <div className="edu-modal-content" onClick={e => e.stopPropagation()}>
                        <h2>{currentLesson.id ? 'Editar Aula' : 'Nova Aula'}</h2>
                        <div className="edu-form-group">
                            <label>Título</label>
                            <input type="text" value={currentLesson.title} onChange={e => setCurrentLesson({ ...currentLesson, title: e.target.value })} />
                        </div>
                        <div className="edu-form-group">
                             <label>Matéria</label>
                             <select value={currentLesson.subject_id} onChange={e => setCurrentLesson({ ...currentLesson, subject_id: Number(e.target.value) })}>
                                 {subjects.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                             </select>
                        </div>
                        <div className="edu-form-group">
                            <label>Faixa Etária (ex: 8-10 anos)</label>
                            <input type="text" value={currentLesson.target_age_group} onChange={e => setCurrentLesson({ ...currentLesson, target_age_group: e.target.value })} />
                        </div>
                         <div className="edu-form-group">
                            <label>Descrição</label>
                            <textarea rows={4} value={currentLesson.description} onChange={e => setCurrentLesson({ ...currentLesson, description: e.target.value })} />
                        </div>
                        <div className="edu-form-group">
                            <label>URL do Conteúdo</label>
                            <input type="text" value={currentLesson.content_url} onChange={e => setCurrentLesson({ ...currentLesson, content_url: e.target.value })} />
                        </div>
                        <div className="edu-form-actions">
                            <button className="edu-btn edu-btn-secondary" onClick={handleCloseModal}>Cancelar</button>
                            <button className="edu-btn edu-btn-primary" onClick={handleSave}>Salvar</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminPage;
