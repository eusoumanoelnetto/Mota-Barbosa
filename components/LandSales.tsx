
import React, { useState, useEffect, useRef } from 'react';
import { LandCard } from './LandCard';
import { LandListing } from '../types';
import { WhatsAppButton } from './WhatsAppButton';
import { createWhatsAppLink } from '../constants';

const LandSales: React.FC<{ landListings: LandListing[], navigateTo: (page: string, landId?: number) => void }> = ({ landListings, navigateTo }) => {
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

  const featuredListings = landListings.slice(0, 4);

  return (
    <section 
      id="land-sales" 
      ref={sectionRef} 
      className={`py-20 bg-slate-50 transition-all duration-700 ease-out ${isVisible ? 'opacity-100' : 'opacity-0 -translate-y-8'}`}
    >
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900">Oportunidades de Terrenos à Venda</h2>
          <p className="text-lg text-slate-600 mt-4 max-w-3xl mx-auto">
            Além dos serviços de limpeza, também conectamos você ao terreno dos seus sonhos. Explore algumas de nossas melhores ofertas.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredListings.map((listing, index) => (
            <div 
              key={listing.id}
              className={`transition-all duration-500 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              style={{ transitionDelay: `${index * 100}ms`}}
            >
                <LandCard listing={listing} navigateTo={navigateTo} />
            </div>
          ))}
        </div>
        <div className="mt-16 text-center flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button 
            onClick={() => navigateTo('all-lands')} 
            className="bg-slate-800 text-white font-bold py-3 px-8 rounded-full hover:bg-slate-900 transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            Ver Todos os Terrenos
          </button>
          <WhatsAppButton 
            text="Falar sobre Terrenos" 
            href={createWhatsAppLink('landSales')}
            size="normal"
          />
        </div>
      </div>
    </section>
  );
};

export default LandSales;
