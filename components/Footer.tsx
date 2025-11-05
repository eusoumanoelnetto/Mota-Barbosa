
import React from 'react';
import { WHATSAPP_LINK, WHATSAPP_PHONE_NUMBER } from '../constants';

interface FooterProps {
  onAdminClick: () => void;
  navigateTo: (page: string) => void;
}


const Footer: React.FC<FooterProps> = ({ onAdminClick, navigateTo }) => {
  const currentYear = new Date().getFullYear();

  const navigateAndScroll = (sectionId: string) => {
    navigateTo('home');
    // Adiciona um pequeno atraso para garantir que a página inicial seja renderizada antes de rolar
    setTimeout(() => {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <footer className="bg-slate-900 text-slate-400">
      {/* Main footer content */}
      <div className="container mx-auto px-6 py-20 md:py-24">
        {/* Logo grande e centralizada */}
        <div className="w-full mb-10 md:mb-12">
          <button
            onClick={() => { navigateTo('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className="group block mx-auto focus:outline-none focus:ring-2 focus:ring-emerald-400 rounded-md"
            aria-label="Ir para o topo"
            title="Voltar ao topo"
          >
            <picture>
              <source media="(min-width: 1024px)" srcSet="/assets/logo-retangular.png" />
              <img
                src="/assets/logo-grande.png"
                alt="Mota Barbosa Serviços"
                className="mx-auto h-32 md:h-44 lg:h-56 w-auto transition-transform duration-300 group-hover:scale-[1.02]"
                style={{ objectFit: 'contain' }}
                loading="lazy"
                decoding="async"
                sizes="(min-width: 1024px) 600px, 320px"
              />
            </picture>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left items-start">
          
          {/* Column 1: About */}
          <div className="space-y-4 md:text-left text-center md:pr-6">
            <p className="text-base md:text-sm text-slate-300 max-w-3xl mx-auto md:mx-0">
              Especialistas em limpeza de terreno, poda de árvores e manutenção. Valorizamos seu patrimônio com profissionalismo e dedicação.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Navegação Rápida</h3>
            <ul className="space-y-2 text-sm">
              <li><a onClick={() => navigateAndScroll('services')} className="hover:text-emerald-400 transition-colors cursor-pointer">Serviços</a></li>
              <li><a onClick={() => navigateAndScroll('about')} className="hover:text-emerald-400 transition-colors cursor-pointer">Sobre Nós</a></li>
              <li><a onClick={() => navigateAndScroll('land-sales')} className="hover:text-emerald-400 transition-colors cursor-pointer">Venda de Terrenos</a></li>
            </ul>
          </div>

          {/* Column 3: Contact & Social */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Contato e Redes Sociais</h3>
            <div className="flex items-center justify-center md:justify-start">
              <i className="fa fa-whatsapp fa-lg mr-3 text-emerald-400" aria-hidden="true"></i>
              <span className="font-semibold text-white">{WHATSAPP_PHONE_NUMBER}</span>
            </div>
            <div className="flex space-x-4 mt-4 justify-center md:justify-start">
              <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="text-slate-400 hover:text-emerald-400 transition-colors">
                <i className="fa fa-whatsapp fa-2x"></i>
              </a>
              <a href="#" aria-label="Instagram" className="text-slate-400 hover:text-emerald-400 transition-colors">
                <i className="fa fa-instagram fa-2x"></i>
              </a>
              <a href="#" aria-label="Facebook" className="text-slate-400 hover:text-emerald-400 transition-colors">
                <i className="fa fa-facebook fa-2x"></i>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="bg-slate-950/50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex flex-col sm:flex-row justify-between items-center text-center text-sm">
            <p className="mb-2 sm:mb-0">
              &copy; {currentYear} Mota Barbosa Serviços. Todos os direitos reservados. Feito por <a href="https://eusoumanoelnetto.github.io/apresentacao-geek/apresentacao-geek-ini/index.html" target="_blank" rel="noopener noreferrer" className="underline hover:text-emerald-400 transition-colors">Manoel Coelho</a>.
            </p>
            <button onClick={onAdminClick} className="text-slate-500 hover:text-emerald-400 transition-colors text-xs underline">
              Administração
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;