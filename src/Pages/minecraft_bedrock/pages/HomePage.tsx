// src/pages/HomePage.tsx
import React, { useState } from 'react';
import { Button } from '../ui'; // Importa Button
import { CarouselImage } from '../types'; // Importa a interface

// --- Carousel Component (agora interno à HomePage) ---
interface CarouselProps {
  images: CarouselImage[];
}

const Carousel: React.FC<CarouselProps> = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!images || images.length === 0) {
    return <div className="carousel-empty">Nenhuma imagem para exibir.</div>;
  }

  const handlePrev = () => setCurrentIndex(prev => (prev === 0 ? images.length - 1 : prev - 1));
  const handleNext = () => setCurrentIndex(prev => (prev === images.length - 1 ? 0 : prev + 1));

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const target = e.target as HTMLImageElement;
    target.src = "https://placehold.co/900x500/333333/ffffff?text=Image+Not+Found";
    target.alt = "Imagem não encontrada";
  };

  return (
    <div className="image-carousel">
      <img
        src={images[currentIndex].src}
        alt={images[currentIndex].alt}
        className="carousel-image"
        onError={handleImageError}
      />
      <div className="carousel-nav">
        <button className="nav-arrow" onClick={handlePrev} aria-label="Imagem anterior">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button className="nav-arrow" onClick={handleNext} aria-label="Próxima imagem">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
      <div className="carousel-caption">
        <p>{images[currentIndex].caption}</p>
      </div>
    </div>
  );
};


// --- HomePage Component ---
const HomePage: React.FC = () => {
  const discoverImages: CarouselImage[] = [
    { src: "/castelo.png", alt: "Castelo Minecraft", caption: "Construa vastos assentamentos ou uma modesta cabana!" },
    { src: "/floresta_cerejeira.avif", alt: "Floresta de Cerejeira", caption: "Explore biomas únicos e descubra paisagens incríveis!" },
    { src: "/alex_e_steve.jpg", alt: "Alex e Steve defendendo-se de monstros", caption: "Defenda-se de monstros a noite" }
  ];

  return (
    <main className="container-main">
      <section id="discover" className="section">
        <div className="section-content">
          <h2 className="discover-title">DESCUBRA O MINECRAFT</h2>
          <p className="discover-description">Explore mundos infinitos e construa tudo que imaginar!</p>
          <Carousel images={discoverImages} />
        </div>
      </section>
      <section id="buy-games" className="section">
        <div className="games-content-wrapper">
          <img
            src="/mine3.jpg"
            alt="Pacote Minecraft"
            className="buy-games-image"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = "https://placehold.co/900x400/222222/ffffff?text=Image+Not+Found";
            }}
          />
          <div className="buy-text-area">
            <h2 className="buy-title">COMPRE OS TRÊS JOGOS</h2>
            <Button variant="primary">ADQUIRA O PACOTE TRIPLO</Button>
          </div>
        </div>
      </section>
    </main>
  );
};

export default HomePage;