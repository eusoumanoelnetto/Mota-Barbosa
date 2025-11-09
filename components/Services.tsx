
import React, { useState, useEffect, useRef } from 'react';
import { WhatsAppButton } from './WhatsAppButton';
import { createWhatsAppLink } from '../constants';

const TreeIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
        <path d="M12 13l-2 -2"></path>
        <path d="M12 12l2 -2"></path>
        <path d="M12 21v-13"></path>
        <path d="M9.824 15.995a3 3 0 0 1 -2.743 -3.69a3 3 0 0 1 .304 -4.833a3 3 0 0 1 4.615 -3.472a3 3 0 0 1 4.614 3.472a3 3 0 0 1 .305 4.833a3 3 0 0 1 -2.744 3.69h-4z"></path>
    </svg>
);

const SparklesIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
    </svg>
);

const TagIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 6h.008v.008H6V6z" />
    </svg>
);

const CalendarIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
);

const ServiceCard: React.FC<{ icon: React.ReactNode; title: string; children: React.ReactNode; whatsappContext: 'limpezaTerreno' | 'podaArvores' | 'manutencao' | 'services' }> = ({ icon, title, children, whatsappContext }) => {
    return (
  <div className="bg-slate-50/50 p-6 rounded-none shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 flex flex-col border border-slate-200">
            <div className="flex-shrink-0 flex items-center justify-center h-12 w-12 bg-emerald-100 text-emerald-600 rounded-none mb-4">
                {icon}
            </div>
            <div className="flex-grow">
              <h3 className="text-xl font-bold text-slate-900 mb-3">{title}</h3>
              <p className="text-slate-600 leading-relaxed mb-4 line-clamp md-line-clamp-5 line-clamp-4">{children}</p>
            </div>
            <div className="mt-auto pt-2">
              <WhatsAppButton 
                text="Solicitar Orçamento" 
                href={createWhatsAppLink(whatsappContext)}
                size="normal"
              />
            </div>
        </div>
    );
}

const Services: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(sectionRef.current!);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section 
      id="services" 
      ref={sectionRef} 
      className={`py-12 md:py-16 bg-white transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
    >
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900">Nossos Serviços: Limpeza de Terreno, Poda de Árvores e Manutenção</h2>
          <p className="text-base md:text-lg text-slate-600 mt-4 max-w-3xl mx-auto">Oferecemos soluções completas, desde a poda de árvores até a limpeza de terreno para venda. Nossos serviços de manutenção de pousada e manutenção de casa de praia garantem que seu patrimônio esteja sempre impecável.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 items-stretch">
            <ServiceCard title="Poda de Árvores e Manutenção de Jardins" icon={<TreeIcon className="w-8 h-8" />} whatsappContext="podaArvores">
                Realizamos a poda de árvores profissional para garantir a segurança. Um serviço essencial para a manutenção de pousada ou casa de praia, mantendo a vegetação saudável e com um visual impecável.
            </ServiceCard>
            <ServiceCard title="Corte de grama" icon={<SparklesIcon className="w-8 h-8" />} whatsappContext="manutencao">
                Nosso serviço de corte de grama deixa sua propriedade, seja o jardim de uma pousada ou o quintal da casa de praia, com um visual limpo e bem cuidado. Ideal para a manutenção regular e para valorizar seu imóvel.
            </ServiceCard>
             <ServiceCard title="Manutenção mensal" icon={<CalendarIcon className="w-8 h-8" />} whatsappContext="manutencao">
                Com planos contínuos de manutenção de pousada e manutenção de casa de praia, seu patrimônio fica impecável o ano todo. Foco na alta temporada ou na sua tranquilidade, nós cuidamos de tudo.
            </ServiceCard>
            <ServiceCard title="Venda conosco" icon={<TagIcon className="w-8 h-8" />} whatsappContext="limpezaTerreno">
                Quer vender mais rápido? Uma limpeza de terreno profissional impressiona compradores e valoriza o imóvel. Cuidamos de tudo, desde a remoção de detritos ao suporte na negociação para acelerar seu negócio.
            </ServiceCard>
        </div>
      </div>
    </section>
  );
};

export default Services;
