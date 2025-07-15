// contanier.tsx
// Importações de bibliotecas e hooks necessários do React e de outras libs
import React, { useState } from 'react'; // Importa React e o hook useState para gerenciar estado em componentes funcionais.
import { Route, useNavigate, Outlet, Routes } from 'react-router-dom'; // Importa componentes e hooks para roteamento no React.
import { Formik, Form, Field, ErrorMessage } from 'formik'; // Importa Formik para construção de formulários, Form, Field e ErrorMessage para elementos de formulário.
import * as Yup from 'yup'; // Importa a biblioteca Yup para validação de esquemas de dados (formulários).
import './contanier.css'; // Importa o arquivo CSS para estilização dos componentes.

/**
 * INTERFACES
 * Definindo os tipos de dados que serão usados na aplicação
 */

// Interface para imagens do carrossel
// Define a estrutura de um objeto de imagem de carrossel.
interface CarouselImage {
  src: string; // URL da fonte da imagem.
  alt: string; // Texto alternativo para acessibilidade da imagem.
  caption: string; // Legenda exibida com a imagem.
}

// Interface para banners (pode ser estático ou carrossel)
// Define a estrutura de um objeto Banner, que pode ser estático ou um carrossel.
interface Banner {
  id: string; // Identificador único do banner.
  type: 'static' | 'carousel'; // Tipo do banner: 'static' (imagem única) ou 'carousel' (múltiplas imagens).
  title: string; // Título principal do banner.
  description: string; // Descrição do banner.
  images: CarouselImage[]; // Array de objetos CarouselImage, mesmo para banners estáticos (terão apenas 1).
}

// Interface para relatórios
// Define a estrutura de um objeto de Relatório.
interface Report {
  id: string; // Identificador único do relatório.
  title: string; // Título do relatório.
  data: string; // Dados textuais do relatório.
  createdAt: string; // Data de criação do relatório.
}

/**
 * COMPONENTES REUTILIZÁVEIS
 * Componentes que podem ser usados em várias partes da aplicação
 */

// Componente de campo de formulário reutilizável
// FormField é um componente funcional React que renderiza um campo de formulário (input ou textarea).
// Ele é flexível e pode ser usado com ou sem Formik/Field, além de exibir mensagens de erro.
const FormField: React.FC<{
  label: string; // Texto do rótulo do campo.
  name: string; // Nome do campo (usado para htmlFor, name do input/Field).
  type?: string; // Tipo do input (e.g., 'text', 'password', 'email'). Padrão é 'text'.
  as?: string; // Renderiza como outro componente ou tag HTML (e.g., 'textarea' para Formik Field).
  placeholder?: string; // Texto de placeholder do input.
  error?: any; // Objeto de erro (geralmente vindo do Formik).
  children?: React.ReactNode; // Permite passar elementos filhos para renderização personalizada dentro do campo.
}> = ({ label, name, type = 'text', as, placeholder, error, children }) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label> {/* Rótulo associado ao campo */}
      {/* Condicionalmente renderiza um Field do Formik ou um input HTML padrão */}
      {children || ( // Se houver children, renderiza-os; caso contrário, renderiza o Field/input.
        as ? ( // Se 'as' for fornecido (ex: 'textarea'), usa o componente Field do Formik.
          <Field
            name={name}
            type={type}
            placeholder={placeholder}
            as={as} // Renderiza como o elemento especificado (ex: <textarea>).
            className={error ? 'error' : ''} // Adiciona classe 'error' se houver erro.
          />
        ) : ( // Se 'as' não for fornecido, usa um input HTML padrão.
          <input
            name={name}
            type={type}
            placeholder={placeholder}
            className={error ? 'error' : ''} // Adiciona classe 'error' se houver erro.
          />
        )
      )}
      {/* Exibe a mensagem de erro se houver */}
      {error && <div className="error-message">{error}</div>}
    </div>
  );
};

// Componente de botão com variações de estilo
// Button é um componente funcional React que renderiza um botão estilizado.
// Ele suporta variações de estilo, estados de carregamento e props adicionais.
const Button: React.FC<{
  variant?: 'primary' | 'secondary' | 'danger'; // Variação de estilo do botão. Padrão é 'primary'.
  className?: string; // Classes CSS adicionais.
  children: React.ReactNode; // Conteúdo do botão (texto, ícones, etc.).
  loading?: boolean; // Se `true`, exibe um spinner de carregamento e desabilita o botão.
  [key: string]: any; // Permite passar quaisquer outras props HTML nativas do botão (e.g., onClick, type).
}> = ({ variant = 'primary', className = '', children, loading = false, ...rest }) => {
  return (
    <button
      className={`button ${variant} ${className} ${loading ? 'loading' : ''}`.trim()} // Concatena classes CSS. `.trim()` remove espaços extras.
      disabled={loading} // Desabilita o botão se estiver no estado de carregamento.
      {...rest} // Espalha as demais props no elemento button.
    >
      {/* Condicionalmente renderiza um spinner ou os filhos do botão */}
      {loading ? ( // Se estiver carregando, exibe um spinner.
        <div className="spinner"></div>
      ) : ( // Caso contrário, exibe o conteúdo normal do botão.
        children
      )}
    </button>
  );
};

