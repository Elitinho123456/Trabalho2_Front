import React from 'react';
import './Legends.css';

const MinecraftDungeons: React.FC = () => {
  return (
    <div className="minecraft-dungeons">
      {/* Header */}
      <header className="header">
        <div className="container">
          <div className="logo">
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <div className="hero-logo">
              <img src="https://www.minecraft.net/content/dam/games/dungeons/key-art/Dungeons_PMP_Collection-Carousel_0_Creeping-Winter_1280x768.jpg" alt="Minecraft Dungeons" />
            </div>
            <h1 className="hero-title">UNA-SE. ALAÚDE. SOBREVIVA.</h1>
            <p className="hero-description">
              Enfrente hordas de criaturas em uma aventura de ação épica
              no universo Minecraft.
            </p>
            <div className="hero-buttons">
              <button className="btn-orange">COMPRE AGORA</button>
              <button className="btn-blue">ASSISTA AO TRAILER</button>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="about">
        <div className="container">
          <div className="about-content">
            <div className="about-text">
              <h2>SOBRE O JOGO</h2>
              <p>
                Lute em um novo jogo de ação e aventura, inspirado em exploradores de
                masmorras clássicos e ambientado no universo Minecraft! Enfrente as masmorras
                sozinho ou junte-se a amigos! Até quatro jogadores podem lutar juntos através de
                níveis repletos de ação, tesouros e totalmente variados, tudo em uma missão épica
                para derrotar o maligno Arch-Illager!
              </p>
            </div>
            <div className="about-image">
              <img src="https://www.minecraft.net/content/dam/games/dungeons/screenshots/Dungeons_PMP_Screenshot_1_1920x1080.jpg" alt="Minecraft Dungeons Gameplay" />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="container">
          <h2>DESTAQUES DA AVENTURA</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20 12h-4V4h-4v8H8V4H4v8H0v2h4v8h4v-8h4v8h4v-8h4v-2zM12 2L2 7V10C2 16 6 20.5 12 22C18 20.5 22 16 22 10V7L12 2Z"/>
                </svg>
              </div>
              <h3>MUNDO DE AVENTURA</h3>
              <p>Explore masmorras únicas e variadas</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20 6h-2V4h-4v2h-4V4H6v2H4c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm0 12H4V8h16v10zM9 10h6v2H9zm0 4h6v2H9z"/>
                </svg>
              </div>
              <h3>EQUIPAMENTOS ÉPICOS</h3>
              <p>Colete armas e armaduras poderosas</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.29-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.93-3.5 3.22-6 3.22z"/>
                </svg>
              </div>
              <h3>PERSONALIZAÇÃO</h3>
              <p>Personalize seu personagem e lute de perto com ataques</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d=""/>
                </svg>
              </div>
              <h3>MODO MULTIJOGADOR</h3>
              <p>Jogue com até 4 amigos online ou local</p>
            </div>
          </div>
        </div>
      </section>

      {/* Expand Game Section */}
      <section className="expand-game">
        <div className="container">
          <h2>EXPANDA SEU JOGO</h2>
          <div className="dlc-grid">
            <div className="dlc-card">
              <img src="https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1928870/ss_65720eb73a2dd8fc993172cfbfcdc8fe40ec44c2.1920x1080.jpg?t=1746133966"
               alt="Construindo Sua Base" />
              <h3>Construindo Sua Base</h3>
            </div>
            <div className="dlc-card">
              <img src="https://static1.cbrimages.com/wordpress/wp-content/uploads/2022/06/Minecraft-Legends-gameplay.jpg" 
              alt="Invadindo Castelo" />
              <h3>Invadindo Castelo</h3>
            </div>
            <div className="dlc-card">
              <img src="https://cdna.artstation.com/p/assets/images/images/072/768/458/large/lisha-leston-legends-horde-spore-01.jpg?1708146247"
               alt="Biomas Unicos" />
              <h3>Montarias Unicas</h3>
            </div>
            <div className="dlc-card">
              <img src="https://cdnb.artstation.com/p/assets/images/images/072/761/757/large/lisha-leston-legends-render-hero-champion.jpg?1708125789"
               alt="Montarias Unicas" />
              <h3>Montarias Unicas</h3>
            </div>
            <div className="dlc-card">
              <img src="https://assets-prd.ignimgs.com/2023/04/25/minecraftlegendschallengeyourfriendsinpvptrailer-ign-blogroll-1682436800992.jpg"
               alt="Jogando com os amigos" />
              <h3>Jogo Multiplayer</h3>
            </div>
            <div className="dlc-card">
              <img src="https://www.minecraft.net/content/dam/minecraftnet/games/badger/screenshots/MinecraftLegends_screenshot2.jpg"
               alt="Sistema de Dominação" />
              <h3>Sistema de Dominação</h3>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="gallery">
        <div className="container">
          <h2>JOGOS DIVERSOS DE MINE</h2>
          <div className="gallery-grid">
            <div className="gallery-item">
              <img src="https://xboxwire.thesourcemediaassets.com/sites/8/2024/05/Hero-bdef2532984d6fcafc40.jpg" alt="Minecraft" />
            </div>
            <div className="gallery-item">
              <img src="https://godlike.host/wp-content/uploads/2024/12/2-1-2.jpg.webp" alt="Pokemon" />
            </div>
            <div className="gallery-item">
              <img src="https://i.insider.com/6206e748e2fe3c0019ea50c2?width=864&format=jpeg" alt="Java" />
            </div>
            <div className="gallery-item">
              <img src="https://static.beebom.com/wp-content/uploads/2024/09/Anime-mods-One-Piece-character-in-the-Minecraft-world.jpg?w=1250&quality=75" alt="Animes" />
            </div>
            <div className="gallery-item">
              <img src="https://staticg.sportskeeda.com/editor/2022/12/a9610-16704952912378-1920.jpg?w=640" alt="Espaço" />
            </div>
            <div className="gallery-item">
              <img src="https://i.ytimg.com/vi/MK8P5TpABuU/maxresdefault.jpg" alt="Orespawn" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MinecraftDungeons;

