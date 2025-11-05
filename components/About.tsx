
import React, { useState, useEffect, useRef } from 'react';

const CheckCircleIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

const About: React.FC = () => {
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
      id="about" 
      ref={sectionRef} 
      className={`py-20 bg-slate-50 transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
    >
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="order-2 lg:order-1">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">Especialistas em Limpeza de Terreno e Poda de Árvores</h2>
              <p className="text-slate-600 mb-8 leading-relaxed text-base md:text-lg">
                Com anos de experiência em limpeza de terreno, poda de árvores, e manutenção de pousadas e casas de praia, a Mota Barbosa Serviços é sua parceira de confiança. Nossa prioridade é sua tranquilidade, seja preparando seu imóvel para a alta temporada ou para receber a família, garantindo um resultado que encanta.
              </p>
              <ul className="space-y-5">
                <li className="flex items-start">
                  <CheckCircleIcon className="w-7 h-7 text-emerald-500 mr-4 flex-shrink-0 mt-1" />
                  <span className="text-slate-700 text-base leading-relaxed md:text-lg"><strong>Excelência em Cada Detalhe:</strong> Investimos em equipamentos modernos e profissionais qualificados para garantir um acabamento superior.</span>
                </li>
                <li className="flex items-start">
                  <CheckCircleIcon className="w-7 h-7 text-emerald-500 mr-4 flex-shrink-0 mt-1" />
                  <span className="text-slate-700 text-base leading-relaxed md:text-lg"><strong>Seu Tempo é Precioso:</strong> Cumprimos o que prometemos. Respeitamos o cronograma à risca para que você possa se planejar sem surpresas.</span>
                </li>
                <li className="flex items-start">
                  <CheckCircleIcon className="w-7 h-7 text-emerald-500 mr-4 flex-shrink-0 mt-1" />
                  <span className="text-slate-700 text-base leading-relaxed md:text-lg"><strong>Negociação Clara e Justa:</strong> Você recebe um orçamento detalhado, sem taxas escondidas, para tomar a melhor decisão com segurança.</span>
                </li>
                <li className="flex items-start">
                  <CheckCircleIcon className="w-7 h-7 text-emerald-500 mr-4 flex-shrink-0 mt-1" />
                  <span className="text-slate-700 text-base leading-relaxed md:text-lg"><strong>Sua Satisfação é o Nosso Sucesso:</strong> Nosso trabalho só termina quando você está 100% satisfeito.</span>
                </li>
              </ul>
            </div>
             <div className="order-1 lg:order-2">
                <img 
                    src="https://ireland.apollo.olxcdn.com/v1/files/46zcmde5v0f2-PT/image" 
                    alt="Equipe Mota Barbosa Serviços em ação" 
                    className="rounded-xl shadow-xl w-full h-auto object-cover"
                />
            </div>
        </div>
      </div>
    </section>
  );
};

export default About;