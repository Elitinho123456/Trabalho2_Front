import '../CSS/header.css';
// import { Link } from 'react-router-dom'; // Descomente se estiver usando React Router

export default function Header() {

  return (

    <header className="minecraft-header">

      <nav className="nav-links nav-left">

        {/* Usando <a> por simplicidade, troque por <Link> se usar react-router-dom */}
        <a href="/games">GAMES</a>
        <a href="/community">COMMUNITY</a>
        <a href="/merch">MERCH</a>
        <a href="/support">SUPPORT</a>

      </nav>

      <div className="logo-container">
        <a href="/">
          <img 
            src="https://www.minecraft.net/content/dam/games/minecraft/logos/logo-minecraft.svg" 
            alt="Minecraft Logo" 
          />
        </a>
      </div>
      
      <div className="nav-links nav-right">
        <a href="/redeem" className="cta-button">GET MINECRAFT</a>
        <a href="/login">LOG IN</a>
      </div>
      
    </header>
  );
}