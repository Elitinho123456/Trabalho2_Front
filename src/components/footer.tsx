import '../CSS/footer.css';
import { Youtube, Instagram, Facebook, Twitter, Twitch } from 'lucide-react';


export default function Footer() {

  return (
    <footer className="main-footer">
      <div className="container">
        <div className="footer-top">
          <div className="footer-links">
            <div className="footer-column">
              <h4>JOGOS</h4>
              <ul>
                <li><a href="#">Minecraft</a></li>
                <li><a href="#">Minecraft Dungeons</a></li>
                <li><a href="#">Minecraft Legends</a></li>
                <li><a href="#">Minecraft Education</a></li>
              </ul>
            </div>
            <div className="footer-column">
              <h4>COMUNIDADE</h4>
              <ul>
                <li><a href="#">Comunidade</a></li>
                <li><a href="#">Portal de Aprendizagem</a></li>
                <li><a href="#">Parcerias</a></li>
                <li><a href="#">Carreiras</a></li>
              </ul>
            </div>
            <div className="footer-column">
              <h4>LOJA</h4>
              <ul>
                <li><a href="#">Marketplace</a></li>
                <li><a href="#">Loja Minecraft</a></li>
              </ul>
            </div>
            <div className="footer-column">
              <h4>SUPORTE</h4>
              <ul>
                <li><a href="#">Ajuda</a></li>
                <li><a href="#">Comentários</a></li>
                <li><a href="#">Mapa do Site</a></li>
              </ul>
            </div>
          </div>
          <div className="footer-logo-section">
             <img src="/minecraft-logo.svg" alt="Minecraft Logo" className="footer-logo" />
          </div>
        </div>
        <div className="footer-bottom">
            <div className="region-selector">
                <span>Português (Brasil)</span>
            </div>
            <div className="social-links">
                <a href="#"><Youtube size={24} /></a>
                <a href="#"><Instagram size={24} /></a>
                <a href="#"><Facebook size={24} /></a>
                <a href="#"><Twitter size={24} /></a>
                <a href="#"><Twitch size={24} /></a>
            </div>
            <div className="legal-links">
                <p>© {new Date().getFullYear()} Microsoft</p>
                <a href="#">Política de Privacidade e Cookies</a>
                <a href="#">Termos de uso</a>
                <a href="#">Marcas Registradas</a>
            </div>
        </div>
      </div>
    </footer>

  );
}