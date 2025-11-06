
import React, { useMemo, useRef, useState, useEffect, useCallback } from 'react';
import { WhatsAppButton } from '../components/WhatsAppButton';
import { createLandWhatsAppLink, WHATSAPP_PHONE_NUMBER } from '../constants';
import { LandListing } from '../types';

// Icons for details page
const LocationIcon: React.FC<{className?: string}> = ({className}) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
);

const formatShortAddress = (fullAddress: string): string => {
  const parts = fullAddress.split(',');
  if (parts.length < 3) {
    return fullAddress;
  }
  const street = parts[0].trim();
  const city = parts[1].trim();
  const statePart = parts[2].trim();
  const stateMatch = statePart.match(/-\s*([A-Z]{2})$/);
  const state = stateMatch ? stateMatch[1] : '';

  if (state) {
    return `${street}, ${city} - ${state}`;
  }

  return `${street}, ${city}`;
};

// Formata preço para BRL com prefixo R$
const formatPriceBRL = (raw: string): string => {
  if (!raw) return 'Consultar';
  const digits = raw.toString().replace(/[^\d]/g, '');
  if (!digits) return 'Consultar';
  const num = Number(digits);
  try {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(num);
  } catch {
    return `R$ ${num.toLocaleString('pt-BR')}`;
  }
};

