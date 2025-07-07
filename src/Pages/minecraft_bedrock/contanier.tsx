// App.tsx
import React, { useState } from 'react';
import './App.css'; // Importa o arquivo de estilos separado

// ===================================================================================
// --- 1. INTERFACES GLOBAIS ---
// Define a "forma" dos objetos que usamos na aplicação, garantindo consistência.
// ===================================================================================

interface CarouselImage {
  src: string;  // Caminho ou URL da imagem
  alt: string;  // Texto alternativo para acessibilidade e SEO
  caption: string; // Legenda que aparece sobre a imagem
}

interface CarouselProps {
  images: CarouselImage[]; // O carrossel recebe um array de objetos CarouselImage
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode; // O conteúdo dentro do botão (texto, ícones, etc.)
  variant?: 'primary' | 'secondary'; // Estilos diferentes para o botão
}


// ===================================================================================
// --- 2. COMPONENTES REUTILIZÁVEIS ---
// Componentes genéricos que podem ser usados em várias partes do site.
// ===================================================================================

/**
 * Componente de Botão customizável com variantes de estilo.
 */
const Button: React.FC<ButtonProps> = ({ children, className, variant = 'primary', ...rest }) => {
  // Combina as classes CSS padrão ('button', 'primary'/'secondary') com qualquer outra classe passada via props.
  const buttonClass = `button ${variant} ${className || ''}`.trim();
  return (
    <button className={buttonClass} {...rest}>
      {children}
    </button>
  );
};

/**
 * Componente de Carrossel de Imagens que navega por uma lista de imagens.
 */
