
import React, { useState, useEffect } from 'react';
import { WhatsAppButton } from './WhatsAppButton';
import { createWhatsAppLink } from '../constants';
import logoRetangular from '../assets/logo-retangular.png';

const MenuIcon: React.FC<{className?: string}> = ({className}) => (
    <svg className={className} stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"></path></svg>
);

const CloseIcon: React.FC<{className?: string}> = ({className}) => (
    <svg className={className} stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path></svg>
);


const Header: React.FC<{ navigateTo: (page: string, landId?: number) => void }> = ({ navigateTo }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };
  
  const navigateAndScroll = (sectionId: string) => {
    navigateTo('home');
    // Adiciona um pequeno atraso para garantir que a página inicial seja renderizada antes de rolar
    setTimeout(() => {
      scrollTo(sectionId);
    }, 100);
  };


  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : 'unset';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  return (
    <>
      <header className="bg-white/90 backdrop-blur-lg sticky top-0 z-50 shadow-md">
        <div className="container mx-auto px-6 py-3 md:py-4 flex justify-between items-center">
          <a onClick={() => navigateTo('home')} className="cursor-pointer select-none inline-flex items-center focus:outline-none focus:ring-2 focus:ring-emerald-400 rounded-md" aria-label="Ir para a página inicial">
            <img
              src={logoRetangular}
              alt="Mota Barbosa Serviços"
              className="h-9 w-auto md:h-11 lg:h-12 transition-transform duration-300 hover:scale-[1.02]"
              loading="eager"
              decoding="async"
            />
          </a>
          <nav className="hidden md:flex items-center space-x-8">
            <a onClick={() => navigateAndScroll('services')} className="text-slate-600 hover:text-emerald-600 transition-colors cursor-pointer font-medium">Serviços</a>
            <a onClick={() => navigateAndScroll('about')} className="text-slate-600 hover:text-emerald-600 transition-colors cursor-pointer font-medium">Sobre Nós</a>
            <a onClick={() => navigateAndScroll('land-sales')} className="text-slate-600 hover:text-emerald-600 transition-colors cursor-pointer font-medium">Venda de Terrenos</a>
          </nav>
          <div className="hidden md:block">
            <WhatsAppButton text="Orçamento Rápido" href={createWhatsAppLink('general')} />
          </div>
          <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-slate-800 focus:outline-none" aria-label="Abrir menu">
              <MenuIcon className="w-7 h-7" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <div className={`fixed inset-0 bg-slate-900 bg-opacity-95 z-50 transform ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300 ease-in-out md:hidden`}>
        <div className="flex justify-end p-6">
           <button onClick={() => setIsMenuOpen(false)} className="text-white focus:outline-none" aria-label="Fechar menu">
              <CloseIcon className="w-8 h-8"/>
            </button>
        </div>
        <nav className="flex flex-col items-center justify-center h-full -mt-16 space-y-8">
          <a onClick={() => navigateAndScroll('services')} className="text-white text-2xl font-semibold hover:text-emerald-400 transition-colors cursor-pointer">Serviços</a>
          <a onClick={() => navigateAndScroll('about')} className="text-white text-2xl font-semibold hover:text-emerald-400 transition-colors cursor-pointer">Sobre Nós</a>
          <a onClick={() => navigateAndScroll('land-sales')} className="text-white text-2xl font-semibold hover:text-emerald-400 transition-colors cursor-pointer">Venda de Terrenos</a>
          <div className="mt-4">
            <WhatsAppButton text="Orçamento Rápido" href={createWhatsAppLink('general')} size="large" />
          </div>
        </nav>
      </div>
    </>
  );
};

export default Header;