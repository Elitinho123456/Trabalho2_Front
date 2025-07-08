// Importa módulos e componentes necessários
import React, { useState, useEffect } from 'react'; // React + hooks
import Header from '../../components/footer';         // Componente de cabeçalho
import Footer from '../../components/header';         // Componente de rodapé  
import './MinecraftLegendsPage.css';               // Estilos específicos da página

// Define o formato (interface) de uma plataforma
interface Platform {
  id: string;
  name: string;
  icon: string;
  available: boolean;
}

// Define o formato (interface) de uma notícia
interface NewsItem {
  id: string;
  title: string;
  description: string;
  image: string;
  tag: string;
  date: string;
}

// Componente principal da página MinecraftLegends
const MinecraftLegendsPage: React.FC = () => {
  // Estado com as plataformas disponíveis
  const [platforms] = useState<Platform[]>([
    { id: 'pc', name: 'PC', icon: 'fas fa-desktop', available: true },
    { id: 'steam', name: 'Steam', icon: 'fab fa-steam', available: true },
    { id: 'xbox', name: 'Xbox', icon: 'fab fa-xbox', available: true },
    { id: 'playstation', name: 'PlayStation', icon: 'fab fa-playstation', available: true },
    { id: 'nintendo', name: 'Nintendo Switch', icon: 'fas fa-gamepad', available: true },
  ]);

  // Estado com as notícias
  const [news] = useState<NewsItem[]>([
    {
      id: '1',
      title: 'Lost Legends: Snow vs Snouts',
      description: 'Sharing the final Lost Legend and a development update',
      image: '/images/news-legends-1.jpg',
      tag: 'NEWS',
      date: '2025-01-15'
    },
    {
      id: '2',
      title: 'Meet the Mottled Monocular Toad',
      description: 'Get this month\'s Minecraft Legends freebie!',
      image: '/images/news-legends-2.jpg',
      tag: 'UPDATE',
      date: '2025-01-10'
    },
    {
      id: '3',
      title: 'New Strategy Guide Available',
      description: 'Master the art of warfare in the Overworld',
      image: '/images/news-legends-3.jpg',
      tag: 'GUIDE',
      date: '2025-01-05'
    }
  ]);

  // Estado que controla qual notícia está sendo exibida no carrossel
  const [currentNewsIndex, setCurrentNewsIndex] = useState(0);

  // Avança para a próxima notícia (de forma circular)
  const nextNews = () => {
    setCurrentNewsIndex((prev) => (prev + 1) % news.length);
  };

  // Volta para a notícia anterior (de forma circular)
  const previousNews = () => {
    setCurrentNewsIndex((prev) => (prev - 1 + news.length) % news.length);
  };

  // Efeito que troca a notícia a cada 5 segundos automaticamente
  useEffect(() => {
    const interval = setInterval(nextNews, 5000); // Troca de notícia a cada 5s
    return () => clearInterval(interval);         // Limpa o intervalo ao desmontar
  }, []);

  // JSX retornado pela página
  return (
    <div className="minecraft-legends-page">
      <Header /> {/* Cabeçalho da página */}

      {/* Seção de destaque (hero) */}
      <section className="hero-section legends-hero">
        <div className="hero-background">
          <div className="hero-artwork"></div>
        </div>
          <div className="hero-content">
            <div className="hero-logo">
              <h1 className="game-logo-text">
                MINECRAFT<br />
                <span className="edition-text">LEGENDS</span>
              </h1>
            </div>
            <p className="hero-description">
              Une os habitantes do Mundo Superior no Minecraft Legends
            </p>
            <div className="hero-cta">
              <button className="btn btn-primary btn-large">
                OBTER O LEGENDS
              </button>
            </div>
          </div>
      </section>

      {/* Seção de plataformas disponíveis */}
      <section className="platforms-section">
          <div className="platforms-header">
            <h2 className="section-title">Disponível em Todas as Plataformas</h2>
            <p className="platforms-description">
              O Minecraft Legends está disponível para várias plataformas.
            </p>
          </div>

          <div className="platforms-grid">
            {/* Renderiza cada plataforma dinamicamente */}
            {platforms.map((platform) => (
              <div key={platform.id} className="platform-item">
                <div className="platform-icon">
                  <i className={platform.icon}></i>
                </div>
                <span className="platform-name">{platform.name}</span>
                <button
                  className={`btn btn-platform ${!platform.available ? 'disabled' : ''}`}
                  disabled={!platform.available}
                >
                  {platform.available ? 'COMPRAR AGORA' : 'EM BREVE'}
                </button>
              </div>
            ))}
          </div>
      </section>

      {/* Seção de conteúdo principal */}
      <section className="main-content-section">
          <div className="content-header">
            <h2 className="section-title">
              Une os habitantes do Mundo Superior no Minecraft Legends
            </h2>
            <p className="section-description">
              Informações e atualizações sobre o jogo.
            </p>
          </div>
      </section>

      {/* Seção de funcionalidades do jogo */}
      <section className="features-section">
          <h2 className="section-title">Como Funciona</h2>

          <div className="features-grid">
            <div className="feature-item">
              <div className="feature-icon">
                <i className="fas fa-sword"></i>
              </div>
              <h3 className="feature-title">Lidera o Ataque</h3>
              <p className="feature-description">
                Experiência épica de combate e liderança.
              </p>
            </div>

            <div className="feature-item">
              <div className="feature-icon">
                <i className="fas fa-users"></i>
              </div>
              <h3 className="feature-title">Inspira Novos Aliados</h3>
              <p className="feature-description">
                Construa alianças com aliados e criaturas.
              </p>
            </div>

            <div className="feature-item">
              <div className="feature-icon">
                <i className="fas fa-fire"></i>
              </div>
              <h3 className="feature-title">Derrota os Piglins</h3>
              <p className="feature-description">
                Estratégia contra os inimigos do Submundo.
              </p>
            </div>
          </div>
      </section>

      {/* Seção de notícias com carrossel */}
      <section className="news-section">
          <div className="news-header">
            <h2 className="section-title">Notícias sobre o Minecraft Legends</h2>
            <p className="section-description">
              Últimas atualizações e bastidores do jogo.
            </p>
          </div>

          <div className="news-carousel">
            {/* Controles de navegação do carrossel */}
            <div className="news-controls">
              <button className="news-prev" onClick={previousNews}>
                <i className="fas fa-chevron-left"></i>
              </button>
              <button className="news-next" onClick={nextNews}>
                <i className="fas fa-chevron-right"></i>
              </button>
            </div>

            {/* Renderiza duas notícias por vez */}
            <div className="news-grid">
              {news.slice(currentNewsIndex, currentNewsIndex + 2).map((item) => (
                <div key={item.id} className="news-item">
                  <div className="news-image">
                    <img src={item.image} alt={item.title} />
                  </div>
                  <div className="news-content">
                    <span className="news-tag">{item.tag}</span>
                    <h3 className="news-title">{item.title}</h3>
                    <p className="news-description">{item.description}</p>
                    <span className="news-date">{item.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
      </section>

      <Footer /> {/* Rodapé da página */}
    </div>
  );
};

// Exporta o componente principal da página
export default MinecraftLegendsPage;
