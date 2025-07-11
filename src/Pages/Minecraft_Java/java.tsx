import React, { useEffect, useRef } from 'react';
import { Link as LinkDom  } from 'react-router-dom';
// Ícones relevantes para a Java Edition
import { Server, ToyBrick, Skull, Wrench, Code, Link as LinkIcon } from 'lucide-react';
import './java.css'; // Importando o CSS específico para a Java Edition

// Componente auxiliar para os cartões de funcionalidades (sem alterações)
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

// Componente auxiliar para os artigos de destaques (reutilizado do NewsCard)
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


export default function JavaEditionPage() {

    useEffect(() => {
        document.documentElement.style.scrollBehavior = 'smooth';
        return () => {
            document.documentElement.style.scrollBehavior = 'auto';
        };
    }, []);

    // Conteúdo específico para a página da Java Edition
    const javaFeatures = [
        { icon: <ToyBrick size={40} />, title: "Suporte a Mods", description: "Personalize sua experiência com uma infinidade de mods criados pela comunidade, de novos itens a mundos inteiros.", delay: 1 },
        { icon: <Server size={40} />, title: "Servidores Dedicados", description: "Junte-se a milhares de servidores públicos ou crie o seu próprio, com regras e minigames únicos.", delay: 2 },
        { icon: <Skull size={40} />, title: "Modo Hardcore", description: "Teste suas habilidades de sobrevivência em um mundo onde a morte é permanente. Um desafio para os mais corajosos.", delay: 3 },
        { icon: <Wrench size={40} />, title: "Snapshots de Desenvolvimento", description: "Acesse as versões de teste (snapshots) e experimente as novas funcionalidades antes do lançamento oficial.", delay: 4 },
        { icon: <Code size={40} />, title: "Comandos Avançados", description: "Tenha controle total sobre o seu mundo com um sistema de comandos robusto para criação de mapas e automação.", delay: 5 },
        { icon: <LinkIcon size={40} />, title: "Realms para Java", description: "Jogue com seus amigos em um servidor privado, seguro e sempre online, hospedado pela Mojang.", delay: 6 },
    ];

    const javaHighlights = [
        { icon: "📦", date: "2 de Julho, 2025", title: "Snapshot 25w27a Lançado", description: "Experimente as novas mecânicas de redstone e as otimizações de performance que chegarão na próxima atualização.", delay: 1 },
        { icon: "🛠️", date: "25 de Junho, 2025", title: "Atualização de Mod Popular", description: "O famoso mod 'Create' recebeu uma grande atualização, trazendo novas máquinas e possibilidades de automação.", delay: 2 },
        { icon: "🏰", date: "20 de Junho, 2025", title: "Evento de Construção Comunitária", description: "A comunidade está se unindo para recriar monumentos históricos em escala 1:1. Venha participar!", delay: 3 },
    ];

    return (
        <div className="app-wrapper">

            <main>
                {/* Seção Hero adaptada para a Java Edition */}
                <section id="home" className="hero-section">
                    <div className="hero-bg-pattern"></div>
                    <div className="hero-bg-gradient"></div>
                    <div className="hero-content">
                        <h1>Minecraft: Java Edition</h1>
                        <p>A experiência original e mais personalizável. Mergulhe em um universo de mods, servidores e criatividade sem limites.</p>
                        <div className="cta-buttons">
                            <a href="#" className="btn btn-primary">Comprar para Desktop</a>
                            <a href="#" className="btn btn-secondary">Explorar Servidores</a>
                            <LinkDom to="/admin" className="btn btn-admin"> Admin Panel </LinkDom>
                        </div>
                    </div>
                </section>

                {/* Seção de Funcionalidades da Java Edition */}
                <section id="recursos" className="features-section">
                    <div className="container">
                        <h2 className="section-title">Recursos Exclusivos da Java Edition</h2>
                        <div className="features-grid">
                            {javaFeatures.map((feature, index) => (
                                <FeatureCard key={index} {...feature} />
                            ))}
                        </div>
                    </div>
                </section>

                {/* Seção de Destaques e Novidades */}
                <section id="destaques" className="news-section">
                    <div className="container">
                        <h2 className="section-title">Destaques da Edição Java</h2>
                        <div className="news-grid">
                            {javaHighlights.map((item, index) => (
                                <HighlightCard key={index} {...item} />
                            ))}
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}