import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, FlaskConical, Globe, Users, PenTool, BrainCircuit } from 'lucide-react';
import './Education.css';

const features = [
    {
        icon: <BookOpen size={32} />,
        title: "Aprendizagem Imersiva",
        description: "Explore história, matemática e ciências em mundos 3D interativos."
    },
    {
        icon: <Users size={32} />,
        title: "Colaboração em Sala de Aula",
        description: "Projetos em grupo que incentivam a comunicação e o trabalho em equipe."
    },
    {
        icon: <BrainCircuit size={32} />,
        title: "Resolução de Problemas",
        description: "Enfrente desafios que desenvolvem o pensamento crítico e a criatividade."
    },
    {
        icon: <PenTool size={32} />,
        title: "Criação de Conteúdo",
        description: "Alunos e educadores podem criar e compartilhar suas próprias lições e mundos."
    },
    {
        icon: <FlaskConical size={32} />,
        title: "Química no Jogo",
        description: "Conduza experimentos seguros com o Laboratório de Química virtual."
    },
    {
        icon: <Globe size={32} />,
        title: "Cidadania Digital",
        description: "Aprenda sobre segurança online e comportamento digital responsável."
    }
];

const EducationPage: React.FC = () => {
    return (
        <div className="education-page">
            <header className="edu-hero">
                <div className="edu-hero-bg"></div>
                <div className="edu-hero-content">
                    <h1>Minecraft: Education Edition</h1>
                    <p>Desbloqueie o potencial de seus alunos com um aprendizado baseado em jogos que transforma a maneira como ensinamos e aprendemos.</p>
                    <a href="#features" className="edu-btn edu-btn-primary">Descubra os Recursos</a>
                </div>
                <div className="edu-admin-link">
                    <Link to="/admin/education" className="edu-btn">
                        Área Administrativa
                    </Link>
                </div>
            </header>

            <main>
                <section id="features" className="edu-section">
                    <div className="container">
                        <h2 style={{ textAlign: 'center', marginBottom: '3rem', fontSize: '2rem' }}>Aprender nunca foi tão divertido</h2>
                        <div className="edu-grid">
                            {features.map((feature, index) => (
                                <div className="edu-card" key={index}>
                                    <div className="edu-card-icon">{feature.icon}</div>
                                    <h3>{feature.title}</h3>
                                    <p>{feature.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default EducationPage;
