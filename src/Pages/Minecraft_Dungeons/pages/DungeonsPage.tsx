import React, { useEffect } from 'react';
import { ShieldCheck, Swords, Gem, Users, ArrowRight } from 'lucide-react';
import '../styles/DungeonsPage.css';
import { Link } from 'react-router-dom';

// Componente para cartões de destaque
const FeatureCard: React.FC<{ icon: React.ReactNode; title: string; description: string }> = ({ icon, title, description }) => (
    <div className="dungeons-feature-card">
        <div className="dungeons-feature-icon">{icon}</div>
        <h3>{title}</h3>
        <p>{description}</p>
    </div>
);

// Componente para cartões de DLC
const DlcCard: React.FC<{ imgSrc: string; title: string; }> = ({ imgSrc, title }) => (
    <div className="dlc-card">
        <img src={imgSrc} alt={title} className="dlc-image" />
        <div className="dlc-title">{title}</div>
    </div>
);

// Componente para a página
export default function DungeonsPage() {

    useEffect(() => {
        const revealElements = () => {
            const reveals = document.querySelectorAll('.reveal');
            for (let i = 0; i < reveals.length; i++) {
                const windowHeight = window.innerHeight;
                const elementTop = reveals[i].getBoundingClientRect().top;
                const elementVisible = 150;
                if (elementTop < windowHeight - elementVisible) {
                    reveals[i].classList.add('active');
                }
            }
        };
        window.addEventListener('scroll', revealElements);
        revealElements(); // Initial check

        return () => window.removeEventListener('scroll', revealElements);
    }, []);


    return (
        <div className="dungeons-page-wrapper">
            <header className="dungeons-hero">
                <div className="dungeons-hero-bg"></div>
                <div className="dungeons-hero-content">
                    <img src="/dungeons_logo.png" alt="Minecraft Dungeons Logo" className="dungeons-main-logo" />
                    <h1>UNA-SE. LUTE. SOBREVIVA.</h1>
                    <p>Enfrente hordas de criaturas em uma aventura de ação épica no universo Minecraft.</p>
                    <div className="dungeons-cta-buttons">
                        <a href="#" className="dungeons-btn dungeons-btn-primary">COMPRE AGORA</a>
                        <a href="#" className="dungeons-btn dungeons-btn-secondary">ASSISTA AO TRAILER</a>
                    </div>
                </div>
                 <div className="admin-link-corner">
                    <Link to="/admin/dungeons" className="dungeons-btn-admin">
                        Área Administrativa
                    </Link>
                </div>
            </header>

            <main>
                <section className="dungeons-section about-section reveal">
                    <div className="dungeons-container">
                        <div className="about-content">
                            <div className="about-text">
                                <h2>SOBRE O JOGO</h2>
                                <p>Lute em um novo jogo de ação e aventura, inspirado em exploradores de masmorras clássicos e ambientado no universo Minecraft! Enfrente as masmorras sozinho ou junte-se a amigos! Até quatro jogadores podem lutar juntos através de níveis repletos de ação, tesouros e totalmente variados, tudo em uma missão épica para derrotar o maligno Arch-Illager!</p>
                            </div>
                            <div className="about-image">
                                <img src="/dungeons-about.png" alt="Grupo de heróis lutando" />
                            </div>
                        </div>
                    </div>
                </section>

                <section className="dungeons-section features-section reveal">
                     <div className="dungeons-container">
                        <h2 className="section-title">DESTAQUES DA AVENTURA</h2>
                        <div className="dungeons-features-grid">
                            <FeatureCard icon={<Swords size={40} />} title="MUNDO DE AVENTURA" description="Explore masmorras e enfrente novas criaturas malignas em biomas variados." />
                            <FeatureCard icon={<ShieldCheck size={40} />} title="EQUIPAMENTOS ÉPICOS" description="Desbloqueie dezenas de itens e encantamentos de armas exclusivos para ataques especiais devastadores." />
                            <FeatureCard icon={<Gem size={40} />} title="PERSONALIZAÇÃO" description="Personalize seu personagem e lute de perto com ataques corpo a corpo ou à distância com arcos." />
                            <FeatureCard icon={<Users size={40} />} title="MODO MULTIPLAYER" description="Junte-se a até quatro amigos e lutem juntos nos modos cooperativos online ou local." />
                        </div>
                    </div>
                </section>

                 <section className="dungeons-section dlc-section reveal">
                    <div className="dungeons-container">
                        <h2 className="section-title">EXPANDA SEU JOGO</h2>
                        <div className="dlc-grid">
                           <DlcCard imgSrc="/dlc-jungle.jpg" title="Jungle Awakens" />
                           <DlcCard imgSrc="/dlc-winter.jpg" title="Creeping Winter" />
                           <DlcCard imgSrc="/dlc-peaks.jpg" title="Howling Peaks" />
                           <DlcCard imgSrc="/dlc-nether.jpg" title="Flames of the Nether" />
                           <DlcCard imgSrc="/dlc-depths.jpg" title="Hidden Depths" />
                           <DlcCard imgSrc="/dlc-echoing.jpg" title="Echoing Void" />
                        </div>
                    </div>
                </section>

                <section className="dungeons-section gallery-section reveal">
                    <div className="dungeons-container">
                         <h2 className="section-title">GALERIA</h2>
                         <div className="gallery-grid">
                            <div className="gallery-item"><img src="/gallery-1.jpg" alt="Gallery Image 1" /></div>
                            <div className="gallery-item"><img src="/gallery-2.jpg" alt="Gallery Image 2" /></div>
                            <div className="gallery-item"><img src="/gallery-3.jpg" alt="Gallery Image 3" /></div>
                            <div className="gallery-item"><img src="/gallery-4.jpg" alt="Gallery Image 4" /></div>
                            <div className="gallery-item"><img src="/gallery-5.jpg" alt="Gallery Image 5" /></div>
                            <div className="gallery-item"><img src="/gallery-6.jpg" alt="Gallery Image 6" /></div>
                         </div>
                    </div>
                </section>
                
                <section className="dungeons-section final-cta-section reveal">
                     <div className="final-cta-content">
                         <h2>SUA AVENTURA AGUARDA</h2>
                         <a href="#" className="dungeons-btn dungeons-btn-primary">
                            OBTENHA MINECRAFT DUNGEONS <ArrowRight size={20} />
                         </a>
                     </div>
                </section>

            </main>
        </div>
    );
}
