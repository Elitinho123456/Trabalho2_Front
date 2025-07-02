import '../CSS/footer.css';

export default function Footer() {

  return (

    <footer className="minecraft-footer">

      <div className="footer-content">
        <p>&copy; 2023 Minecraft. All rights reserved.</p>
        <nav className="footer-links">
          <a href="/privacy">Privacy Policy</a>
          <a href="/terms">Terms of Service</a>
          <a href="/contact">Contact Us</a>
        </nav>
      </div>

    </footer>
  );
}