import React from 'react';

// Tipagem para o array de imagens
type CarouselImage = {
  src: string;
  alt: string;
  caption: string;
};

// Componente Button simples substituto
const Button: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: string }> = ({ variant, children, ...props }) => (
  <button
    {...props}
    style={{
      padding: '10px 18px',
      borderRadius: 6,
      border: 'none',
      background: variant === 'primary' ? '#2d7d46' : '#555',
      color: '#fff',
      fontWeight: 600,
      fontSize: 16,
      cursor: 'pointer',
      display: 'inline-flex',
      alignItems: 'center',
      gap: 8,
    }}
  >
    {children}
  </button>
);

const Minecraft_Education: React.FC = () => {
  // Imagens para o carrossel "Descubra o Minecraft"
  const discoverMinecraftImages: CarouselImage[] = [
    {
      src: "/castelo.png",
      alt: "Castelo Minecraft",
      caption: "Construa vastos assentamentos ou uma modesta cabana. Construa este mundo como você quiser!",
    },
    {
      src: "/floresta_cerejeira.avif",
      alt: "Explorar Mundos Minecraft",
      caption: "Explore biomas únicos e encontre segredos escondidos em cada canto do seu mundo.",
    },
    {
      src: "/alex_e_steve.jpg",
      alt: "Sobreviver a Mobs Minecraft",
      caption: "Enfrente criaturas perigosas e defenda-se para sobreviver à noite.",
    },
  ];

  return (
    <>
      <main className="container-main">
        {/* Seção 1: Descubra o Minecraft */}
        <section id="discover" className="section">
          <div className="section-content">
            <h2 className="discover-title">DESCUBRA O MINECRAFT</h2>
            <p className="discover-description">
              Construa tudo que você possa imaginar, descubra mistérios assustadores e sobreviva à noite no melhor jogo do tipo livre. Aventuras inesquecíveis aguardam.
            </p>
            {/* Placeholder para o carrossel */}
            <div className="carousel-placeholder">
              {discoverMinecraftImages.map((img, idx) => (
                <figure key={idx} style={{ display: 'inline-block', margin: 8 }}>
                  <img src={img.src} alt={img.alt} style={{ width: 300, height: 180, objectFit: 'cover', borderRadius: 8 }} />
                  <figcaption style={{ textAlign: 'center', marginTop: 4, fontSize: 14 }}>{img.caption}</figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        {/* Seção 2: Compre os Jogos */}
        <section id="buy-games" className="section">
          <div className="games-content-wrapper">
            <img
              src="/mine3.jpg"
              alt="Minecraft Java & Bedrock, Dungeons e Legends Juntos"
              className="buy-games-image"
              onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                e.currentTarget.src = "https://placehold.co/900x400/222222/ffffff?text=Image+Not+Found";
              }}
            />
            <div className="buy-text-area">
              <h2 className="buy-title">COMPRE OS TRÊS JOGOS</h2>
              <p className="buy-description">
                Entre em um universo com blocos de criatividade, emoções e mistérios com três jogos Minecraft em um só pacote.
              </p>
              <Button variant="primary">
                ADQUIRA O PACOTE TRIPLO
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" style={{ width: '20px', height: '20px' }}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                </svg>
              </Button>
            </div>
          </div>
        </section>

        {/* Seção 3: Funcionalidades CRUD (mantida para integração futura) */}
        <section id="crud" className="section">
          <div className="section-content">
            <h2 className="crud-title">Funcionalidades CRUD</h2>
            <p className="crud-description">
              Aqui você pode integrar as operações de Create, Read, Update e Delete.
            </p>
            <div className="crud-card">
              <h3 className="crud-card-title">Gerenciamento de Entidades</h3>
              <p>Adicione, visualize, edite e remova seus dados.</p>
              <Button variant="secondary">Acessar CRUD</Button>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Minecraft_Education;