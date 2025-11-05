
import React, { useState, useEffect } from 'react';
import { WhatsAppButton } from './WhatsAppButton';
import { WHATSAPP_LINK } from '../constants';

const Hero: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <section 
      className="relative bg-cover bg-center py-28 md:py-48 text-white overflow-hidden"
      style={{ backgroundImage: "url('https://www.eparaguacu.sp.gov.br/admin/globalarq/noticia/noticia/651_366/ab8fd0abd3eca4c28f3a7b8bd7be2e6f.jpeg')" }}
    >
      <div className="absolute inset-0 bg-black/60"></div>
      <div className="container mx-auto px-6 text-center relative z-10">
        <h2 
          className={`text-4xl md:text-6xl font-extrabold leading-tight mb-4 tracking-tight transition-all duration-700 ease-out ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-5'}`} 
          style={{textShadow: '0 2px 6px rgba(0,0,0,0.7)'}}
        >
          Valorize seu Patrimônio Agora.<br /> Cuidamos da Limpeza de Terreno e Poda de Árvores.
        </h2>
        <p 
          className={`text-lg md:text-xl max-w-3xl mx-auto mb-8 text-slate-100 transition-all duration-700 ease-out delay-200 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-5'}`}
        >
          Seja para a manutenção de pousada, manutenção de casa de praia ou a completa limpeza de terreno, nossa equipe garante um serviço impecável, deixando seu espaço seguro e pronto para o futuro.
        </p>
        <div className={`transition-all duration-700 ease-out delay-300 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
          <WhatsAppButton text="Solicitar Orçamento Gratuito" href={WHATSAPP_LINK} size="large" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
