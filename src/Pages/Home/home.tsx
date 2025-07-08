import React, { useEffect, useRef } from 'react';
import { Swords, Gamepad2, Landmark, GraduationCap, Star, Link as LinkIcon } from 'lucide-react';
import { NavLink as LinkDom } from 'react-router-dom';
import './home.css'

// Componente auxiliar para os cartões de funcionalidades
type FeatureCardProps = {
    icon: React.ReactNode;
    title: string;
    description: string;
    delay: number;
    link: string; // Adicionando a propriedade link
};

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description, delay, link }) => {
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
        // Changed from <button> to LinkDom directly, and added the 'to' prop
        <LinkDom to={link} className="feature-card-link">
            <div ref={cardRef} className="feature-card" style={{ transitionDelay: `${delay * 100}ms` }}>
                <div className="feature-icon">{icon}</div>
                <h3>{title}</h3>
                <p>{description}</p>
            </div>
        </LinkDom>
    );
};

// Componente auxiliar para os artigos de notícias
type NewsCardProps = {
    icon: React.ReactNode;
    date: string;
    title: string;
    description: string;
    delay: number;
    link: string;
};

const NewsCard: React.FC<NewsCardProps> = ({ icon, date, title, description, delay, link }) => {
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
            {/* Changed from <button> to LinkDom directly, and added the 'to' prop */}
            <LinkDom to={link} className="news-card-link">
                <div className="news-image">{icon}</div>
                <div className="news-content">
                    <div className="news-date">{date}</div>
                    <h3>{title}</h3>
                    <p>{description}</p>
                </div>
            </LinkDom>
        </article>
    );
};

export default function App() {

    useEffect(() => {
        document.documentElement.style.scrollBehavior = 'smooth';
        return () => {
            document.documentElement.style.scrollBehavior = 'auto';
        };
    }, []);

    const features = [
        { icon: <Gamepad2 size={40} />, title: "Minecraft Java Edition", description: "A versão original com mods, servidores personalizados e atualizações constantes.", delay: 1, link: '/Java' },
        { icon: <Landmark size={40} />, title: "Minecraft Bedrock", description: "Jogue em qualquer dispositivo com crossplay multiplataforma. Disponível para mobile, console e PC.", delay: 2, link: '/Bedrock' },
        { icon: <Swords size={40} />, title: "Minecraft Dungeons", description: "Uma aventura de ação repleta de tesouros, criaturas inéditas e missões emocionantes.", delay: 3, link: '/Dungeons' },
        { icon: <GraduationCap size={40} />, title: "Minecraft Education", description: "Aprenda e ensine de forma divertida com ferramentas educacionais integradas ao jogo.", delay: 4, link: '/Education' },
        { icon: <Star size={40} />, title: "Minecraft Legends", description: "Uma nova aventura estratégica no universo Minecraft com elementos de RTS únicos.", delay: 5, link: '/Legends' },
        { icon: <LinkIcon size={40} />, title: "Realms", description: "Crie seu próprio servidor privado e jogue com amigos em mundos sempre online.", delay: 6, link: '/Realms' },
    ];

    const newsItems = [
        { icon: "🎉", date: "15 de Junho, 2025", title: "Nova Atualização: The Wild Update 2.0", description: "Descubra novos biomas, criaturas incríveis e mecânicas inovadoras na maior atualização do ano!", delay: 1, link: "/news/wild-update" },
        { icon: "🏆", date: "10 de Junho, 2025", title: "Competição de Construção Brasileira", description: "Participe da maior competição de construção do Brasil e ganhe prêmios incríveis!", delay: 2, link: "/news/building-competition" },
        { icon: "🎮", date: "5 de Junho, 2025", title: "Novos Servidores Brasileiros", description: "Menor latência e melhor experiência para jogadores brasileiros com nossos novos servidores.", delay: 3, link: "/news/new-servers" },
    ];

    return (
        <div className="app-wrapper">

            <main>
                <section id="home" className="hero-section">
                    <div className="hero-bg-pattern"></div>
                    <div className="hero-bg-gradient"></div>
                    <div className="hero-content">
                        <h1>MINECRAFT</h1>
                        <p>Construa, explore e sobreviva em mundos infinitos. Sua aventura começa aqui!</p>
                        <div className="cta-buttons">
                            <a href="#" className="btn btn-primary">Comprar Agora</a>
                            <a href="#" className="btn btn-secondary">Jogar Grátis</a>
                        </div>
                    </div>
                </section>

                <section id="jogos" className="features-section">
                    <div className="container">
                        <h2 className="section-title">Explore o Universo Minecraft</h2>
                        <div className="features-grid">
                            {features.map((feature, index) => (
                                <FeatureCard key={index} {...feature} />
                            ))}
                        </div>
                    </div>
                </section>

                <section id="comunidade" className="news-section">
                    <div className="container">
                        <h2 className="section-title">Últimas Notícias</h2>
                        <div className="news-grid">
                            {newsItems.map((item, index) => (
                                <NewsCard key={index} {...item} />
                            ))}
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}