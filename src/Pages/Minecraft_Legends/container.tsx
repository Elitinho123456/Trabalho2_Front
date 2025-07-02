// Importa o React, necessário para usar JSX e componentes funcionais
import React from 'react';

// Importa o componente de cabeçalho 
import Header from '../components/header';

// Importa o componente de rodapé específico do Minecraft Legends
import MinecraftLegendsFooter from './footer';

// Importa o arquivo CSS relacionado ao rodapé z
import '../../CSS/footer.css';

// Define um componente funcional que recebe `children` como propriedade
// Tipagem explícita usando TypeScript: `children` é do tipo `React.ReactNode`
const MinecraftLegendsContainer = ({ children }: { children: React.ReactNode }) => {
  // Retorna a estrutura da página com cabeçalho, conteúdo principal e rodapé
  return (
    // Div principal que envolve todo o layout da página
    <div className="minecraft-legends-container">

      /* Renderiza o cabeçalho da página */
      <Header />

      /* Área principal da página onde o conteúdo será inserido */
      <main className="minecraft-legends-main">
        /* `children` representa qualquer conteúdo passado dentro do componente */
        {children}
      </main>

      /* Renderiza o rodapé personalizado do Minecraft Legends */
      <MinecraftLegendsFooter />
    </div>
  );
};

// Exporta o componente para uso em outras partes da aplicação
export default MinecraftLegendsContainer;
