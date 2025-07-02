import '../CSS/header.css';
import { useState, useEffect } from 'react';
import { Compass, Swords, Users, LifeBuoy, ShoppingCart, Menu, X } from 'lucide-react';

// import { Link } from 'react-router-dom'; // Descomente se estiver usando React Router

export default function Header() {

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: "#home", label: "Início", icon: <Compass size={18} /> },
    { href: "#jogos", label: "Jogos", icon: <Swords size={18} /> },
    { href: "#comunidade", label: "Comunidade", icon: <Users size={18} /> },
    { href: "#suporte", label: "Suporte", icon: <LifeBuoy size={18} /> },
    { href: "#loja", label: "Loja", icon: <ShoppingCart size={18} /> },
  ];

  return (

    <header className={`main-header ${isScrolled || isMenuOpen ? 'scrolled' : ''}`}>
      <nav className="container main-nav">
        <div className="logo">MINECRAFT</div>
        <div className="nav-links-desktop">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href}>{link.label}</a>
          ))}
        </div>
        <div className="menu-toggle">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </nav>
      {isMenuOpen && (
        <div className="nav-links-mobile">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} onClick={() => setIsMenuOpen(false)}>
              {link.icon}
              {link.label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}