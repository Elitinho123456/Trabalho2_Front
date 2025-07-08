import '../CSS/footer.css';

export default function Footer() {

  return (

    <footer className="minecraft-footer">

      <div className="footer-content">
        <p>&copy; 2023 Minecraft.TODOS OS DIREITOS RESERVADOS.</p>
        <nav className="footer-links">
          <a href="/privacy">POLITICA DE PRIVACIDADE</a>
          <a href="/terms">TERMOS E SERVIÇO</a>
          <a href="/contact">CONTATE-NOS</a>
        </nav>
      </div>

    </footer>
  );
}