const LandDetailsPage: React.FC<{ landListings: LandListing[]; landId: number; navigateTo: (page: string) => void }> = ({ landListings, landId, navigateTo }) => {
  const land = landListings.find(l => l.id === landId);

  if (!land) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold">Terreno não encontrado.</h2>
        <button onClick={() => navigateTo('home')} className="mt-4 text-emerald-600 font-semibold">
          Voltar para a página inicial
        </button>
      </div>
    );
  }

  const landWhatsAppLink = createLandWhatsAppLink(land.title);
  const mapUrl = `https://maps.google.com/maps?q=${encodeURIComponent(land.fullAddress)}&t=&z=15&ie=UTF8&iwloc=&output=embed`;
  const images = useMemo(() => (Array.isArray(land.images) && land.images.length > 0) ? land.images : (land.imageUrl ? [land.imageUrl] : []), [land]);
  const imageCount = images.length;

  // Carousel state
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollerRef = useRef<HTMLDivElement | null>(null);

  const scrollToIndex = useCallback((idx: number) => {
    if (!scrollerRef.current) return;
    const container = scrollerRef.current;
    const slide = container.querySelector<HTMLDivElement>(`[data-slide="${idx}"]`);
    if (slide) {
      container.scrollTo({ left: slide.offsetLeft, behavior: 'smooth' });
    }
    setCurrentIndex(idx);
  }, []);

  const goPrev = () => scrollToIndex((currentIndex - 1 + imageCount) % imageCount);
  const goNext = () => scrollToIndex((currentIndex + 1) % imageCount);

  // Keep index in range when images change
  useEffect(() => {
    if (currentIndex >= imageCount) setCurrentIndex(0);
  }, [imageCount, currentIndex]);

  // Atualiza o índice conforme o usuário rola manualmente
  useEffect(() => {
    const container = scrollerRef.current;
    if (!container) return;
    const onScroll = () => {
      const width = container.clientWidth || 1;
      const idx = Math.round(container.scrollLeft / width);
      if (idx !== currentIndex) setCurrentIndex(Math.max(0, Math.min(imageCount - 1, idx)));
    };
    container.addEventListener('scroll', onScroll, { passive: true });
    return () => container.removeEventListener('scroll', onScroll);
  }, [imageCount, currentIndex]);

  // Lightbox (fullscreen overlay)
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const openLightbox = (idx: number) => { setLightboxIndex(idx); setLightboxOpen(true); };
  const closeLightbox = () => setLightboxOpen(false);
  const lightboxPrev = () => setLightboxIndex((p) => (p - 1 + imageCount) % imageCount);
  const lightboxNext = () => setLightboxIndex((p) => (p + 1) % imageCount);

  useEffect(() => {
    if (!lightboxOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') lightboxPrev();
      if (e.key === 'ArrowRight') lightboxNext();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [lightboxOpen, imageCount]);

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 bg-slate-50">
       <div className="mb-8">
            <button 
              onClick={() => navigateTo('all-lands')} 
              className="text-emerald-600 font-semibold hover:text-emerald-800 transition-colors text-lg"
            >
              &larr; Ver todos os terrenos
            </button>
        </div>
      {/* Carrossel em largura total do conteúdo */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-6">
        {imageCount > 0 ? (
          <div className="relative">
            <div
              ref={scrollerRef}
              className="w-full h-[22rem] sm:h-[30rem] md:h-[34rem] overflow-x-auto whitespace-nowrap scroll-smooth snap-x snap-mandatory no-scrollbar"
            >
              {images.map((src, idx) => (
                <div key={idx} data-slide={idx} className="inline-block align-top w-full h-full snap-start relative">
                  <img
                    src={src}
                    alt={`${land.title} - foto ${idx + 1}`}
                    className="w-full h-full object-cover"
                    onClick={() => openLightbox(idx)}
                  />
                </div>
              ))}
            </div>

            {/* Controles sempre visíveis quando há mais de uma imagem */}
            {imageCount > 1 && (
              <>
                <button
                  onClick={goPrev}
                  className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-slate-800 rounded-full w-11 h-11 flex items-center justify-center shadow"
                  aria-label="Imagem anterior"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"/></svg>
                </button>
                <button
                  onClick={goNext}
                  className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-slate-800 rounded-full w-11 h-11 flex items-center justify-center shadow"
                  aria-label="Próxima imagem"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/></svg>
                </button>

                {/* Dots indicadores */}
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2 bg-black/30 px-2 py-1 rounded-full">
                  {images.map((_, i) => (
                    <button
                      key={i}
                      aria-label={`Ir para imagem ${i + 1}`}
                      onClick={() => scrollToIndex(i)}
                      className={`w-2.5 h-2.5 rounded-full ${i === currentIndex ? 'bg-white' : 'bg-white/60'}`}
                    />
                  ))}
                </div>
              </>
            )}

            {/* Badge de quantidade de fotos */}
            <div className="absolute left-3 bottom-3 bg-black/60 text-white text-xs px-3 py-1 rounded-full flex items-center gap-2">
              <i className="fa fa-camera" aria-hidden="true"></i>
              <span>{imageCount} {imageCount === 1 ? 'foto' : 'fotos'}</span>
            </div>
          </div>
        ) : (
          <div className="h-64 sm:h-96 w-full bg-slate-300 flex items-center justify-center"> 
            <div className="text-slate-600">Sem imagem disponível</div>
          </div>
        )}
      </div>

      {/* Título abaixo do carrossel, em largura total */}
      <div className="bg-white p-6 rounded-xl shadow-lg mb-8">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-800 mb-2">{land.title}</h2>
        <p className="text-xl text-emerald-600 font-semibold mb-4">{land.location}</p>
        <div className="flex items-start text-slate-500">
          <LocationIcon className="w-5 h-5 mr-2 flex-shrink-0 mt-0.5" />
          <span className="text-sm">{formatShortAddress(land.fullAddress)}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Main Column */}
        <div className="lg:col-span-2 space-y-8">
          {/* (título já foi renderizado acima) */}

          {/* Details */}
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h3 className="text-2xl font-bold text-slate-800 mb-4 border-b pb-2">Detalhes</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 text-center">
              <div className="p-3 bg-emerald-50 rounded-lg">
                <span className="text-3xl font-extrabold text-emerald-600 block">{land.area}</span>
                <span className="text-sm text-slate-500">Área Total</span>
              </div>
              <div className="p-3 bg-emerald-50 rounded-lg">
                <span className="text-3xl font-extrabold text-emerald-600 block">{land.solarPosition}</span>
                <span className="text-sm text-slate-500">Posição Solar</span>
              </div>
              <div className="p-3 bg-emerald-50 rounded-lg">
                <span className="text-3xl font-extrabold text-emerald-600 block">{land.propertyType}</span>
                <span className="text-sm text-slate-500">Tipo de Imóvel</span>
              </div>
            </div>
          </div>
          
          {/* Description */}
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h3 className="text-2xl font-bold text-slate-800 mb-4 border-b pb-2">Descrição do Imóvel</h3>
            <p className="text-slate-600 leading-relaxed mb-4">{land.description}</p>
            <ul className="list-disc list-inside text-slate-600 space-y-2 ml-4">
              {(land.features || []).map(feature => <li key={feature}>{feature}</li>)}
            </ul>
          </div>
          
          {/* Map */}
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h3 className="text-2xl font-bold text-slate-800 mb-4 border-b pb-2">Localização</h3>
            <div className="relative w-full overflow-hidden rounded-lg border border-slate-300" style={{ paddingTop: '56.25%' }}> {/* 16:9 Aspect Ratio */}
               <iframe
                title={`Mapa de localização para ${land.title}`}
                src={mapUrl}
                className="absolute top-0 left-0 w-full h-full"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>

        </div>
        
        {/* Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          <div className="sticky top-24">
            {/* Price Card */}
            <div className="bg-white p-6 rounded-xl shadow-2xl border-t-4 border-emerald-500">
              <p className="text-lg text-slate-500 mb-1">Valor de Venda</p>
              <div className="text-emerald-600 text-4xl sm:text-5xl font-extrabold mb-2">{formatPriceBRL(land.price)}</div>
              <p className="text-xs text-slate-500">Preço sujeito a alteração sem aviso prévio.</p>
            </div>

            {/* Agent Card */}
            <div className="bg-white p-6 rounded-xl shadow-lg text-center mt-6">
              <p className="text-slate-500 mb-1">Fale com o Corretor</p>
              <p className="text-2xl font-bold text-slate-800 mb-4">{WHATSAPP_PHONE_NUMBER}</p>
              <WhatsAppButton 
                text="FALAR NO WHATSAPP"
                href={landWhatsAppLink}
                className="w-full"
                size="large"
              />
            </div>
          </div>
        </div>

      </div>

      {/* Lightbox overlay */}
      {lightboxOpen && (
        <div className="fixed inset-0 z-[60] bg-black/90 flex items-center justify-center">
          <button
            className="absolute top-4 right-4 text-white/80 hover:text-white p-2"
            aria-label="Fechar"
            onClick={closeLightbox}
          >
            <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/></svg>
          </button>
          {imageCount > 1 && (
            <button
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white p-3"
              onClick={lightboxPrev}
              aria-label="Anterior"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"/></svg>
            </button>
          )}
          <img src={images[lightboxIndex]} alt={`Imagem ${lightboxIndex+1}`} className="max-h-[90vh] max-w-[92vw] object-contain" />
          {imageCount > 1 && (
            <button
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white p-3"
              onClick={lightboxNext}
              aria-label="Próxima"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/></svg>
            </button>
          )}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/80 text-sm">
            {lightboxIndex + 1} de {imageCount}
          </div>
        </div>
      )}
    </main>
  );
};

export default LandDetailsPage;