// Componente de card para agrupar conteúdo
// Card é um componente simples para criar blocos de conteúdo com um estilo de cartão.
const Card: React.FC<{ className?: string; children: React.ReactNode }> = ({ className = '', children }) => {
  return <div className={`card ${className}`}>{children}</div>; // Renderiza uma div com a classe 'card' e quaisquer classes adicionais.
};

// Componente de notificação (sucesso, erro, info)
// Notification é um componente para exibir mensagens temporárias ao usuário (sucesso, erro, informação).
const Notification: React.FC<{ message: string; type: 'success' | 'error' | 'info'; onClose?: () => void }> = ({
  message, // A mensagem a ser exibida.
  type, // O tipo de notificação, que afeta o estilo ('success', 'error', 'info').
  onClose // Função opcional a ser chamada quando a notificação é fechada.
}) => {
  return (
    <div className={`notification ${type}`}> {/* Div principal com classes de estilo base e tipo. */}
      <span>{message}</span> {/* Exibe a mensagem da notificação. */}
      {/* Botão de fechar, exibido apenas se onClose for fornecido */}
      {onClose && <button className="notification-close" onClick={onClose} aria-label="Fechar notificação">×</button>}
    </div>
  );
};

/**
 * COMPONENTES DE PÁGINA
 * Cada componente representa uma página completa da aplicação
 */

// Página inicial do site
// HomePage é o componente que representa a página inicial da aplicação.
// Exibe um carrossel de imagens e uma seção de compra de jogos.
const HomePage: React.FC = () => {
  // Dados mockados das imagens do carrossel para a seção de descoberta.
  const discoverImages: CarouselImage[] = [
    {
      src: "/castelo.png",
      alt: "Castelo Minecraft",
      caption: "Construa vastos assentamentos ou uma modesta cabana!"
    },
    {
      src: "/floresta_cerejeira.avif",
      alt: "Floresta de Cerejeira",
      caption: "Explore biomas únicos e descubra paisagens incríveis!"
    },
    {
      src: "/alex_e_steve.jpg",
      alt: "Alex e Steve defendendo-se de monstros",
      caption: "Defenda-se de monstros a noite"
    }
  ];

  return (
    <main className="container-main"> {/* Contêiner principal da página. */}
      {/* Seção de descoberta com carrossel */}
      <section id="discover" className="section">
        <div className="section-content">
          <h2 className="discover-title">DESCUBRA O MINECRAFT</h2>
          <p className="discover-description">
            Explore mundos infinitos e construa tudo que imaginar!
          </p>
          {/* Renderiza o componente Carousel com as imagens de descoberta. */}
          <Carousel images={discoverImages} />
        </div>
      </section>

      {/* Seção de compra de jogos */}
      <section id="buy-games" className="section">
        <div className="games-content-wrapper">
          <img
            src="/mine3.jpg"
            alt="Pacote Minecraft"
            className="buy-games-image"
            // Manipulador de erro para a imagem: se a imagem não carregar, exibe um placeholder.
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = "https://placehold.co/900x400/222222/ffffff?text=Image+Not+Found";
            }}
          />
          <div className="buy-text-area">
            <h2 className="buy-title">COMPRE OS TRÊS JOGOS</h2>
            {/* Botão para adquirir o pacote, usando o componente Button. */}
            <Button variant="primary">
              ADQUIRA O PACOTE TRIPLO
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
};

