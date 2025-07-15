// contanier.tsx
import React, { useState } from 'react';
import { Route, useNavigate, Navigate, Outlet, Routes } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import './contanier.css';

/**
 * INTERFACES
 * Definindo os tipos de dados que serão usados na aplicação
 */

// Interface para imagens do carrossel
interface CarouselImage {
  src: string;
  alt: string;
  caption: string;
}

// Interface para banners (pode ser estático ou carrossel)
interface Banner {
  id: string;
  type: 'static' | 'carousel';
  title: string;
  description: string;
  images: CarouselImage[];
}

// Interface para relatórios
interface Report {
  id: string;
  title: string;
  data: string;
  createdAt: string;
}

/**
 * COMPONENTES REUTILIZÁVEIS
 * Componentes que podem ser usados em várias partes da aplicação
 */

// Componente de campo de formulário reutilizável
const FormField: React.FC<{
  label: string;
  name: string;
  type?: string;
  as?: string;
  placeholder?: string;
  error?: any;
  children?: React.ReactNode;
}> = ({ label, name, type = 'text', as, placeholder, error, children }) => {
  
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      {children || (
        as ? (
          <Field
            name={name}
            type={type}
            placeholder={placeholder}
            as={as}
            className={error ? 'error' : ''}
          />
        ) : (
          <input
            name={name}
            type={type}
            placeholder={placeholder}
            className={error ? 'error' : ''}
          />
        )
      )}
      {error && <div className="error-message">{error}</div>}
    </div>
  );
};

// Componente de botão com variações de estilo
const Button: React.FC<{
  variant?: 'primary' | 'secondary' | 'danger';
  className?: string;
  children: React.ReactNode;
  loading?: boolean;
  [key: string]: any;
}> = ({ variant = 'primary', className = '', children, loading = false, ...rest }) => {
  return (
    <button 
      className={`button ${variant} ${className} ${loading ? 'loading' : ''}`.trim()} 
      disabled={loading}
      {...rest}
    >
      {loading ? (
        <div className="spinner"></div>
      ) : (
        children
      )}
    </button>
  );
};

// Componente de card para agrupar conteúdo
const Card: React.FC<{ className?: string; children: React.ReactNode }> = ({ className = '', children }) => {
  return <div className={`card ${className}`}>{children}</div>;
};

// Componente de notificação (sucesso, erro, info)
const Notification: React.FC<{ message: string; type: 'success' | 'error' | 'info'; onClose?: () => void }> = ({ 
  message, 
  type, 
  onClose 
}) => {
  return (
    <div className={`notification ${type}`}>
      <span>{message}</span>
      {onClose && <button className="notification-close" onClick={onClose} aria-label="Fechar notificação">×</button>}
    </div>
  );
};

/**
 * COMPONENTES DE PÁGINA
 * Cada componente representa uma página completa da aplicação
 */

// Página inicial do site
const HomePage: React.FC = () => {
  // Dados das imagens do carrossel
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
    <main className="container-main">
      {/* Seção de descoberta com carrossel */}
      <section id="discover" className="section">
        <div className="section-content">
          <h2 className="discover-title">DESCUBRA O MINECRAFT</h2>
          <p className="discover-description">
            Explore mundos infinitos e construa tudo que imaginar!
          </p>
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
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = "https://placehold.co/900x400/222222/ffffff?text=Image+Not+Found";
            }}
          />
          <div className="buy-text-area">
            <h2 className="buy-title">COMPRE OS TRÊS JOGOS</h2>
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
const Carousel: React.FC<{ images: CarouselImage[] }> = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Se não houver imagens, exibe mensagem
  if (!images || images.length === 0) {
    return <div className="carousel-empty">Nenhuma imagem para exibir.</div>;
  }

  // Funções para navegar entre as imagens
  const handlePrev = () => setCurrentIndex(prev => (prev === 0 ? images.length - 1 : prev - 1));
  const handleNext = () => setCurrentIndex(prev => (prev === images.length - 1 ? 0 : prev + 1));

  // Tratamento de erro caso a imagem não carregue
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
        <button 
          className="nav-arrow" 
          onClick={handlePrev} 
          aria-label="Imagem anterior"
          aria-controls="carousel-content"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button 
          className="nav-arrow" 
          onClick={handleNext} 
          aria-label="Próxima imagem"
          aria-controls="carousel-content"
        >
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

