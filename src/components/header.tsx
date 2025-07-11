import '../CSS/header.css';
import { useState, useEffect } from 'react';
import { ChevronDown, Menu, X } from 'lucide-react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: "#", label: "Jogos", dropdown: true },
    { href: "#", label: "Comunidade", dropdown: true },
    { href: "#", label: "Produtos" },
    { href: "#", label: "Suporte" },
  ];

  return (
    <header className={`main-header ${isScrolled || isMenuOpen ? 'scrolled' : ''}`}>
      <div className="container main-nav">
        <a href="/" className="logo-container">
          <img src="public/minecraft_logo_icon_168099.webp" alt="Minecraft Logo" className="logo" />
        </a>

        <div className="nav-links-desktop">
          {navLinks.map((link) => (
            <a key={link.label} href={link.href} className="nav-link">
              {link.label}
              {link.dropdown && <ChevronDown size={16} className="dropdown-icon" />}
            </a>
          ))}
        </div>

        <div className="header-actions">
           <div className="menu-toggle">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle menu">
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
          <a href="#" className="btn-get-minecraft">Obter Minecraft</a>
        </div>

      </div>
      {isMenuOpen && (
        <div className="nav-links-mobile">
          {navLinks.map((link) => (
            <a key={link.label} href={link.href} onClick={() => setIsMenuOpen(false)} className="nav-link-mobile">
              {link.label}
              {link.dropdown && <ChevronDown size={20} />}
            </a>
          ))}
           <a href="#" className="btn-get-minecraft-mobile">Obter Minecraft</a>
        </div>
      )}
    </header>
  );
}
