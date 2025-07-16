import React, { useEffect, useRef } from 'react';
import { Link as LinkDom } from 'react-router-dom';
// Ícones relevantes para o Minecraft Legends
import { Sword, Shield, Map, Crown, Users, Gem } from 'lucide-react';
import './Legends.css'; // Importando o CSS específico para o Legends

// Componente auxiliar para os cartões de funcionalidades (reutilizado)
type FeatureCardProps = {
    icon: React.ReactNode;
    title: string;
    description: string;
    delay: number;
};

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description, delay }) => {
    const cardRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            },
            { threshold: 0.1 }
        );

        const node = cardRef.current;
        if (node) observer.observe(node);
        return () => {
            if (node) observer.unobserve(node);
        };
    }, []);

    return (
        <div ref={cardRef} className="feature-card" style={{ transitionDelay: `${delay * 100}ms` }}>
            <div className="feature-icon">{icon}</div>
            <h3>{title}</h3>
            <p>{description}</p>
        </div>
    );
};

// Componente auxiliar para os artigos de destaques (reutilizado do HighlightCard)
type HighlightCardProps = {
    icon: React.ReactNode;
    date: string;
    title: string;
    description: string;
    delay: number;
};

const HighlightCard: React.FC<HighlightCardProps> = ({ icon, date, title, description, delay }) => {
    const cardRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            },
            { threshold: 0.1 }
        );

        const node = cardRef.current;
        if (node) observer.observe(node);
        return () => {
            if (node) observer.unobserve(node);
        };
    }, []);

    return (
        <article ref={cardRef} className="news-card" style={{ transitionDelay: `${delay * 100}ms` }}>
            <div className="news-image">{icon}</div>
            <div className="news-content">
                <div className="news-date">{date}</div>
                <h3>{title}</h3>
                <p>{description}</p>
            </div>
        </article>
    );
};


export default function LegendsEditionPage() {

    useEffect(() => {
        document.documentElement.style.scrollBehavior = 'smooth';
        return () => {
            document.documentElement.style.scrollBehavior = 'auto';
        };
    }, []);

    // Conteúdo específico para a página do Minecraft Legends
    const legendsFeatures = [
        { icon: <Sword size={40} />, title: "Combate Estratégico", description: "Lidere seus aliados em batalhas épicas contra os Piglins, utilizando táticas e formações para a vitória.", delay: 1 },
        { icon: <Shield size={40} />, title: "Defenda seu Mundo", description: "Construa fortificações e defesas para proteger os vilarejos e recursos do Overworld da invasão Piglin.", delay: 2 },
        { icon: <Map size={40} />, title: "Mundo Aberto Dinâmico", description: "Explore um mundo vibrante e em constante mudança, com biomas únicos e segredos a serem descobertos.", delay: 3 },
        { icon: <Crown size={40} />, title: "Unir o Overworld", description: "Convença mobs e criaturas a se juntarem à sua causa, formando um exército diversificado para enfrentar a ameaça.", delay: 4 },
        { icon: <Users size={40} />, title: "Cooperativo e PvP", description: "Jogue com amigos no modo cooperativo ou teste suas habilidades contra outros jogadores em intensas batalhas PvP.", delay: 5 },
        { icon: <Gem size={40} />, title: "Coletar Recursos", description: "Colete recursos essenciais para construir estruturas, criar unidades e aprimorar suas habilidades.", delay: 6 },
    ];

    const legendsHighlights = [
        { icon: "⚔️", date: "10 de Julho, 2025", title: "Nova Horda Piglin Descoberta", description: "Uma nova e perigosa horda de Piglins foi avistada, trazendo novos desafios e recompensas.", delay: 1 },
        { icon: "🛡️", date: "1 de Julho, 2025", title: "Atualização de Balanceamento de Unidades", description: "Ajustes foram feitos nas unidades para garantir um combate mais justo e estratégico para todos os jogadores.", delay: 2 },
        { icon: "🗺️", date: "25 de Junho, 2025", title: "Evento de Exploração de Biomas", description: "Participe de um evento especial para explorar biomas raros e descobrir tesouros escondidos no Overworld.", delay: 3 },
    ];

    return (
        <div className="app-wrapper">
            <main>
                {/* Seção Hero adaptada para o Minecraft Legends */}
                <section id="home" className="hero-section">
                    <div className="hero-bg-pattern"></div>
                    <div className="hero-bg-gradient"></div>
                    <div className="hero-content">
                        <h1>Minecraft Legends</h1>
                        <p>Lidere seus aliados e defenda o Overworld de uma invasão Piglin. Descubra os mistérios de um mundo belo e estratégico.</p>
                        <div className="cta-buttons">
                            <a href="#" className="btn btn-primary">Comprar para Todas as Plataformas</a>
                            <a href="#" className="btn btn-secondary">Assistir Trailer</a>
                            <LinkDom to="/admin" className="btn btn-admin"> Admin Panel </LinkDom>
                        </div>
                    </div>
                </section>

                {/* Seção de Funcionalidades do Minecraft Legends */}
                <section id="recursos" className="features-section">
                    <div className="container">
                        <h2 className="section-title">Recursos de Minecraft Legends</h2>
                        <div className="features-grid">
                            {legendsFeatures.map((feature, index) => (
                                <FeatureCard key={index} {...feature} />
                            ))}
                        </div>
                    </div>
                </section>

                {/* Seção de Destaques e Novidades */}
                <section id="destaques" className="news-section">
                    <div className="container">
                        <h2 className="section-title">Destaques de Minecraft Legends</h2>
                        <div className="news-grid">
                            {legendsHighlights.map((item, index) => (
                                <HighlightCard key={index} {...item} />
                            ))}
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}