// Componente de carrossel de imagens
// Carousel é um componente reutilizável que exibe uma série de imagens navegáveis.
const Carousel: React.FC<{ images: CarouselImage[] }> = ({ images }) => {
  // Estado para controlar o índice da imagem atualmente exibida.
  const [currentIndex, setCurrentIndex] = useState(0);

  // Se não houver imagens, exibe uma mensagem.
  if (!images || images.length === 0) {
    return <div className="carousel-empty">Nenhuma imagem para exibir.</div>;
  }

  // Função para navegar para a imagem anterior.
  // Se estiver na primeira imagem (índice 0), vai para a última. Caso contrário, decrementa o índice.
  const handlePrev = () => setCurrentIndex(prev => (prev === 0 ? images.length - 1 : prev - 1));
  // Função para navegar para a próxima imagem.
  // Se estiver na última imagem, volta para a primeira (índice 0). Caso contrário, incrementa o índice.
  const handleNext = () => setCurrentIndex(prev => (prev === images.length - 1 ? 0 : prev + 1));

  // Tratamento de erro caso a imagem não carregue.
  // Substitui a imagem por um placeholder e atualiza o texto alternativo.
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const target = e.target as HTMLImageElement;
    target.src = "https://placehold.co/900x500/333333/ffffff?text=Image+Not+Found";
    target.alt = "Imagem não encontrada";
  };

  return (
    <div className="image-carousel"> {/* Contêiner principal do carrossel. */}
      <img
        src={images[currentIndex].src} // URL da imagem atual.
        alt={images[currentIndex].alt} // Texto alternativo da imagem atual.
        className="carousel-image" // Classe CSS para estilização da imagem.
        onError={handleImageError} // Chama handleImageError se a imagem falhar ao carregar.
      />
      <div className="carousel-nav"> {/* Controles de navegação (setas). */}
        <button
          className="nav-arrow"
          onClick={handlePrev} // Chama handlePrev ao clicar.
          aria-label="Imagem anterior" // Rótulo para acessibilidade.
          aria-controls="carousel-content" // Associa o botão ao conteúdo do carrossel para acessibilidade.
        >
          {/* Ícone SVG de seta para a esquerda. */}
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          className="nav-arrow"
          onClick={handleNext} // Chama handleNext ao clicar.
          aria-label="Próxima imagem" // Rótulo para acessibilidade.
          aria-controls="carousel-content" // Associa o botão ao conteúdo do carrossel para acessibilidade.
        >
          {/* Ícone SVG de seta para a direita. */}
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
      <div className="carousel-caption"> {/* Legenda da imagem atual. */}
        <p>{images[currentIndex].caption}</p>
      </div>
    </div>
  );
};

// Painel de administração principal
// AdminDashboard é o componente que exibe a tela inicial do painel administrativo.
// Oferece navegação rápida para outras seções do admin.
const AdminDashboard: React.FC = () => {
  const navigate = useNavigate(); // Hook do react-router-dom para navegação programática.

  return (
    <div className="dashboard"> {/* Contêiner principal do dashboard. */}
      <h2>Painel de Administração</h2>
      <div className="dashboard-grid"> {/* Grid para organizar os cards do dashboard. */}
        {/* Card de gerenciamento de banners */}
        <Card className="dashboard-card"> {/* Componente Card reutilizável. */}
          <h3>Banners</h3>
          <p>Gerencie os banners da página inicial</p>
          {/* Botão que navega para a rota de gerenciamento de banners. */}
          <Button variant="secondary" onClick={() => navigate('/admin/banners')}>Gerenciar</Button>
        </Card>

        {/* Card de relatórios */}
        <Card className="dashboard-card">
          <h3>Relatórios</h3>
          <p>Visualize relatórios do sistema</p>
          {/* Botão que navega para a rota de relatórios. */}
          <Button variant="secondary" onClick={() => navigate('/admin/reports')}>Visualizar</Button>
        </Card>

        {/* Card de configurações (desativado) */}
        <Card className="dashboard-card">
          <h3>Configurações</h3>
          <p>Configurações do sistema</p>
          {/* Botão desabilitado para uma funcionalidade futura. */}
          <Button variant="secondary" disabled>Em breve</Button>
        </Card>
      </div>
    </div>
  );
};

