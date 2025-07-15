import React from 'react'; // Importa a biblioteca React, necessária para criar componentes React
import { Link } from 'react-router-dom'; // Importa o componente Link do 'react-router-dom' para navegação entre páginas sem recarregar (Single Page Application - SPA)
import './Legends.css'; // Importa o arquivo CSS específico para estilizar este componente (Minecraft Legends Page)

// Define o componente funcional MinecraftLegendsPage.
// É um componente React que retorna JSX (JavaScript XML) para renderizar a interface do usuário.
const MinecraftLegendsPage: React.FC = () => {
  return (
    <div className="minecraft-dungeons"> {/* Contêiner principal da página, usando uma classe CSS genérica */}
      {/* Header - Seção do cabeçalho da página */}
      <header className="header">
        <div className="container"> {/* Contêiner para centralizar e limitar a largura do conteúdo */}
          <div className="logo">
            {/* Espaço reservado para o logo, se houver um */}
            {/* Você pode colocar uma imagem <img src="..." alt="Logo" /> ou um texto aqui */}
          </div>
          {/* Seção de navegação no cabeçalho */}
          <nav>
            {/* Botão para o painel de administração de Minecraft Legends */}
            {/* O componente Link permite navegar para outra rota definida no seu router.tsx */}
            {/* A rota "/admin/legends" levará ao dashboard de administração de Legends */}
            <Link to="/admin/legends" className="btn-primary">
              Gerenciar Entidades de Legends 🛠️ {/* Texto do botão com um emoji para clareza */}
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section - A seção principal de destaque da página */}
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <div className="hero-logo">
              {/* Imagem do logo/título do Minecraft Legends na seção herói */}
              <img
                src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/73206bd9-257c-4f50-b1f3-59a306e24084/dfuc0jm-c13724ea-539c-421e-9618-5364a6ffc259.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzBhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzczMjA2YmQ5LTI1N2MtNGY1MC1iMWYzLTU5YTMwNmUyNDA4NFwvZGZ1YzBqbS1jMTM3MjRlYS01MzljLTQyMWUtOTYxOC01MzY0YTZmZmMyNTkucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQifX0.zuzk8mWxJu1lWzN7iB0ebbl-ZApDxAfa3ts6d_u0BGU"
                alt="Minecraft Legends" // Texto alternativo para acessibilidade
              />
            </div>
            {/* Título principal da seção herói */}
            <h1 className="hero-title">Venha Nesta Aventura Maravilhosa!</h1>
            {/* Descrição do jogo na seção herói */}
            <p className="hero-description">
              Enfrente hordas de criaturas em uma aventura de ação épica no universo de
              Minecraft.
            </p>
            {/* Botões de ação na seção herói */}
            <div className="hero-buttons">
              <button className="btn-orange">COMPRE AGORA</button> {/* Botão com estilo laranja */}
              <button className="btn-blue">ASSISTA AO TRAILER</button> {/* Botão com estilo azul */}
            </div>
          </div>
        </div>
      </section>

      {/* About Section - Seção "Sobre o Jogo" */}
      <section className="about">
        <div className="container">
          <div className="about-content">
            <div className="about-text">
              <h2>SOBRE O JOGO</h2> {/* Título da seção */}
              <p>
                Lute em um novo jogo de ação e aventura, inspirado em exploradores de
                masmorras clássicos e ambientado no universo Minecraft! Enfrente as masmorras
                sozinho ou junte-se a amigos! Até quatro jogadores podem lutar juntos através de
                níveis repletos de ação, tesouros e totalmente variados, tudo em uma missão épica
                para derrotar o maligno Arch-Illager!
              </p>
            </div>
            <div className="about-image">
              {/* Imagem de gameplay/arte relacionada ao jogo */}
              <img src="https://i.ytimg.com/vi/lw6f-tJKoao/maxresdefault.jpg" alt="Minecraft Dungeons Gameplay" />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section - Seção de Destaques da Aventura */}
      <section className="features">
        <div className="container">
          <h2>DESTAQUES DA AVENTURA</h2> {/* Título da seção */}
          <div className="features-grid">
            {/* Cartão de destaque: MUNDO DE AVENTURA */}
            <div className="feature-card">
              <div className="feature-icon">
                {/* Ícone SVG de bússola */}
                <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm3.19 7.19-4.24 2.46-2.46 4.24 4.24-2.46 2.46-4.24zM12 4c4.41 0 8 3.59 8 8s-3.59 8-8 8-8-3.59-8-8 3.59-8 8-8z"/>
                </svg>
              </div>
              <h3>MUNDO DE AVENTURA</h3>
              <p>Explore masmorras únicas e variadas</p>
            </div>
            {/* Cartão de destaque: EQUIPAMENTOS ÉPICOS */}
            <div className="feature-card">
              <div className="feature-icon">
                {/* Ícone SVG de caixa/equipamento */}
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20 6h-2V4h-4v2h-4V4H6v2H4c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm0 12H4V8h16v10zM9 10h6v2H9zm0 4h6v2H9z"/>
                </svg>
              </div>
              <h3>EQUIPAMENTOS ÉPICOS</h3>
              <p>Colete armas e armaduras poderosas</p>
            </div>
            {/* Cartão de destaque: PERSONALIZAÇÃO */}
            <div className="feature-card">
              <div className="feature-icon">
                {/* Ícone SVG de usuário/pessoa */}
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.29-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.93-3.5 3.22-6 3.22z"/>
                </svg>
              </div>
              <h3>PERSONALIZAÇÃO</h3>
              <p>Personalize seu personagem e lute de perto com ataques</p>
            </div>
            {/* Cartão de destaque: MODO MULTIJOGADOR */}
            <div className="feature-card">
              <div className="feature-icon">
                {/* Ícone SVG de múltiplas pessoas */}
                <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M16 11c1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3 1.34 3 3 3zm-8 0c1.66 0 3-1.34 3-3S9.66 5 8 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5C13 14.17 8.33 13 6 13zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/>
                </svg>
              </div>
              <h3>MODO MULTIJOGADOR</h3>
              <p>Jogue com até 4 amigos online ou local</p>
            </div>
          </div>
        </div>
      </section>

      {/* Expand Game Section - Seção para expansões/DLCs */}
      <section className="expand-game">
        <div className="container">
          <h2>EXPANDA SEU JOGO</h2> {/* Título da seção */}
          <div className="dlc-grid">
            {/* Cartão de DLC: Construindo Sua Base */}
            <div className="dlc-card">
              <img src="https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1928870/ss_65720eb73a2dd8fc993172cfbfcdc8fe40ec44c2.1920x1080.jpg?t=1746133966"
                alt="Construindo Sua Base" />
              <h3>Construindo Sua Base</h3>
            </div>
            {/* Cartão de DLC: Invadindo Castelo */}
            <div className="dlc-card">
              <img src="https://static1.cbrimages.com/wordpress/wp-content/uploads/2022/06/Minecraft-Legends-gameplay.jpg"
              alt="Invadindo Castelo" />
              <h3>Invadindo Castelo</h3>
            </div>
            {/* Cartão de DLC: Biomas Únicos (Título original "Biomas Unicos", mas a imagem sugere montarias) */}
            <div className="dlc-card">
              <img src="https://cdna.artstation.com/p/assets/images/images/072/768/458/large/lisha-leston-legends-horde-spore-01.jpg?1708146247"
                alt="Biomas Unicos" />
              <h3>Montarias Unicas</h3> {/* Renomeado para Montarias Unicas com base na imagem */}
            </div>
            {/* Cartão de DLC: Montarias Únicas (Duplicado, mantendo para sua referência) */}
            <div className="dlc-card">
              <img src="https://cdnb.artstation.com/p/assets/images/images/072/761/757/large/lisha-leston-legends-render-hero-champion.jpg?1708125789"
                alt="Montarias Unicas" />
              <h3>Montarias Unicas</h3>
            </div>
            {/* Cartão de DLC: Jogo Multiplayer */}
            <div className="dlc-card">
              <img src="https://assets-prd.ignimgs.com/2023/04/25/minecraftlegendschallengeyrfriendsinpvptrailer-ign-blogroll-1682436800992.jpg"
                alt="Jogando com os amigos" />
              <h3>Jogo Multiplayer</h3>
            </div>
            {/* Cartão de DLC: Sistema de Dominação */}
            <div className="dlc-card">
              <img src="https://xboxwire.thesourcemediaassets.com/sites/8/2023/02/Minecraft_Legends-3a62cfe29bcc6081e50e.jpg"
                alt="Sistema de Dominação" />
              <h3>Sistema de Dominação</h3>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section - Seção de galeria de mods (conteúdo genérico de Minecraft) */}
      <section className="gallery">
        <div className="container">
          <h2>MODS DIVERSOS DE MINE</h2> {/* Título da seção */}
          <div className="gallery-grid">
            {/* Item da galeria: Zumbi */}
            <div className="gallery-item">
              <img src="https://i.ytimg.com/vi/VwZl8ldIWvQ/maxresdefault.jpg" alt="Zumbi" />
            </div>
            {/* Item da galeria: Pokemon */}
            <div className="gallery-item">
              <img src="https://godlike.host/wp-content/uploads/2024/12/2-1-2.jpg.webp" alt="Pokemon" />
            </div>
            {/* Item da galeria: Dinossauro */}
            <div className="gallery-item">
              <img src="https://i.ytimg.com/vi/byTC5v0WI_E/maxresdefault.jpg" alt="Dinossauro" />
            </div>
            {/* Item da galeria: Animes */}
            <div className="gallery-item">
              <img src="https://static.beebom.com/wp-content/uploads/2024/09/Anime-mods-One-Piece-character-in-the-Minecraft-world.jpg?w=1250&quality=75" alt="Animes" />
            </div>
            {/* Item da galeria: Espaço */}
            <div className="gallery-item">
              <img src="https://staticg.sportskeeda.com/editor/2022/12/a9610-16704952912378-1920.jpg?w=640" alt="Espaço" />
            </div>
            {/* Item da galeria: Orespawn */}
            <div className="gallery-item">
              <img src="https://i.ytimg.com/vi/MK8P5TpABuU/maxresdefault.jpg" alt="Orespawn" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MinecraftLegendsPage; // Exporta o componente para que possa ser importado e usado em outros arquivos (como o router.tsx)