// src/pages/BannerManager.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, type FormikHelpers } from 'formik';
import * as Yup from 'yup';

// Importa os componentes de UI
import { FormField, Button, Card, Notification } from '../ui';

// Importa as interfaces
import { Banner, CarouselImage, BackendBanner } from '../types';

// Importa a configuração da API
import { API_BASE_URL } from '../config';

const BannerManager: React.FC = () => {
  const navigate = useNavigate();
  const [banners, setBanners] = useState<Banner[]>([]);
  const [activeTab, setActiveTab] = useState<'static' | 'carousel'>('static');
  const [notification, setNotification] = useState<{ message: string, type: 'success' | 'error' | 'info' } | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const bannersPerPage = 5;

  const [editingBanner, setEditingBanner] = useState<Banner | null>(null);

  useEffect(() => {
    fetchBanners();
  }, []);

  const showNotification = (message: string, type: 'success' | 'error' | 'info') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 5000);
  };

  const fetchBanners = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/banners`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const backendBanners: BackendBanner[] = await response.json();
      
      const mappedBanners: Banner[] = backendBanners.map(b => ({
        id: b.id?.toString() || Date.now().toString(),
        type: b.type as 'static' | 'carousel',
        title: b.title,
        description: b.description || '',
        images: b.images.map(src => ({
            src: src,
            alt: b.title,
            caption: b.description || ''
        }))
      }));
      setBanners(mappedBanners);
    } catch (error) {
      console.error('Erro ao buscar banners:', error);
      showNotification('Erro ao carregar banners.', 'error');
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, setFieldValue: (field: string, value: any) => void, type: 'static' | 'carousel', values: any) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.match('image.*')) {
        showNotification('Por favor, selecione um arquivo de imagem', 'error');
        return;
    }
    if (file.size > 2 * 1024 * 1024) {
        showNotification('Imagem muito grande (máximo 2MB)', 'error');
        return;
    }
    const reader = new FileReader();
    reader.onload = (event) => {
        if (type === 'static') {
            setFieldValue('image', event.target?.result as string);
        } else {
            const newImageSrc = event.target?.result as string;
            const newImage: CarouselImage = { src: newImageSrc, alt: '', caption: '' };
            setFieldValue('images', [...values.images, newImage]);
        }
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  const saveBanner = async (values: any, { resetForm, setSubmitting }: FormikHelpers<any>) => {
    setSubmitting(true);
    try {
      let backendBanner: BackendBanner;
      let method: 'POST' | 'PUT';
      let url: string;

      let imagesForBackend: string[];
      if (activeTab === 'static') {
        imagesForBackend = [values.image];
      } else {
        imagesForBackend = values.images.map((img: CarouselImage) => img.src);
      }

      backendBanner = {
        type: activeTab,
        title: values.title,
        description: values.description || null,
        images: imagesForBackend,
      };

      if (values.id) {
        method = 'PUT';
        url = `${API_BASE_URL}/banners/${values.id}`;
        backendBanner.id = parseInt(values.id);
      } else {
        method = 'POST';
        url = `${API_BASE_URL}/banners`;
      }

      const response = await fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(backendBanner),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      await fetchBanners();
      
      resetForm();
      setEditingBanner(null);
      showNotification(`Banner ${values.id ? 'atualizado' : 'salvo'} com sucesso!`, 'success');
    } catch (error: any) {
      console.error('Erro ao salvar banner:', error);
      showNotification(`Erro ao salvar banner: ${error.message}`, 'error');
    } finally {
      setSubmitting(false);
    }
  };

  const editBanner = (banner: Banner) => {
    setActiveTab(banner.type);
    setEditingBanner(banner);
    setTimeout(() => {
      document.getElementById('banner-form')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const deleteBanner = async (id: string) => {
    if (window.confirm('Tem certeza que deseja excluir este banner?')) {
      try {
        const response = await fetch(`${API_BASE_URL}/banners/${id}`, {
          method: 'DELETE',
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
        }

        await fetchBanners();
        showNotification('Banner removido com sucesso!', 'success');
      } catch (error: any) {
        console.error('Erro ao deletar banner:', error);
        showNotification(`Erro ao deletar banner: ${error.message}`, 'error');
      }
    }
  };

  const handleReset = (resetForm: () => void) => {
    resetForm();
    setEditingBanner(null);
  }

  const initialStaticValues = editingBanner && editingBanner.type === 'static' ? {
    id: editingBanner.id,
    title: editingBanner.title,
    description: editingBanner.description,
    image: editingBanner.images[0]?.src || '',
    alt: editingBanner.images[0]?.alt || '',
  } : {
    id: '',
    title: '',
    description: '',
    image: '',
    alt: ''
  };

  const initialCarouselValues = editingBanner && editingBanner.type === 'carousel' ? {
    id: editingBanner.id,
    title: editingBanner.title,
    description: editingBanner.description,
    images: editingBanner.images,
  } : {
    id: '',
    title: '',
    description: '',
    images: [],
  };

  const staticSchema = Yup.object().shape({
    title: Yup.string().required('Título é obrigatório'),
    description: Yup.string(),
    image: Yup.string().required('Imagem é obrigatória'),
    alt: Yup.string().required('Texto alternativo é obrigatório')
  });

  const carouselSchema = Yup.object().shape({
    title: Yup.string().required('Título é obrigatório'),
    description: Yup.string(),
    images: Yup.array()
      .of(
        Yup.object().shape({
          src: Yup.string().required('URL da imagem é obrigatória'),
          alt: Yup.string().required('Texto alternativo é obrigatório para cada imagem'),
          caption: Yup.string()
        })
      )
      .min(1, 'Pelo menos uma imagem é necessária')
      .max(3, 'Máximo de 3 imagens')
  });

  const indexOfLastBanner = currentPage * bannersPerPage;
  const indexOfFirstBanner = indexOfLastBanner - bannersPerPage;
  const currentBanners = banners.slice(indexOfFirstBanner, indexOfLastBanner);
  const totalPages = Math.ceil(banners.length / bannersPerPage);

  return (
    <div className="admin-content">
      <div className="admin-header">
        <h2>Gerenciamento de Banners</h2>
        <Button variant="secondary" onClick={() => navigate('/adm')}>Voltar</Button>
      </div>

      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)}
        />
      )}

      <div className="admin-tabs">
        <Button
          variant={activeTab === 'static' ? 'primary' : 'secondary'}
          onClick={() => { setActiveTab('static'); setEditingBanner(null); }}
        >
          Banner Estático
        </Button>
        <Button
          variant={activeTab === 'carousel' ? 'primary' : 'secondary'}
          onClick={() => { setActiveTab('carousel'); setEditingBanner(null); }}
        >
          Banner de Carrossel
        </Button>
      </div>

      <div id="banner-form" className="form-container">
        {activeTab === 'static' ? (
          <Formik
            initialValues={initialStaticValues}
            validationSchema={staticSchema}
            onSubmit={saveBanner}
            enableReinitialize
          >
            {({ setFieldValue, values, isSubmitting, resetForm }) => (
              <div className="crud-form">
                <Form placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                  <h3>{editingBanner ? 'Editar' : 'Criar'} Banner Estático</h3>
                  <FormField label="Título *" name="title" placeholder="Título do banner" />
                  <FormField label="Descrição" name="description" as="textarea" placeholder="Descrição do banner" />
                  <div className="form-group">
                    <label htmlFor="image">Imagem *</label>
                    <input
                      id="image"
                      name="image"
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageUpload(e, setFieldValue, 'static', values)}
                    />
                    {values.image && (
                      <div className="image-preview">
                        <img src={values.image} alt="Pré-visualização" />
                      </div>
                    )}
                  </div>
                  <FormField label="Texto Alternativo *" name="alt" placeholder="Texto para acessibilidade" />
                  <div className="form-actions">
                    <Button type="button" variant="secondary" onClick={() => handleReset(resetForm)}>Limpar</Button>
                    <Button type="submit" variant="primary" loading={isSubmitting}>
                      {editingBanner ? 'Atualizar' : 'Salvar'} Banner
                    </Button>
                  </div>
                </Form>
              </div>
            )}
          </Formik>
        ) : (
          <Formik
            initialValues={initialCarouselValues}
            validationSchema={carouselSchema}
            onSubmit={saveBanner}
            enableReinitialize
          >
            {({ values, setFieldValue, isSubmitting, resetForm }) => (
              <div className="crud-form">
                <Form placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                  <h3>{editingBanner ? 'Editar' : 'Criar'} Banner de Carrossel</h3>
                  <FormField label="Título *" name="title" placeholder="Título do banner" />
                  <FormField label="Descrição" name="description" as="textarea" placeholder="Descrição do banner" />
                  <div className="form-group">
                    <label>Adicionar Imagens (Máximo: 3) *</label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageUpload(e, setFieldValue, 'carousel', values)}
                      disabled={values.images.length >= 3}
                    />
                  </div>
                  <div className="images-list">
                    {values.images.map((image: { src: string | undefined; }, index: number) => (
                      <div key={`image-${index}`} className="image-item">
                        <div className="image-preview">
                          <img src={image.src} alt={`Pré-visualização ${index + 1}`} />
                        </div>
                        <FormField
                          label="Texto Alternativo *"
                          name={`images[${index}].alt`}
                          placeholder="Texto para acessibilidade"
                        />
                        <FormField
                          label="Legenda"
                          name={`images[${index}].caption`}
                          as="textarea"
                          placeholder="Legenda da imagem"
                        />
                        <Button
                          type="button"
                          variant="danger"
                          onClick={() => {
                            const newImages = [...values.images];
                            newImages.splice(index, 1);
                            setFieldValue('images', newImages);
                          }}
                        >
                          Remover
                        </Button>
                      </div>
                    ))}
                  </div>
                  <div className="form-actions">
                    <Button type="button" variant="secondary" onClick={() => handleReset(resetForm)}>Limpar</Button>
                    <Button
                      type="submit"
                      variant="primary"
                      disabled={values.images.length === 0}
                      loading={isSubmitting}
                    >
                      {editingBanner ? 'Atualizar' : 'Salvar'} Banner
                    </Button>
                  </div>
                </Form>
              </div>
            )}  
          </Formik>
        )}
      </div>

      <div className="banners-list">
        <h3>Banners Cadastrados</h3>
        {banners.length === 0 ? (
          <p>Nenhum banner cadastrado ainda.</p>
        ) : (
          <>
            <div className="banners-grid">
              {currentBanners.map(banner => (
                <Card key={`banner-${banner.id}`} className="banner-item">
                  <h4>{banner.title}</h4>
                  <p className="banner-type">Tipo: {banner.type === 'static' ? 'Estático' : 'Carrossel'}</p>
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
                  <div className="banner-actions">
                    <Button variant="secondary" onClick={() => editBanner(banner)}>Editar</Button>
                    <Button variant="danger" onClick={() => deleteBanner(banner.id)}>Excluir</Button>
                  </div>
                </Card>
              ))}
            </div>
            {banners.length > bannersPerPage && (
              <div className="pagination">
                <Button onClick={() => setCurrentPage(p => Math.max(p - 1, 1))} disabled={currentPage === 1}>Anterior</Button>
                <span>Página {currentPage} de {totalPages}</span>
                <Button onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))} disabled={currentPage === totalPages}>Próxima</Button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default BannerManager;