// Gerenciador de banners (CRUD completo)
// BannerManager é o componente principal para criar, ler, atualizar e deletar banners.
// Utiliza Formik para formulários e localStorage para persistência de dados.
const BannerManager: React.FC = () => {
  const navigate = useNavigate(); // Hook para navegação.
  // Estado para armazenar a lista de banners. Inicializa a partir do localStorage ou com um array vazio.
  const [banners, setBanners] = useState<Banner[]>(() => {
    const saved = localStorage.getItem('minecraft-banners'); // Tenta carregar do localStorage.
    return saved ? JSON.parse(saved) : []; // Se existir, faz o parse; senão, retorna um array vazio.
  });
  // Estado para controlar qual aba de criação/edição de banner está ativa ('static' ou 'carousel').
  const [activeTab, setActiveTab] = useState<'static' | 'carousel'>('static');
  // Estado para gerenciar as notificações exibidas ao usuário.
  const [notification, setNotification] = useState<{ message: string, type: 'success' | 'error' | 'info' } | null>(null);
  // Estados para controle de paginação dos banners listados.
  const [currentPage, setCurrentPage] = useState(1);
  const bannersPerPage = 5; // Número de banners a serem exibidos por página.

  // Schema de validação para banner estático usando Yup.
  const staticSchema = Yup.object().shape({
    title: Yup.string().required('Título é obrigatório'), // Título é obrigatório.
    description: Yup.string(), // Descrição é opcional.
    image: Yup.string().required('Imagem é obrigatória'), // A URL da imagem é obrigatória.
    alt: Yup.string().required('Texto alternativo é obrigatório') // Texto alternativo é obrigatório para acessibilidade.
  });

  // Schema de validação para banner de carrossel usando Yup.
  const carouselSchema = Yup.object().shape({
    title: Yup.string().required('Título é obrigatório'), // Título é obrigatório.
    description: Yup.string(), // Descrição é opcional.
    images: Yup.array() // Array de imagens.
      .min(1, 'Pelo menos uma imagem é necessária') // Deve ter no mínimo uma imagem.
      .max(3, 'Máximo de 3 imagens') // Limita a um máximo de 3 imagens.
  });

  // Função para mostrar uma notificação temporária.
  const showNotification = (message: string, type: 'success' | 'error' | 'info') => {
    setNotification({ message, type }); // Define o estado da notificação.
    setTimeout(() => setNotification(null), 5000); // Remove a notificação após 5 segundos.
  };

  // Manipula o upload de imagens, convertendo para Base64 e atualizando o formulário.
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, setFieldValue: (field: string, value: any) => void, type: 'static' | 'carousel', values: any) => {
    const file = e.target.files?.[0]; // Pega o primeiro arquivo selecionado.
    if (!file) return; // Se nenhum arquivo, retorna.

    // Verifica se o arquivo é uma imagem.
    if (!file.type.match('image.*')) {
      showNotification('Por favor, selecione um arquivo de imagem', 'error');
      return;
    }

    // Verifica o tamanho máximo da imagem (2MB).
    if (file.size > 2 * 1024 * 1024) {
      showNotification('Imagem muito grande (máximo 2MB)', 'error');
      return;
    }

    // Cria uma URL temporária para pré-visualização imediata da imagem.
    const tempSrc = URL.createObjectURL(file);

    // Usa FileReader para converter o arquivo para Base64.
    const reader = new FileReader();
    reader.onload = (event) => {
      // Quando o arquivo é lido, atualiza o valor do campo 'image' ou 'images' no Formik.
      if (type === 'static') {
        setFieldValue('image', event.target?.result as string); // Para banner estático, define 'image'.
        setFieldValue('tempImage', null); // Remove a pré-visualização temporária depois que o Base64 é carregado.
      } else {
        const newImage = {
          src: event.target?.result as string,
          alt: '', // Inicializa alt e caption vazios, o usuário pode preencher.
          caption: ''
        };
        setFieldValue('images', [...values.images, newImage]); // Para carrossel, adiciona a nova imagem ao array 'images'.
        // Remove a pré-visualização temporária correspondente.
        setFieldValue('tempImages', values.tempImages.filter((_: any, i: number) => i !== values.tempImages.length - 1));
      }
    };
    reader.readAsDataURL(file); // Inicia a leitura do arquivo como Data URL (Base64).

    // Atualiza a pré-visualização temporária imediatamente após a seleção do arquivo.
    if (type === 'static') {
      setFieldValue('tempImage', tempSrc);
    } else {
      const newTempImage = {
        tempSrc,
        alt: '',
        caption: ''
      };
      setFieldValue('tempImages', [...(values.tempImages || []), newTempImage]);
    }
  };

  // Salva um banner no estado e no localStorage.
  const saveBanner = (values: any, { resetForm, setSubmitting }: { resetForm: () => void; setSubmitting: (isSubmitting: boolean) => void }) => {
    try {
      let banner: Banner;

      // Cria o objeto banner com base no tipo de aba ativa.
      if (activeTab === 'static') {
        banner = {
          id: values.id || Date.now().toString(), // Usa ID existente ou gera um novo baseado no timestamp.
          type: 'static',
          title: values.title,
          description: values.description,
          images: [{ // Banner estático tem apenas uma imagem.
            src: values.image,
            alt: values.alt,
            caption: values.description // A legenda é a descrição do banner.
          }]
        };
      } else {
        banner = {
          id: values.id || Date.now().toString(),
          type: 'carousel',
          title: values.title,
          description: values.description,
          images: values.images // Banner de carrossel usa o array de imagens completo.
        };
      }

      // Atualiza o estado dos banners. Se o ID já existe, atualiza; senão, adiciona um novo.
      setBanners(prev => {
        const updated = values.id
          ? prev.map(b => b.id === values.id ? banner : b) // Mapeia para atualizar o banner existente.
          : [...prev, banner]; // Adiciona o novo banner.
        localStorage.setItem('minecraft-banners', JSON.stringify(updated)); // Salva a lista atualizada no localStorage.
        return updated;
      });

      resetForm(); // Limpa o formulário após o salvamento.
      showNotification(`Banner ${values.id ? 'atualizado' : 'salvo'} com sucesso!`, 'success'); // Exibe notificação de sucesso.
    } catch (error) {
      showNotification('Erro ao salvar banner', 'error'); // Exibe notificação de erro.
    } finally {
      setSubmitting(false); // Garante que o estado de submissão do Formik seja resetado.
    }
  };

  // Preenche o formulário com os dados de um banner para edição.
  const editBanner = (banner: Banner) => {
    setActiveTab(banner.type); // Muda para a aba correta (estático ou carrossel).
    // Pequeno atraso para garantir que a aba mude antes de rolar a página.
    setTimeout(() => {
      document.getElementById('banner-form')?.scrollIntoView({ behavior: 'smooth' }); // Rola até o formulário.
    }, 100);
    // TODO: Necessário preencher os valores do Formik `initialValues` no `Formik` que está renderizado.
    // Atualmente, esta função apenas muda a aba e rola, mas não preenche o formulário.
    // Isso exigiria uma lógica mais complexa, como usar `enableReinitialize` no Formik e passar os `initialValues` dinamicamente,
    // ou usar `setValues` do Formik.
  };

  // Remove um banner da lista e do localStorage.
  const deleteBanner = (id: string) => {
    setBanners(prev => {
      const updated = prev.filter(banner => banner.id !== id); // Filtra para remover o banner com o ID fornecido.
      localStorage.setItem('minecraft-banners', JSON.stringify(updated)); // Atualiza o localStorage.
      return updated;
    });
    showNotification('Banner removido com sucesso!', 'success'); // Exibe notificação.
  };

  // Calcular banners atuais para paginação.
  const indexOfLastBanner = currentPage * bannersPerPage; // Índice do último banner na página atual.
  const indexOfFirstBanner = indexOfLastBanner - bannersPerPage; // Índice do primeiro banner na página atual.
  const currentBanners = banners.slice(indexOfFirstBanner, indexOfLastBanner); // Fatiar o array de banners para a página atual.
  const totalPages = Math.ceil(banners.length / bannersPerPage); // Calcula o número total de páginas.

  return (
    <div className="admin-content">
      <div className="admin-header">
        <h2>Gerenciamento de Banners</h2>
        <Button variant="secondary" onClick={() => navigate('/admin')}>Voltar</Button> {/* Botão para voltar ao dashboard. */}
      </div>

      {/* Notificação, se houver. */}
      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)} // Fecha a notificação ao clicar no 'x'.
        />
      )}

      {/* Abas para escolher tipo de banner. */}
      <div className="admin-tabs">
        <Button
          variant={activeTab === 'static' ? 'primary' : 'secondary'} // Estilo da aba ativa.
          onClick={() => setActiveTab('static')} // Muda para a aba de banner estático.
        >
          Banner Estático
        </Button>
        <Button
          variant={activeTab === 'carousel' ? 'primary' : 'secondary'} // Estilo da aba ativa.
          onClick={() => setActiveTab('carousel')} // Muda para a aba de banner de carrossel.
        >
          Banner de Carrossel
        </Button>
      </div>

      {/* Formulário de criação/edição */}
      <div id="banner-form" className="form-container">
        {activeTab === 'static' ? ( // Se a aba ativa for 'static', renderiza o formulário de banner estático.
          <Formik
            initialValues={{
              id: '', // ID do banner (vazio para novo, preenchido para edição).
              title: '',
              description: '',
              image: '', // URL Base64 da imagem.
              alt: '', // Texto alternativo.
              tempImage: null as string | null // Para pré-visualização temporária antes da conversão para Base64.
            }}
            validationSchema={staticSchema} // Aplica o esquema de validação para banner estático.
            onSubmit={saveBanner} // Função chamada na submissão do formulário.
          >
            {({ setFieldValue, values, isSubmitting }) => ( // Props do Formik para acessar valores, setar campos e estado de submissão.
              <div className="crud-form">
                <Form placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                  <h3>Criar/Editar Banner Estático</h3>

                  {/* Campo de Título */}
                  <FormField
                    label="Título *"
                    name="title"
                    placeholder="Título do banner"
                    error={<ErrorMessage name="title" />} // Exibe erro do Formik para o campo 'title'.
                  />

                  {/* Campo de Descrição */}
                  <FormField
                    label="Descrição"
                    name="description"
                    as="textarea" // Renderiza como textarea.
                    placeholder="Descrição do banner"
                  />

                  {/* Campo de Upload de Imagem */}
                  <div className="form-group">
                    <label htmlFor="image">Imagem *</label>
                    <input
                      id="image"
                      name="image"
                      type="file"
                      accept="image/*" // Aceita apenas arquivos de imagem.
                      onChange={(e) => handleImageUpload(e, setFieldValue, 'static', values)} // Chama o manipulador de upload.
                    />
                    <ErrorMessage name="image" component="div" className="error-message" /> {/* Exibe erro para o campo 'image'. */}
                    {/* Pré-visualização da imagem (temporária ou final) */}
                    {(values.tempImage || values.image) && (
                      <div className="image-preview">
                        <img
                          src={values.tempImage || values.image} // Mostra a imagem temporária ou a final.
                          alt="Pré-visualização"
                        />
                      </div>
                    )}
                  </div>

                  {/* Campo de Texto Alternativo */}
                  <FormField
                    label="Texto Alternativo *"
                    name="alt"
                    placeholder="Texto para acessibilidade"
                    error={<ErrorMessage name="alt" />} // Exibe erro do Formik para o campo 'alt'.
                  />

                  {/* Ações do Formulário (Limpar e Salvar/Atualizar) */}
                  <div className="form-actions">
                    <Button type="reset" variant="secondary">Limpar</Button> {/* Botão para resetar o formulário. */}
                    <Button
                      type="submit"
                      variant="primary"
                      loading={isSubmitting} // Mostra spinner se estiver submetendo.
                    >
                      {values.id ? 'Atualizar' : 'Salvar'} Banner {/* Texto do botão muda para "Atualizar" se for edição. */}
                    </Button>
                  </div>
                </Form>
              </div>
            )}
          </Formik>
        ) : ( // Se a aba ativa for 'carousel', renderiza o formulário de banner de carrossel.
          <Formik
            initialValues={{
              id: '',
              title: '',
              description: '',
              images: [] as CarouselImage[], // Array para as imagens do carrossel.
              tempImages: [] as any[] // Array para pré-visualizações temporárias de imagens.
            }}
            validationSchema={carouselSchema} // Aplica o esquema de validação para carrossel.
            onSubmit={saveBanner}
          >
            {({ values, setFieldValue, isSubmitting }) => (
              <div className="crud-form">
                <Form placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                  <h3>Criar/Editar Banner de Carrossel</h3>

                  {/* Campo de Título */}
                  <FormField
                    label="Título *"
                    name="title"
                    placeholder="Título do banner"
                    error={<ErrorMessage name="title" />}
                  />

                  {/* Campo de Descrição */}
                  <FormField
                    label="Descrição"
                    name="description"
                    as="textarea"
                    placeholder="Descrição do banner"
                  />

                  {/* Campo de Adicionar Imagens para Carrossel */}
                  <div className="form-group">
                    <label>Adicionar Imagens (Máximo: 3) *</label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageUpload(e, setFieldValue, 'carousel', values)}
                      disabled={values.images.length >= 3} // Desabilita o upload se o limite de 3 imagens for atingido.
                    />
                    <ErrorMessage name="images" component="div" className="error-message" /> {/* Erro para o array de imagens. */}
                  </div>

                  {/* Lista de imagens do carrossel (pré-visualização e edição de alt/caption) */}
                  <div className="images-list">
                    {/* Exibe pré-visualizações temporárias enquanto as imagens estão sendo processadas */}
                    {values.tempImages.map((image, index) => (
                      <div key={`temp-image-${index}`} className="image-item">
                        <div className="image-preview">
                          <img src={image.tempSrc} alt={`Pré-visualização ${index + 1}`} />
                        </div>
                        <p>Processando imagem...</p>
                      </div>
                    ))}

                    {/* Exibe as imagens já carregadas com campos para alt e caption */}
                    {values.images.map((image, index) => (
                      <div key={`image-${index}`} className="image-item">
                        <div className="image-preview">
                          <img src={image.src} alt={`Pré-visualização ${index + 1}`} />
                        </div>
                        {/* Campo para Texto Alternativo da imagem individual do carrossel */}
                        <FormField
                          label="Texto Alternativo *"
                          name={`images[${index}].alt`} // Nome do campo com sintaxe de array para Formik.
                          placeholder="Texto para acessibilidade"
                          error={<ErrorMessage name={`images[${index}].alt`} />}
                        />
                        {/* Campo para Legenda da imagem individual do carrossel */}
                        <FormField
                          label="Legenda"
                          name={`images[${index}].caption`}
                          as="textarea"
                          placeholder="Legenda da imagem"
                        >
                          <Field // Usa Field diretamente para maxLength
                            name={`images[${index}].caption`}
                            as="textarea"
                            placeholder="Legenda da imagem"
                            maxLength={50} // Limita o tamanho da legenda.
                          />
                        </FormField>
                        {/* Botão para remover uma imagem do carrossel */}
                        <Button
                          type="button"
                          variant="danger"
                          onClick={() => {
                            const newImages = [...values.images];
                            newImages.splice(index, 1); // Remove a imagem do array.
                            setFieldValue('images', newImages); // Atualiza o array de imagens no Formik.
                          }}
                        >
                          Remover Imagem
                        </Button>
                      </div>
                    ))}
                  </div>

                  {/* Ações do Formulário (Limpar e Salvar/Atualizar) */}
                  <div className="form-actions">
                    <Button type="reset" variant="secondary">Limpar</Button>
                    <Button
                      type="submit"
                      variant="primary"
                      disabled={values.images.length === 0} // Desabilita se não houver imagens.
                      loading={isSubmitting}
                    >
                      {values.id ? 'Atualizar' : 'Salvar'} Banner
                    </Button>
                  </div>
                </Form>
              </div>
            )}
          </Formik>
        )}
      </div>

      {/* Lista de banners cadastrados */}
      <div className="banners-list">
        <h3>Banners Cadastrados</h3>

        {banners.length === 0 ? ( // Se não houver banners, exibe uma mensagem.
          <p>Nenhum banner cadastrado ainda.</p>
        ) : (
          <div className="banners-grid">
            {/* Mapeia e renderiza os banners da página atual */}
            {currentBanners.map(banner => (
              <Card key={`banner-${banner.id}`} className="banner-item">
                <h4>{banner.title}</h4>
                <p className="banner-type">
                  Tipo: {banner.type === 'static' ? 'Estático' : 'Carrossel'}
                </p>

                {/* Pré-visualização do banner */}
                {banner.type === 'static' ? ( // Se for banner estático, mostra a primeira imagem.
                  <div className="image-preview">
                    <img src={banner.images[0].src} alt={banner.images[0].alt} />
                  </div>
                ) : ( // Se for carrossel, mostra as duas primeiras imagens e conta o restante.
                  <div className="carousel-preview">
                    {banner.images.slice(0, 2).map((img, idx) => ( // Exibe até 2 imagens para pré-visualização.
                      <img key={idx} src={img.src} alt={img.alt} />
                    ))}
                    {banner.images.length > 2 && ( // Se houver mais de 2 imagens, mostra a contagem.
                      <span>+{banner.images.length - 2} mais</span>
                    )}
                  </div>
                )}

                {/* Ações do banner (Editar e Excluir) */}
                <div className="banner-actions">
                  <Button
                    variant="secondary"
                    onClick={() => editBanner(banner)} // Chama a função para editar o banner.
                  >
                    Editar
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => deleteBanner(banner.id)} // Chama a função para excluir o banner.
                  >
                    Excluir
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* Paginação */}
        {banners.length > bannersPerPage && ( // Exibe a paginação apenas se houver mais banners do que por página.
          <div className="pagination">
            <Button
              variant="secondary"
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} // Volta para a página anterior.
              disabled={currentPage === 1} // Desabilita se já estiver na primeira página.
            >
              Anterior
            </Button>

            <span>Página {currentPage} de {totalPages}</span> {/* Mostra a página atual e o total de páginas. */}

            <Button
              variant="secondary"
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} // Avança para a próxima página.
              disabled={currentPage === totalPages} // Desabilita se já estiver na última página.
            >
              Próxima
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

// Página de relatórios
// ReportsPage é o componente que exibe uma lista de relatórios mockados.
const ReportsPage: React.FC = () => {
  const navigate = useNavigate(); // Hook para navegação.
  // Dados mockados de relatórios.
  const [reports] = useState<Report[]>([
    {
      id: '1',
      title: 'Visitas Mensais',
      data: '1,200 visitas em Julho',
      createdAt: '2023-07-01'
    },
    {
      id: '2',
      title: 'Downloads',
      data: '850 downloads no último mês',
      createdAt: '2023-07-05'
    },
    {
      id: '3',
      title: 'Banners Mais Visualizados',
      data: 'Banner principal: 95% visualizações',
      createdAt: '2023-07-10'
    }
  ]);

  return (
    <div className="admin-content">
      <div className="admin-header">
        <h2>Relatórios</h2>
        <Button variant="secondary" onClick={() => navigate('/admin')}>Voltar</Button> {/* Botão para voltar ao dashboard. */}
      </div>

      {/* Grid de relatórios */}
      <div className="reports-grid">
        {reports.map(report => ( // Mapeia e renderiza cada relatório como um Card.
          <Card key={report.id} className="report-card">
            <h3>{report.title}</h3>
            <p>{report.data}</p>
            <div className="report-footer">
              <span>Gerado em: {new Date(report.createdAt).toLocaleDateString()}</span> {/* Formata a data de criação. */}
              <Button variant="secondary">Exportar</Button> {/* Botão de exportar (sem funcionalidade implementada). */}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

// Layout principal do site
// Layout é um componente que define a estrutura comum para as páginas do site (exceto o admin).
// Inclui o rodapé e renderiza os filhos no meio.
const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const navigate = useNavigate(); // Hook para navegação.

  return (
    <div id="root">
      {/* CABEÇALHO REMOVIDO COMPLETAMENTE - Comentário no código indica que o cabeçalho foi removido. */}

      {/* Conteúdo principal - Renderiza os componentes filhos passados para o Layout. */}
      {children}

      {/* Rodapé */}
      <footer className="footer">
        <p>© {new Date().getFullYear()} Minecraft. Todos os direitos reservados.</p> {/* Direitos autorais dinâmicos. */}
        <p>Desenvolvido com <span style={{ color: '#ef4444' }}>♥</span> para aprendizado</p>

        {/* O botão de acesso administrativo agora levará diretamente ao admin */}
        <div className="footer-admin-link">
          <Button
            variant="secondary"
            onClick={() => navigate('/admin')} // Navega para o painel administrativo.
            className="admin-access-button"
          >
            Acesso Administrativo
          </Button>
        </div>
      </footer>
    </div>
  );
};

// Layout do painel administrativo
// AdminLayout é o componente de layout para as páginas do painel administrativo.
// Inclui uma barra lateral de navegação e um espaço para as rotas filhas.
const AdminLayout: React.FC = () => {
  const navigate = useNavigate(); // Hook para navegação.

  // Não há mais redirecionamento para login - Este comentário indica uma mudança na lógica anterior.
  // Este bloco não será mais atingido, mas mantido para clareza

  return (
    <div className="admin-layout">
      {/* Sidebar de navegação */}
      <aside className="admin-sidebar">
        <h3>Painel Admin</h3>
        <nav>
          <ul>
            <li><button onClick={() => navigate('/admin')}>Dashboard</button></li> {/* Botão para o dashboard. */}
            <li><button onClick={() => navigate('/admin/banners')}>Banners</button></li> {/* Botão para o gerenciamento de banners. */}
            <li><button onClick={() => navigate('/admin/reports')}>Relatórios</button></li> {/* Botão para a página de relatórios. */}
            <li><button onClick={() => navigate('/')}>Voltar ao Site</button></li> {/* Botão para voltar ao site principal. */}
          </ul>
        </nav>
      </aside>

      {/* Conteúdo principal do admin - Renderiza as rotas filhas definidas no App. */}
      <main className="admin-main">
        <Outlet /> {/* Componente do react-router-dom que renderiza o componente da rota filha correspondente. */}
      </main>
    </div>
  );
};

/**
 * COMPONENTE PRINCIPAL DA APLICAÇÃO
 * Define todas as rotas do sistema
 */
// App é o componente raiz da aplicação, responsável por configurar todas as rotas.
const App: React.FC = () => {
  return (
    <Routes> {/* Componente do react-router-dom para definir as rotas da aplicação. */}
      {/* Rota principal: '/' */}
      {/* Renderiza a HomePage dentro do Layout (incluindo rodapé). */}
      <Route path="/" element={<Layout><HomePage /></Layout>} />

      {/* Rota de login: removida ou mantida como um placeholder se referenciada */}
      {/* <Route path="/login" element={<LoginPage />} /> - Esta rota foi comentada, indicando que não está ativa. */}

      {/* Rotas do painel administrativo (aninhadas) */}
      {/* A rota pai '/admin' renderiza o AdminLayout. */}
      <Route path="/admin" element={<AdminLayout />}>
        {/* Rota index: renderiza AdminDashboard quando a URL é exatamente '/admin'. */}
        <Route index element={<AdminDashboard />} />
        {/* Rota para gerenciamento de banners: '/admin/banners'. */}
        <Route path="banners" element={<BannerManager />} />
        {/* Rota para a página de relatórios: '/admin/reports'. */}
        <Route path="reports" element={<ReportsPage />} />
      </Route>
    </Routes>
  );
};

export default App; // Exporta o componente App como padrão para ser renderizado no `index.tsx` (ou similar).