// Painel de administração principal
const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="dashboard">
      <h2>Painel de Administração</h2>
      <div className="dashboard-grid">
        {/* Card de gerenciamento de banners */}
        <Card className="dashboard-card">
          <h3>Banners</h3>
          <p>Gerencie os banners da página inicial</p>
          <Button variant="secondary" onClick={() => navigate('/admin/banners')}>Gerenciar</Button>
        </Card>
        
        {/* Card de relatórios */}
        <Card className="dashboard-card">
          <h3>Relatórios</h3>
          <p>Visualize relatórios do sistema</p>
          <Button variant="secondary" onClick={() => navigate('/admin/reports')}>Visualizar</Button>
        </Card>
        
        {/* Card de configurações (desativado) */}
        <Card className="dashboard-card">
          <h3>Configurações</h3>
          <p>Configurações do sistema</p>
          <Button variant="secondary" disabled>Em breve</Button>
        </Card>
      </div>
    </div>
  );
};

// Gerenciador de banners (CRUD completo)
const BannerManager: React.FC = () => {
  const navigate = useNavigate();
  // Carrega banners do localStorage ou inicia com array vazio
  const [banners, setBanners] = useState<Banner[]>(() => {
    const saved = localStorage.getItem('minecraft-banners');
    return saved ? JSON.parse(saved) : [];
  });
  const [activeTab, setActiveTab] = useState<'static' | 'carousel'>('static');
  const [notification, setNotification] = useState<{message: string, type: 'success' | 'error' | 'info'} | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const bannersPerPage = 5;

  // Schema de validação para banner estático
  const staticSchema = Yup.object().shape({
    title: Yup.string().required('Título é obrigatório'),
    description: Yup.string(),
    image: Yup.string().required('Imagem é obrigatória'),
    alt: Yup.string().required('Texto alternativo é obrigatório')
  });

  // Schema de validação para banner de carrossel
  const carouselSchema = Yup.object().shape({
    title: Yup.string().required('Título é obrigatório'),
    description: Yup.string(),
    images: Yup.array().min(1, 'Pelo menos uma imagem é necessária').max(3, 'Máximo de 3 imagens')
  });

  // Mostra notificação temporária
  const showNotification = (message: string, type: 'success' | 'error' | 'info') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 5000);
  };

  // Manipula upload de imagens
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, setFieldValue: (field: string, value: any) => void, type: 'static' | 'carousel', values: any) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Verifica se é uma imagem
    if (!file.type.match('image.*')) {
      showNotification('Por favor, selecione um arquivo de imagem', 'error');
      return;
    }

    // Verifica tamanho máximo (2MB)
    if (file.size > 2 * 1024 * 1024) {
      showNotification('Imagem muito grande (máximo 2MB)', 'error');
      return;
    }

    // Mostra preview temporário
    const tempSrc = URL.createObjectURL(file);
    
    // Converte para base64
    const reader = new FileReader();
    reader.onload = (event) => {
      if (type === 'static') {
        setFieldValue('image', event.target?.result as string);
        setFieldValue('tempImage', null); // Remove preview temporário
      } else {
        const newImage = {
          src: event.target?.result as string,
          alt: '',
          caption: ''
        };
        setFieldValue('images', [...values.images, newImage]);
        setFieldValue('tempImages', values.tempImages.filter((_: any, i: number) => i !== values.tempImages.length - 1));
      }
    };
    reader.readAsDataURL(file);

    // Atualiza preview temporário
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

  // Salva banner no estado e localStorage
  const saveBanner = (values: any, { resetForm, setSubmitting }: { resetForm: () => void; setSubmitting: (isSubmitting: boolean) => void }) => {
    try {
      let banner: Banner;

      if (activeTab === 'static') {
        banner = {
          id: values.id || Date.now().toString(),
          type: 'static',
          title: values.title,
          description: values.description,
          images: [{
            src: values.image,
            alt: values.alt,
            caption: values.description
          }]
        };
      } else {
        banner = {
          id: values.id || Date.now().toString(),
          type: 'carousel',
          title: values.title,
          description: values.description,
          images: values.images
        };
      }

      // Atualiza estado e localStorage
      setBanners(prev => {
        const updated = values.id 
          ? prev.map(b => b.id === values.id ? banner : b)
          : [...prev, banner];
        localStorage.setItem('minecraft-banners', JSON.stringify(updated));
        return updated;
      });

      resetForm();
      showNotification(`Banner ${values.id ? 'atualizado' : 'salvo'} com sucesso!`, 'success');
    } catch (error) {
      showNotification('Erro ao salvar banner', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  // Preenche formulário para edição
  const editBanner = (banner: Banner) => {
    setActiveTab(banner.type);
    setTimeout(() => {
      document.getElementById('banner-form')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  // Remove banner
  const deleteBanner = (id: string) => {
    setBanners(prev => {
      const updated = prev.filter(banner => banner.id !== id);
      localStorage.setItem('minecraft-banners', JSON.stringify(updated));
      return updated;
    });
    showNotification('Banner removido com sucesso!', 'success');
  };

  // Calcular banners atuais para paginação
  const indexOfLastBanner = currentPage * bannersPerPage;
  const indexOfFirstBanner = indexOfLastBanner - bannersPerPage;
  const currentBanners = banners.slice(indexOfFirstBanner, indexOfLastBanner);
  const totalPages = Math.ceil(banners.length / bannersPerPage);

  return (
    <div className="admin-content">
      <div className="admin-header">
        <h2>Gerenciamento de Banners</h2>
        <Button variant="secondary" onClick={() => navigate('/admin')}>Voltar</Button>
      </div>

      {/* Notificação */}
      {notification && (
        <Notification 
          message={notification.message} 
          type={notification.type} 
          onClose={() => setNotification(null)} 
        />
      )}

      {/* Abas para escolher tipo de banner */}
      <div className="admin-tabs">
        <Button 
          variant={activeTab === 'static' ? 'primary' : 'secondary'}
          onClick={() => setActiveTab('static')}
        >
          Banner Estático
        </Button>
        <Button 
          variant={activeTab === 'carousel' ? 'primary' : 'secondary'}
          onClick={() => setActiveTab('carousel')}
        >
          Banner de Carrossel
        </Button>
      </div>

      {/* Formulário de criação/edição */}
      <div id="banner-form" className="form-container">
        {activeTab === 'static' ? (
          <Formik
            initialValues={{
              id: '',
              title: '',
              description: '',
              image: '',
              alt: '',
              tempImage: null as string | null
            }}
            validationSchema={staticSchema}
            onSubmit={saveBanner}
          >
            {({ setFieldValue, values, isSubmitting }) => (
              <div className="crud-form">
                <Form placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                  <h3>Criar/Editar Banner Estático</h3>
                  
                  <FormField 
                    label="Título *" 
                    name="title" 
                    placeholder="Título do banner"
                    error={<ErrorMessage name="title" />}
                  />

                  <FormField 
                    label="Descrição" 
                    name="description" 
                    as="textarea"
                    placeholder="Descrição do banner"
                  />

                  <div className="form-group">
                    <label htmlFor="image">Imagem *</label>
                    <input
                      id="image"
                      name="image"
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageUpload(e, setFieldValue, 'static', values)}
                    />
                    <ErrorMessage name="image" component="div" className="error-message" />
                    {(values.tempImage || values.image) && (
                      <div className="image-preview">
                        <img 
                          src={values.tempImage || values.image} 
                          alt="Pré-visualização" 
                        />
                      </div>
                    )}
                  </div>

                  <FormField 
                    label="Texto Alternativo *" 
                    name="alt" 
                    placeholder="Texto para acessibilidade"
                    error={<ErrorMessage name="alt" />}
                  />

                  <div className="form-actions">
                    <Button type="reset" variant="secondary">Limpar</Button>
                    <Button 
                      type="submit" 
                      variant="primary"
                      loading={isSubmitting}
                    >
                      {values.id ? 'Atualizar' : 'Salvar'} Banner
                    </Button>
                  </div>
                </Form>
              </div>
            )}
          </Formik>
        ) : (
          <Formik
            initialValues={{
              id: '',
              title: '',
              description: '',
              images: [] as CarouselImage[],
              tempImages: [] as any[]
            }}
            validationSchema={carouselSchema}
            onSubmit={saveBanner}
          >
            {({ values, setFieldValue, isSubmitting }) => (
              <div className="crud-form">
                <Form placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                  <h3>Criar/Editar Banner de Carrossel</h3>
                  
                  <FormField 
                    label="Título *" 
                    name="title" 
                    placeholder="Título do banner"
                    error={<ErrorMessage name="title" />}
                  />

                  <FormField 
                    label="Descrição" 
                    name="description" 
                    as="textarea"
                    placeholder="Descrição do banner"
                  />

                  <div className="form-group">
                    <label>Adicionar Imagens (Máximo: 3) *</label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageUpload(e, setFieldValue, 'carousel', values)}
                      disabled={values.images.length >= 3}
                    />
                    <ErrorMessage name="images" component="div" className="error-message" />
                  </div>

                  {/* Lista de imagens do carrossel */}
                  <div className="images-list">
                    {values.tempImages.map((image, index) => (
                      <div key={`temp-image-${index}`} className="image-item">
                        <div className="image-preview">
                          <img src={image.tempSrc} alt={`Pré-visualização ${index + 1}`} />
                        </div>
                        <p>Processando imagem...</p>
                      </div>
                    ))}
                    
                    {values.images.map((image, index) => (
                      <div key={`image-${index}`} className="image-item">
                        <div className="image-preview">
                          <img src={image.src} alt={`Pré-visualização ${index + 1}`} />
                        </div>
                        <FormField 
                          label="Texto Alternativo *" 
                          name={`images[${index}].alt`}
                          placeholder="Texto para acessibilidade"
                          error={<ErrorMessage name={`images[${index}].alt`} />}
                        />
                        <FormField 
                          label="Legenda" 
                          name={`images[${index}].caption`}
                          as="textarea"
                          placeholder="Legenda da imagem"
                        >
                          <Field
                            name={`images[${index}].caption`}
                            as="textarea"
                            placeholder="Legenda da imagem"
                            maxLength={50}
                          />
                        </FormField>
                        <Button 
                          type="button"
                          variant="danger"
                          onClick={() => {
                            const newImages = [...values.images];
                            newImages.splice(index, 1);
                            setFieldValue('images', newImages);
                          }}
                        >
                          Remover Imagem
                        </Button>
                      </div>
                    ))}
                  </div>

                  <div className="form-actions">
                    <Button type="reset" variant="secondary">Limpar</Button>
                    <Button 
                      type="submit" 
                      variant="primary"
                      disabled={values.images.length === 0}
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
        
        {banners.length === 0 ? (
          <p>Nenhum banner cadastrado ainda.</p>
        ) : (
          <div className="banners-grid">
            {currentBanners.map(banner => (
              <Card key={`banner-${banner.id}`} className="banner-item">
                <h4>{banner.title}</h4>
                <p className="banner-type">
                  Tipo: {banner.type === 'static' ? 'Estático' : 'Carrossel'}
                </p>
                
                {/* Pré-visualização do banner */}
                {banner.type === 'static' ? (
                  <div className="image-preview">
                    <img src={banner.images[0].src} alt={banner.images[0].alt} />
                  </div>
                ) : (
                  <div className="carousel-preview">
                    {banner.images.slice(0, 2).map((img, idx) => (
                      <img key={idx} src={img.src} alt={img.alt} />
                    ))}
                    {banner.images.length > 2 && (
                      <span>+{banner.images.length - 2} mais</span>
                    )}
                  </div>
                )}
                
                {/* Ações do banner */}
                <div className="banner-actions">
                  <Button 
                    variant="secondary"
                    onClick={() => editBanner(banner)}
                  >
                    Editar
                  </Button>
                  <Button 
                    variant="danger"
                    onClick={() => deleteBanner(banner.id)}
                  >
                    Excluir
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* Paginação */}
        {banners.length > bannersPerPage && (
          <div className="pagination">
            <Button 
              variant="secondary" 
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              Anterior
            </Button>
            
            <span>Página {currentPage} de {totalPages}</span>
            
            <Button 
              variant="secondary" 
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
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
const ReportsPage: React.FC = () => {
  const navigate = useNavigate();
  // Dados mockados de relatórios
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
        <Button variant="secondary" onClick={() => navigate('/admin')}>Voltar</Button>
      </div>

      {/* Grid de relatórios */}
      <div className="reports-grid">
        {reports.map(report => (
          <Card key={report.id} className="report-card">
            <h3>{report.title}</h3>
            <p>{report.data}</p>
            <div className="report-footer">
              <span>Gerado em: {new Date(report.createdAt).toLocaleDateString()}</span>
              <Button variant="secondary">Exportar</Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

// Página de login administrativo
const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  // Validação simples de login
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const email = form.email.value;
    const password = form.password.value;

    // Credenciais fixas (apenas para demonstração)
    if (email === 'admin@example.com' && password === 'admin123') {
      localStorage.setItem('isAuthenticated', 'true');
      navigate('/admin');
    } else {
      setError('Credenciais inválidas. Tente novamente.');
    }
  };

  return (
    <div className="login-container">
      <Card className="login-card">
        <h2>Login Administrativo</h2>
        {error && <Notification message={error} type="error" />}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">E-mail</label>
            <input 
              type="email" 
              id="email" 
              name="email" 
              required 
              placeholder="admin@example.com" 
              aria-required="true"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Senha</label>
            <input 
              type="password" 
              id="password" 
              name="password" 
              required 
              placeholder="••••••••" 
              aria-required="true"
            />
          </div>
          <Button type="submit" variant="primary" className="login-button">
            Entrar
          </Button>
        </form>
      </Card>
    </div>
  );
};

// Layout principal do site
const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const navigate = useNavigate();
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';

  return (
    <div id="root">
      {/* CABEÇALHO REMOVIDO COMPLETAMENTE */}
      
      {/* Conteúdo principal */}
      {children}

      {/* Rodapé */}
      <footer className="footer">
        <p>© {new Date().getFullYear()} Minecraft. Todos os direitos reservados.</p>
        <p>Desenvolvido com <span style={{ color: '#ef4444' }}>♥</span> para aprendizado</p>
        
        {!isAuthenticated && (
          <div className="footer-admin-link">
            <Button 
              variant="secondary" 
              onClick={() => navigate('/login')}
              className="admin-access-button"
            >
              Acesso Administrativo
            </Button>
          </div>
        )}
      </footer>
    </div>
  );
};

// Layout do painel administrativo
const AdminLayout: React.FC = () => {
  const navigate = useNavigate();
  // Verifica autenticação
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';

  // Se não autenticado, redireciona para login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="admin-layout">
      {/* Sidebar de navegação */}
      <aside className="admin-sidebar">
        <h3>Painel Admin</h3>
        <nav>
          <ul>
            <li><button onClick={() => navigate('/admin')}>Dashboard</button></li>
            <li><button onClick={() => navigate('/admin/banners')}>Banners</button></li>
            <li><button onClick={() => navigate('/admin/reports')}>Relatórios</button></li>
            <li><button onClick={() => navigate('/')}>Voltar ao Site</button></li>
          </ul>
        </nav>
      </aside>
      
      {/* Conteúdo principal do admin */}
      <main className="admin-main">
        <Outlet /> {/* Renderiza as rotas filhas */}
      </main>
    </div>
  );
};

/**
 * COMPONENTE PRINCIPAL DA APLICAÇÃO
 * Define todas as rotas do sistema
 */
const App: React.FC = () => {
  return (
    <Routes>
      {/* Rota principal */}
      <Route path="/" element={<Layout><HomePage /></Layout>} />
      
      {/* Rota de login */}
      <Route path="/login" element={<LoginPage />} />
      
      {/* Rotas do painel administrativo (aninhadas) */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<AdminDashboard />} />
        <Route path="banners" element={<BannerManager />} />
        <Route path="reports" element={<ReportsPage />} />
      </Route>
    </Routes>
  );
};

export default App;