const Carousel: React.FC<CarouselProps> = ({ images }) => {
  // 'useState' cria uma variável de estado para guardar o índice da imagem atual.
  const [currentIndex, setCurrentIndex] = useState(0);

  // Se não houver imagens, exibe uma mensagem em vez de quebrar a aplicação.
  if (!images || images.length === 0) {
    return <div className="carousel-empty">Nenhuma imagem para exibir.</div>;
  }

  // Funções para navegar para a imagem anterior ou próxima.
  const handlePrev = () => {
    const isFirstImage = currentIndex === 0;
    const newIndex = isFirstImage ? images.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const handleNext = () => {
    const isLastImage = currentIndex === images.length - 1;
    const newIndex = isLastImage ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const currentImage = images[currentIndex];

  // Função para lidar com erros de carregamento de imagem, exibindo um placeholder.
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = "https://placehold.co/900x500/333333/ffffff?text=Image+Not+Found";
    e.currentTarget.alt = "Imagem não encontrada";
  };

  return (
    <div className="image-carousel">
      {/* A 'key' ajuda o React a otimizar a renderização quando a imagem muda */}
      <img
        key={currentIndex}
        src={currentImage.src}
        alt={currentImage.alt}
        className="carousel-image"
        onError={handleImageError}
      />
      <div className="carousel-nav">
        <button className="nav-arrow" aria-label="Seta para Esquerda" onClick={handlePrev}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
          </svg>
        </button>
        <button className="nav-arrow" aria-label="Seta para Direita" onClick={handleNext}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5 15.75 12l-7.5 7.5" />
          </svg>
        </button>
      </div>
      <p className="carousel-caption">{currentImage.caption}</p>
    </div>
  );
};


// ===================================================================================
// --- 3. COMPONENTES DE LAYOUT ---
// Componentes que estruturam as principais seções da página (Header, Main, Footer).
// ===================================================================================

/**
 * O cabeçalho do site, com logo, navegação e ações.
 */
const Header: React.FC = () => {
  return (
    <header className="header">
      <div className="header-container">
        <div className="logo">MINECRAFT</div>

        <nav className="main-nav">
          <ul>
            <li><a href="#">jogos &#9660;</a></li>
            <li><a href="#">loja &#9660;</a></li>
            <li><a href="#">novidades &#9660;</a></li>
            <li><a href="#">suporte &#9660;</a></li>
          </ul>
        </nav>

        <div className="header-actions">
          <Button className="buy-now-button" variant="primary">COMPRE AGORA</Button>
          <a href="#" className="icon-link main-nav" aria-label="Buscar">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
            </svg>
          </a>
          <a href="#" className="icon-link main-nav" aria-label="Conta de usuário">
             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
               <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
             </svg>
          </a>
        </div>
      </div>
    </header>
  );
};

/**
 * O conteúdo principal da página, dividido em seções.
 */
const Container: React.FC = () => {
  
  // *** COMENTÁRIO IMPORTANTE SOBRE IMAGENS LOCAIS ***
  // Para usar imagens que você baixou, siga estes passos:
  // 1. Crie uma pasta `public` na raiz do seu projeto (se não existir).
  // 2. Coloque suas imagens dentro da pasta `public` (ex: `public/meu-castelo.png`).
  // 3. No campo `src` abaixo, use o caminho a partir da pasta `public`.
  //    Exemplo: troque 'https://placehold.co/...' por '/meu-castelo.png'
  //
  // Outra opção é criar a pasta `src/assets` e importar as imagens:
  // import meuCastelo from './assets/meu-castelo.png';
  // E depois usar a variável: src: meuCastelo,
  const discoverMinecraftImages: CarouselImage[] = [
    {
      src: "https://www.minecraft.net/content/dam/minecraftnet/games/minecraft/screenshots/CREATE_BuildAlmostAnything.png",
      alt: "Castelo Minecraft",
      caption: "Construa vastos assentamentos ou uma modesta cabana. Construa este mundo como você quiser!",
    },
    {
      src: "https://www.minecraft.net/content/dam/minecraftnet/games/minecraft/screenshots/EXPLORE_PDPScreenshotRefresh2024_multipleBiomes_01.png",
      alt: "Explorar Mundos Minecraft",
      caption: "Explore biomas únicos e encontre segredos escondidos em cada canto do seu mundo.",
    },
    {
      src: "https://www.minecraft.net/content/dam/minecraftnet/games/minecraft/screenshots/SURVIVE.png",
      alt: "Sobreviver a Mobs Minecraft",
      caption: "Enfrente criaturas perigosas e defenda-se para sobreviver à noite.",
    },
  ];

  return (
    <main className="container-main">
      {/* Seção 1: Descubra o Minecraft */}
      <section id="discover" className="section">
        <div className="section-content">
          <h2 className="discover-title">DESCUBRA O MINECRAFT</h2>
          <p className="discover-description">
            Construa tudo que você possa imaginar, descubra mistérios assustadores e sobreviva à noite no melhor jogo do tipo livre. Aventuras inesquecíveis aguardam.
          </p>
          <Carousel images={discoverMinecraftImages} />
        </div>
      </section>

      {/* Seção 2: Compre os Jogos */}
      <section id="buy-games" className="section">
        <div className="games-content-wrapper">
          {/* COMENTÁRIO: Para usar uma imagem local aqui, faça o mesmo que no carrossel.
            Coloque sua imagem (ex: '3-jogos.svg') na pasta `public`
            e troque o `src` para: src="/3-jogos.svg" 
          */}
          <img
            src="https://www.minecraft.net/content/dam/minecraftnet/games/minecraft/key-art/PDP-Hero_Triple-Bundle_16x9.jpg" 
            alt="Minecraft Java & Bedrock, Dungeons e Legends Juntos"
            className="buy-games-image"
            onError={(e) => { e.currentTarget.src = "https://placehold.co/900x400/222222/ffffff?text=Image+Not+Found"; }}
          />
          <div className="buy-text-area">
            <h2 className="buy-title">COMPRE OS TRÊS JOGOS</h2>
            <p className="buy-description">
              Entre em um universo com blocos de criatividade, emoções e mistérios com três jogos Minecraft em um só pacote.
            </p>
            <Button variant="primary">
              ADQUIRA O PACOTE TRIPLO
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" style={{width: '20px', height: '20px'}}>
                <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
              </svg>
            </Button>
          </div>
        </div>
      </section>

      {/* Seção 3: Funcionalidades CRUD */}
      <section id="crud" className="section">
        <div className="section-content">
          <h2 className="crud-title">Funcionalidades CRUD</h2>
          <p className="crud-description">
            Aqui você pode integrar as operações de Create, Read, Update e Delete. Este é o coração do seu projeto Full Stack!
          </p>
          <div className="crud-card">
            <h3 className="crud-card-title">Gerenciamento de Entidades</h3>
            <p>Adicione, visualize, edite e remova seus dados.</p>
            <Button variant="secondary">Acessar CRUD</Button>
          </div>
        </div>
      </section>
    </main>
  );
};

/**
 * O rodapé do site com informações de copyright.
 */
const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <p>&copy; {new Date().getFullYear()} Projeto Mine-CRUD. Todos os direitos reservados.</p>
      <p>Desenvolvido com <span style={{ color: '#ef4444' }}>&hearts;</span> para aprendizado.</p>
    </footer>
  );
};


// ===================================================================================
// --- 4. COMPONENTE PRINCIPAL DA APLICAÇÃO ---
// Este é o componente raiz que junta todas as partes da nossa página.
// ===================================================================================

const App: React.FC = () => {
  return (
    // React.Fragment (<>) é usado para agrupar múltiplos componentes sem adicionar um nó extra ao DOM.
    <>
      <Header />
      <Container />
      <Footer />
    </>
  );
};

export default App;