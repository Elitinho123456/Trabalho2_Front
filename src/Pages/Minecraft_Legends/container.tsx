// Componente Container para a página do Minecraft Legends
// Este componente é um wrapper para o conteúdo, aplicando estilos de layout.

import React from 'react';
import './container.css'; // Importa o CSS específico para este container

interface ContainerProps {
  children: React.ReactNode; // Conteúdo que será renderizado dentro do container
  className?: string; // Classes CSS adicionais para customização
}

const Container: React.FC<ContainerProps> = ({ children, className = '' }) => {
  return (
    <div className={`container ${className}`}> {/* Aplica a classe base 'container' e classes adicionais */}
      {children}
    </div>
  );
};

export default Container;
