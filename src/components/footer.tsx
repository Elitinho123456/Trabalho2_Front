import '../CSS/footer.css';

export default function Footer() {

  return (

    <footer id="suporte" className="main-footer">
      <div className="container">
        <div className="footer-content">
          <div>
            <h4>Jogos</h4>
            <ul>
              <li><a href="#">Minecraft Java</a></li>
              <li><a href="#">Minecraft Bedrock</a></li>
              <li><a href="#">Minecraft Dungeons</a></li>
              <li><a href="#">Minecraft Legends</a></li>
            </ul>
          </div>
          <div>
            <h4>Comunidade</h4>
            <ul>
              <li><a href="#">Discord</a></li>
              <li><a href="#">Reddit</a></li>
              <li><a href="#">Twitter</a></li>
              <li><a href="#">YouTube</a></li>
            </ul>
          </div>
          <div>
            <h4>Suporte</h4>
            <ul>
              <li><a href="#">Central de Ajuda</a></li>
              <li><a href="#">Relatar Bug</a></li>
              <li><a href="#">Contato</a></li>
              <li><a href="#">Status do Servidor</a></li>
            </ul>
          </div>
          <div>
            <h4>Empresa</h4>
            <ul>
              <li><a href="#">Sobre</a></li>
              <li><a href="#">Carreiras</a></li>
              <li><a href="#">Privacidade</a></li>
              <li><a href="#">Termos de Uso</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Mojang Studios. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>

  );
}