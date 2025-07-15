# Como Rodar o Projeto

Este guia explica como configurar e executar o projeto em sua máquina local.

## Pré-requisitos

Certifique-se de ter o Node.js e o npm (Node Package Manager) instalados em seu sistema.

## Instalação de Dependências

Para instalar todas as dependências necessárias para o projeto, navegue até o diretório raiz do projeto no seu terminal e execute o seguinte comando:

Bash

npm i

Este comando irá instalar todas as dependências listadas no arquivo package.json.

Se o arquivo package.json não estiver disponível ou ocorrer algum erro, você pode tentar instalar as dependências manualmente com os seguintes comandos:

Dependências Principais:

Bash

npm i axios lucide-react react react-dom react-router-dom
Dependências de Desenvolvimento:

Bash

npm i --save-dev @eslint/js @types/react @types/react-dom @vitejs/plugin-react-swc autoprefixer eslint eslint-plugin-react-hooks eslint-plugin-react-refresh globals postcss tailwindcss typescript typescript-eslint vite
Iniciando a Aplicação Web
Após a instalação bem-sucedida de todas as dependências, você pode iniciar a aplicação web.

Dentro do seu package.json, você deve encontrar um script dev configurado para iniciar o servidor de desenvolvimento. Geralmente, ele se parece com isto:

JSON

"scripts": {
  "dev": "vite --host",
  // ...outros scripts
}
Para iniciar a aplicação, execute o seguinte comando no terminal:

Bash

npm run dev
O comando --host permite que outros dispositivos na mesma rede acessem sua aplicação. A aplicação estará disponível em seu navegador, geralmente em http://localhost:5173 (a porta pode variar, verifique a saída do terminal ao iniciar).

# Java
Documentação do Projeto: Portal Minecraft - Edição Java com Painel Administrativo
Este projeto consiste em uma landing page para a edição Java do Minecraft, completa com um painel de administração para gerenciar usuários, produtos (como mods e texturas) e visualizar relatórios de downloads. O frontend é construído com React e TypeScript, e o estilo é feito com CSS puro, com foco em um design moderno e responsivo.

Estrutura de Arquivos
O projeto está organizado da seguinte forma:

/
|-- CSS/
|   |-- Admin.css
|   |-- java.css
|   |-- Management.css
|-- components/
|   |-- Admin/
|   |   |-- AdminDashboard.tsx
|   |   |-- ManageProducts.tsx
|   |   |-- ManageUsers.tsx
|   |   |-- ViewReports.tsx
|   |-- Pages/
|       |-- Java.tsx
Análise dos Componentes e Estilos
Página Principal (Java.tsx)
Este é o ponto de entrada visual para os visitantes do site. Ele serve como uma vitrine para a edição Java do Minecraft.

Funcionalidades:

Seção Hero: Uma área de destaque com um título impactante, uma breve descrição e botões de chamada para ação (CTA), incluindo um link para o painel de administração.

Recursos Exclusivos: Uma seção que detalha as vantagens da Edição Java, como suporte a mods, servidores dedicados e modo hardcore. Cada recurso é apresentado em um "card" com um ícone e uma descrição.

Destaques e Notícias: Apresenta as últimas notícias e atualizações, como o lançamento de novos snapshots ou eventos da comunidade.

Animações de Scroll: Os elementos surgem suavemente na tela à medida que o usuário rola a página, melhorando a experiência visual.

Estrutura do Código:

Utiliza React.useEffect para gerenciar o comportamento do scroll da página.

Componentes reutilizáveis FeatureCard e HighlightCard são usados para exibir informações de forma consistente e organizada.

O componente LinkDom do react-router-dom é usado para navegação interna, como o link para a página de administração.

Estilo da Página Principal (java.css)
Este arquivo de estilo define a aparência da página Java.tsx.

Principais Características:

Tema Escuro: Utiliza um esquema de cores escuras com variáveis CSS (--base-bg, --text-primary, etc.) para fácil manutenção e consistência.

Design Responsivo: Usa media queries para adaptar o layout a diferentes tamanhos de tela (mobile, tablet e desktop), garantindo uma boa experiência em qualquer dispositivo. Por exemplo, as grades de recursos e notícias mudam de uma para múltiplas colunas em telas maiores.

Efeitos Visuais: Inclui gradientes, padrões de fundo sutis, sombras e transições suaves em hovers e animações de scroll para criar uma interface dinâmica e atraente.

Painel de Administração (AdminDashboard.tsx)
Esta é a página central do painel de administração, fornecendo uma visão geral e navegação para as diferentes seções de gerenciamento.

Funcionalidades:

