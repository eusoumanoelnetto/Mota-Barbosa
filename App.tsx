
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import About from './components/About';
import Gallery from './components/Gallery';
import LandSales from './components/LandSales';
import CTA from './components/CTA';
import Footer from './components/Footer';
import Toast from './components/Toast';
import AllLandsPage from './pages/AllLands';
import LandDetailsPage from './pages/LandDetails';
import AdminPage from './pages/AdminPage';
import LandForm from './pages/LandForm';
import { initialLandListings } from './data/initialLands';
import { LandListing } from './types';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedLandId, setSelectedLandId] = useState<number | null>(null);
  const [editingLand, setEditingLand] = useState<LandListing | null>(null);
  const [landListings, setLandListings] = useState<LandListing[]>([]);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);

  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'info') => {
    setToast({ message, type });
  };

  // Função utilitária para garantir estrutura consistente em LandListing
  function sanitizeLand(l: any): LandListing {
    const imagesArr = Array.isArray(l?.images) ? l.images.filter(Boolean) : (l?.imageUrl ? [l.imageUrl] : []);
    const tagsArr = Array.isArray(l?.tags) ? l.tags : (typeof l?.tags === 'string' ? l.tags.split(',').map((s: string) => s.trim()).filter(Boolean) : []);
    const featuresArr = Array.isArray(l?.features) ? l.features : (typeof l?.features === 'string' ? l.features.split(',').map((s: string) => s.trim()).filter(Boolean) : []);
    return {
      id: typeof l?.id === 'number' ? l.id : Date.now() + Math.floor(Math.random() * 1000),
      imageUrl: typeof l?.imageUrl === 'string' ? l.imageUrl : (imagesArr[0] || ''),
      title: l?.title ?? '',
      location: l?.location ?? '',
      fullAddress: l?.fullAddress ?? '',
      price: l?.price ?? '',
      tags: tagsArr,
      features: featuresArr,
      description: l?.description ?? '',
      area: l?.area ?? '',
      solarPosition: l?.solarPosition ?? '',
      propertyType: l?.propertyType ?? '',
      images: imagesArr,
      code: (l?.code ?? '').toString(),
    };
  }

  // Carregar dados do localStorage ou usar dados iniciais
  useEffect(() => {
    try {
      const storedLands = localStorage.getItem('landListings');
      if (storedLands) {
        const parsed = JSON.parse(storedLands);
        const sanitized = Array.isArray(parsed) ? parsed.map(sanitizeLand) : [];
        setLandListings(sanitized);
      } else {
        const sanitizedInitial = initialLandListings.map(sanitizeLand);
        setLandListings(sanitizedInitial);
        localStorage.setItem('landListings', JSON.stringify(sanitizedInitial));
      }
    } catch (error) {
      console.error("Failed to load lands from localStorage", error);
      const sanitizedInitial = initialLandListings.map(sanitizeLand);
      setLandListings(sanitizedInitial);
    }
  }, []);

  

  const updateAndStoreLands = (newList: LandListing[]) => {
    setLandListings(newList);
    localStorage.setItem('landListings', JSON.stringify(newList));
  };


  const navigateTo = (page: string, landId?: number) => {
    setCurrentPage(page);
    setSelectedLandId(landId || null);
    setEditingLand(null);
    window.scrollTo(0, 0);
  };

  const handleAdminAccess = () => {
    // Abrir diretamente o formulário para cadastrar terreno
    setEditingLand(null);
    setCurrentPage('land-form');
    window.scrollTo(0, 0);
  };
  
  // Funções CRUD para terrenos
  const handleAddLand = (newLand: Omit<LandListing, 'id'>) => {
    // validação: código do imóvel deve ser único
    const newCode = (newLand as any).code?.toString().trim().toLowerCase();
    if (newCode && landListings.some(l => l.code.trim().toLowerCase() === newCode)) {
      showToast('Já existe um terreno com este código. Use um código único.', 'error');
      return;
    }
    const landWithId = { ...newLand, id: Date.now() };
    updateAndStoreLands([...landListings, landWithId]);
    showToast('Terreno cadastrado com sucesso!', 'success');
    navigateTo('all-lands');
  };

  const handleUpdateLand = (updatedLand: LandListing) => {
    // validação: impedir duplicidade de código em outro registro
    const updatedCode = updatedLand.code?.toString().trim().toLowerCase();
    if (updatedCode && landListings.some(l => l.id !== updatedLand.id && l.code.trim().toLowerCase() === updatedCode)) {
      showToast('Já existe outro terreno com este código. Altere o código para continuar.', 'error');
      return;
    }
    const updatedList = landListings.map(land =>
      land.id === updatedLand.id ? updatedLand : land
    );
    updateAndStoreLands(updatedList);
    showToast('Terreno atualizado com sucesso!', 'success');
    navigateTo('all-lands');
  };

  const handleDeleteLand = (landId: number) => {
    if (window.confirm("Tem certeza que deseja excluir este terreno?")) {
        const updatedList = landListings.filter(land => land.id !== landId);
        updateAndStoreLands(updatedList);
    }
  };

  // Resetar dados para o estado inicial (sanitizado)
  const handleResetData = () => {
    if (!window.confirm('Tem certeza que deseja resetar os dados? Esta ação irá substituir a lista atual pelos dados iniciais.')) {
      return;
    }
    const sanitizedInitial = initialLandListings.map(sanitizeLand);
    updateAndStoreLands(sanitizedInitial);
    showToast('Dados resetados para o padrão inicial.', 'info');
    navigateTo('all-lands');
  };

  const openLandFormForEdit = (landId: number) => {
    const landToEdit = landListings.find(land => land.id === landId);
    if (landToEdit) {
      setEditingLand(landToEdit);
      setCurrentPage('land-form');
    }
  };
  
   const openLandFormForAdd = () => {
    setEditingLand(null);
    setCurrentPage('land-form');
  };


  const renderPage = () => {
    switch (currentPage) {
      case 'all-lands':
        return <AllLandsPage landListings={landListings} navigateTo={navigateTo} />;
      case 'land-details':
        if (selectedLandId) {
          return <LandDetailsPage landListings={landListings} landId={selectedLandId} navigateTo={navigateTo} />;
        }
        navigateTo('home');
        return null;
  case 'admin':
        return <AdminPage 
            landListings={landListings} 
            onAdd={openLandFormForAdd} 
            onEdit={openLandFormForEdit}
            onDelete={handleDeleteLand}
    onReset={handleResetData}
            navigateTo={navigateTo} 
        />;
      case 'land-form':
        return <LandForm 
            onSubmit={editingLand ? handleUpdateLand : handleAddLand}
            onCancel={() => navigateTo('admin')}
            initialData={editingLand}
        />;
      case 'home':
      default:
        return (
          <main>
            <Hero />
            <Services />
            <About />
            <Gallery />
            <LandSales landListings={landListings} navigateTo={navigateTo} />
            <CTA />
          </main>
        );
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen text-slate-800 font-sans">
      {/* Toasts */}
      <div className="fixed top-4 right-4 z-50 pointer-events-none">
        {toast && (
          <Toast
            message={toast.message}
            type={toast.type}
            onClose={() => setToast(null)}
          />
        )}
      </div>
      <Header navigateTo={navigateTo} />
      {renderPage()}
      <Footer onAdminClick={handleAdminAccess} navigateTo={navigateTo} />
    </div>
  );
};

export default App;
