// src/components/Container.tsx

import React, { useState } from 'react';

// --- Interfaces ---

interface CarouselImage {
  src: string;
  alt: string;
  caption: string;
}

interface CarouselProps {
  images: CarouselImage[];
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary'; // Example variants
}

// --- Reusable Components ---

const Carousel: React.FC<CarouselProps> = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const currentImage = images[currentIndex];

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = "https://placehold.co/900x500/333333/ffffff?text=Image+Not+Found";
  };

  return (
    <div className="image-carousel">
      <img
        src={currentImage.src}
        alt={currentImage.alt}
        className="carousel-image"
        onError={handleImageError}
      />
      <div className="carousel-nav">
        <button className="nav-arrow" aria-label="Seta para Esquerda" onClick={handlePrev}>
          &#8592; {/* Ideally, replace with an SVG icon */}
        </button>
        <button className="nav-arrow" aria-label="Seta para Direita" onClick={handleNext}>
          &#8594; {/* Ideally, replace with an SVG icon */}
        </button>
      </div>
      <p className="carousel-caption">{currentImage.caption}</p>
    </div>
  );
};

const Button: React.FC<ButtonProps> = ({ children, variant = 'primary', ...rest }) => {
  return (
    <button className={`button ${variant}`} {...rest}>
      {children}
    </button>
  );
};

// --- Main Container Component ---

interface ContainerProps {}

const Container: React.FC<ContainerProps> = () => {
  // Data for the Discover Minecraft carousel
  const discoverMinecraftImages: CarouselImage[] = [
    {
      src: "https://www.minecraft.net/content/dam/minecraftnet/games/minecraft/screenshots/CREATE_BuildAlmostAnything.png",
      alt: "Castelo Minecraft",
      caption: "Construa vastos assentamentos ou uma modesta cabana. Construa este mundo como você quiser!",
    },
    {
      src: "https://www.minecraft.net/content/dam/minecraftnet/games/minecraft/screenshots/PLAY_ExploreUniqueWorlds.png",
      alt: "Explorar Mundos Minecraft",
      caption: "Explore biomas únicos e encontre segredos escondidos em cada canto do seu mundo.",
    },
    {
      src: "https://www.minecraft.net/content/dam/minecraftnet/games/minecraft/screenshots/SURVIVE_BattleDangerousMobs.png",
      alt: "Sobreviver a Mobs Minecraft",
      caption: "Enfrente criaturas perigosas e defenda-se para sobreviver à noite.",
    },
  ];

  return (
    <main className="container-main">
      {/* SEÇÃO 1: DESCUBRA O MINECRAFT */}
      <section className="section discover-section">
        <h2 className="discover-title">DESCUBRA O MINECRAFT</h2>
        <p className="discover-description">
          Construa tudo que você possa imaginar, descubra mistérios assustadores e sobreviva à noite no melhor jogo do tipo livre. No Minecraft, cada jogada é diferente e aventuras inesquecíveis aguardam em cada canto. Explore e crie seu caminho em um mundo infinito que você pode construir, um bloco de cada vez.
        </p>
        <Carousel images={discoverMinecraftImages} />
      </section>

      {/* SEÇÃO 2: COMPRE OS TRÊS JOGOS (Com uma única imagem) */}
      <section className="section buy-games-section">
        <div className="games-content-wrapper">
          {/* Imagem única para a seção de compra */}
          <img
            src="https://www.minecraft.net/content/dam/minecraftnet/games/minecraft/key-art/PDP-Hero_Triple-Bundle_16x9.jpg"
            alt="Pacote com os três jogos Minecraft"
            className="buy-games-image"
            onError={(e) => { e.currentTarget.src = "https://placehold.co/900x400/222222/ffffff?text=Image+Not+Found"; }}
          />
          <div className="buy-text-area">
            <h2 className="buy-title">COMPRE OS TRÊS JOGOS DO MINECRAFT</h2>
            <p className="buy-description">
              Entre em um universo com blocos de criatividade, emoções e mistérios com três jogos Minecraft em um só pacote.
            </p>
            <Button className="buy-button">
              ADQUIRA O PACOTE TRIPLO
              <span> &gt; </span> {/* Ideally, replace with an SVG icon */}
            </Button>
          </div>
        </div>
      </section>

      {/* SEÇÃO 3: Funcionalidades CRUD */}
      <section className="section crud-section">
        <h2 className="crud-title">Suas Funcionalidades CRUD</h2>
        <p className="crud-description">
          Aqui você pode integrar as operações de Create, Read, Update e Delete para as suas entidades. Este é o coração do seu projeto Full Stack!
        </p>
        <div className="crud-card">
          <h3 className="crud-card-title">Gerenciamento de Entidades</h3>
          <p className="crud-card-description">
            Adicione, visualize, edite e remova seus dados.
          </p>
          <Button className="crud-button" variant="secondary">Acessar CRUD</Button>
        </div>
      </section>
    </main>
  );
};

export default Container;