Navegação Principal: Links claros e baseados em ícones para as seções de gerenciamento: "Gerenciar Usuários", "Gerenciar Produtos", "Visualizar Relatórios" e "Configurações".

Visão Geral Rápida: Cards que exibem estatísticas importantes, como o número total de usuários e produtos. (Nota: os dados são estáticos no código fornecido, mas seriam preenchidos por chamadas de API em uma aplicação completa).

Estrutura do Código:

Componente funcional simples que utiliza o Link do react-router-dom para navegação entre as diferentes rotas do painel de administração.

Estilo do Painel de Administração (Admin.css)
Define a aparência do AdminDashboard.tsx.

Principais Características:

Layout Centralizado e Profissional: O painel é apresentado em um container bem definido com um fundo semi-transparente e efeito de desfoque (backdrop-filter), mantendo a consistência visual com a página principal.

Navegação Intuitiva: Os itens de navegação são estilizados como blocos interativos que respondem ao hover do mouse, fornecendo feedback visual claro ao usuário.

Responsividade: O layout das seções de navegação e visão geral se ajusta para telas menores, garantindo que o painel seja funcional em dispositivos móveis.

Gerenciamento de Usuários (ManageUsers.tsx)
Este componente permite que os administradores executem operações de CRUD (Criar, Ler, Atualizar, Deletar) em usuários.

Funcionalidades:

Listagem de Usuários: Exibe todos os usuários em uma tabela com seus respectivos IDs, nomes e e-mails.

Adicionar e Editar Usuários: Um modal é aberto para criar um novo usuário ou editar um existente. A senha é um campo obrigatório apenas ao criar um novo usuário.

Deletar Usuários: Permite a exclusão de um usuário após uma confirmação.

Comunicação com a API: Utiliza o axios para fazer requisições GET, POST, PUT e DELETE para um endpoint da API (http://localhost:8888/api/users).

Gerenciamento de Estado: Usa o useState do React para controlar a lista de usuários, o estado do modal, o usuário atualmente em edição e as mensagens de erro.

Gerenciamento de Produtos (ManageProducts.tsx)
Semelhante ao gerenciamento de usuários, este componente é para gerenciar produtos como mods, texturas, etc.

Funcionalidades:

Listagem e Filtragem: Exibe os produtos em uma tabela e permite filtrar a lista por nome ou tipo de produto.

CRUD de Produtos: Funcionalidades completas de adicionar, editar e deletar produtos através de um modal.

Interação com Múltiplos Endpoints: Faz chamadas de API para buscar não apenas os produtos, mas também os tipos de produtos (/api/products e /api/product-types), que são usados para popular um menu suspenso no formulário do modal.

Visualização de Relatórios (ViewReports.tsx)
Componente focado em exibir dados, sem funcionalidades de edição.

Funcionalidades:

Relatório de Downloads: Exibe uma tabela que relaciona usuários aos produtos que eles baixaram, incluindo a data do download.

Busca de Dados: Faz uma requisição GET para o endpoint /api/reports/user-downloads para obter os dados do relatório.

Feedback de Carregamento: Exibe uma mensagem de "Carregando..." enquanto os dados estão sendo buscados da API.

Estilo das Páginas de Gerenciamento (Management.css)
Este arquivo CSS é compartilhado entre as páginas ManageUsers, ManageProducts e ViewReports, garantindo um visual consistente para todas as telas de gerenciamento.

Principais Características:

Tabela de Dados Clara: Estilo limpo e legível para as tabelas que exibem os dados, com espaçamento adequado e bordas sutis.

Modal Overlay: Quando o modal de edição/criação é aberto, um fundo escurecido (modal-overlay) cobre a página para focar a atenção do usuário no formulário.

Formulários Padronizados: Estilos consistentes para campos de input, labels e botões dentro dos modais.

Design Funcional: Foco na usabilidade, com botões de ação (editar, deletar) claramente visíveis e feedback de erro destacado em vermelho.

Fluxo de Interação
O visitante chega à Página Principal (Java.tsx), onde pode aprender sobre a Edição Java do Minecraft.

O administrador pode navegar para o painel de administração clicando no botão "Admin Panel".

O AdminDashboard.tsx atua como o hub central, de onde o administrador pode navegar para gerenciar usuários, produtos ou ver relatórios.

Em ManageUsers.tsx ou ManageProducts.tsx, o administrador pode visualizar, criar, editar e deletar registros. Todas as ações disparam chamadas de API via axios para um servidor backend (não incluído nos arquivos, mas esperado em http://localhost:8888).

Em ViewReports.tsx, o administrador pode visualizar um relatório de quais produtos foram baixados por quais usuários.