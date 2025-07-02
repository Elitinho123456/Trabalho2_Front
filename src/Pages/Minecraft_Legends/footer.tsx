// Importa o React para poder usar JSX e criar componentes
import React from 'react';

// Importa o arquivo de estilos CSS específico para o footer
import '../../CSS/footer.css';

// Define um componente funcional chamado MinecraftLegendsFooter
const MinecraftLegendsFooter = () => {
  // Retorna o JSX que representa o conteúdo do footer
  return (
    // Elemento <footer> com uma classe CSS para estilização
    <footer className="minecraft-legends-footer">
      
      /* Div que agrupa o conteúdo principal do rodapé */
      <div className="footer-content">

        /* Imagem do logo com caminho relativo e classe para estilização */
        <img 
          src="/minecraft_logo_icon_168099.webp" 
          alt="Minecraft Legends Logo" 
          className="footer-logo" 
        /> 

        /* Menu de navegação com links úteis */
        <nav className="footer-nav">
          /* Link para o site oficial, abre em nova aba e com segurança para evitar acesso ao objeto window.opener */
          <a 
            href="https://www.minecraft.net/legends" 
            target="_blank" 
            rel="noopener noreferrer"
          >
            Site Oficial
          </a>

          /* Link para a FAQ, mesmo comportamento de segurança */
          <a 
            href="https://www.minecraft.net/pt-br/article/minecraft-legends-faq" 
            target="_blank" 
            rel="noopener noreferrer"
          >
            FAQ
          </a>

          /* Link para o Twitter oficial do Minecraft */
          <a 
            href="https://twitter.com/minecraft" 
            target="_blank" 
            rel="noopener noreferrer"
          >
            Twitter
          </a>
        </nav>
      </div>

      /* Div da parte inferior do rodapé, geralmente usada para direitos autorais */
      <div className="footer-bottom">
    /* Exibe o ano atual dinamicamente usando JavaScript */
        <span>
          © {new Date().getFullYear()} Minecraft Legends. Todos os direitos reservados.
        </span>
      </div>
    </footer>
  );
};

// Exporta o componente para ser usado em outros arquivos
export default MinecraftLegendsFooter;
