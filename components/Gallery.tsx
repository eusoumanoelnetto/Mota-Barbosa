import React, { useState, useEffect, useRef } from 'react';

const galleryImages = [
  { id: 1, src: 'https://sema.portovelho.ro.gov.br/uploads/editor/images/MUTIRA%CC%83O_%20SKATE%20PARK%20-%20Leandro%20Morais%20-2%20(1).jpg', alt: 'Equipe realizando poda de árvores em área de pousada', category: 'Poda de Árvores' },
  { id: 2, src: 'https://yata-apix-00b507b4-7088-402f-b496-0f0ebc003f4f.s3-object.locaweb.com.br/a97fd17eeb3b4a49b5f422d54316f66d.jpg', alt: 'Jardim com grama recém cortada em casa de praia', category: 'Corte de grama' },
  { id: 3, src: 'https://i.ytimg.com/vi/3SRtWDs3GQI/hq720.jpg', alt: 'Profissional realizando manutenção contínua no jardim de uma pousada', category: 'Manutenção mensal' },
  { id: 4, src: 'https://www.cohabpremium.com.br/foto_thumb/2025/7064/aracaju-terreno-padrao-mosqueiro-23-10-2025_11-05-33-4.webp', alt: 'Terreno limpo e demarcado pronto para venda', category: 'Venda Conosco' }
];


const Gallery: React.FC = () => {
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
      id="gallery" 
      ref={sectionRef} 
      className={`py-20 bg-white transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
    >
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900">Galeria de Serviços</h2>
          <p className="text-lg text-slate-600 mt-4 max-w-3xl mx-auto">Veja a qualidade do nosso trabalho em ação. De podas de árvores a terrenos completamente limpos, nosso portfólio fala por si.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {galleryImages.map((image, index) => (
            <div 
              key={image.id} 
              className={`relative overflow-hidden rounded-lg shadow-lg group transform hover:scale-105 transition-all duration-300 ease-in-out ${isVisible ? 'opacity-100' : 'opacity-0'}`}
              style={{ transitionDelay: `${index * 100}ms`}}
            >
              <img src={image.src} alt={image.alt} className="w-full h-64 object-cover group-hover:opacity-90 transition-opacity" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-4">
                  <h3 className="text-white font-bold text-lg">{image.category}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
