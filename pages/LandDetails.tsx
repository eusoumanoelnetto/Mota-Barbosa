
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
  if (!raw) return 'Sob consulta';
  const digits = raw.toString().replace(/[^\d]/g, '');
  if (!digits) return 'Sob consulta';
  const num = Number(digits);
  try {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(num);
  } catch {
    return `R$ ${num.toLocaleString('pt-BR')}`;
  }
};

// Componente para animar o preço (0 -> valor final). Mostra "Sob consulta" quando não houver valor.
const AnimatedPrice: React.FC<{ value: string; reserved: boolean }> = ({ value, reserved }) => {
  const [display, setDisplay] = useState<string>(value || 'Sob consulta');

  useEffect(() => {
    const lower = (value || '').toLowerCase();
    if (!value || lower.includes('sob consulta')) {
      setDisplay('Sob consulta');
      return;
    }
    const digits = value.replace(/[^\d]/g, '');
    if (!digits) {
      setDisplay('Sob consulta');
      return;
    }
    const target = Number(digits);
    const formatter = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });
    const start = 0;
    const duration = 800; // ms
    let raf = 0;
    const t0 = performance.now();
    const tick = (t: number) => {
      const p = Math.min((t - t0) / duration, 1);
      const current = Math.round(start + (target - start) * p);
      setDisplay(formatter.format(current));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [value]);

  if ((display || '').toLowerCase() === 'sob consulta') {
    return <div className="text-slate-500 text-2xl font-bold">Sob consulta</div>;
  }

  const parts = display.split(' ');
  return (
    <div
      className={"flex items-end gap-1 select-none " + (reserved ? "opacity-70" : "")}
      aria-label={`Valor de venda ${display}`}
    >
      <span className="text-emerald-600 text-2xl font-bold translate-y-1">{parts[0] || 'R$'}</span>
      <span
        className="text-emerald-600 font-black leading-none drop-shadow-sm"
        style={{ fontSize: 'clamp(2.25rem, 6.5vw, 3.5rem)' }}
      >
        {parts[1] || ''}
      </span>
    </div>
  );
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
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-2 pb-10 bg-slate-50">
      {/* Removido botão de voltar redundante (menu já permite navegar). Se quiser reintroduzir como overlay sobre a imagem: ver comentário ao final. */}
      {/* Banner de imagens em largura total da tela (full-bleed) */}
      <div className="relative w-screen left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] mb-6">
        {imageCount > 0 ? (
          <div className="relative">
            <div
              ref={scrollerRef}
              className="w-screen h-[22rem] sm:h-[30rem] md:h-[36rem] overflow-x-auto whitespace-nowrap scroll-smooth snap-x snap-mandatory no-scrollbar"
            >
              {images.map((src, idx) => (
                <div key={idx} data-slide={idx} className="inline-block align-top w-screen h-full snap-start relative">
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
          <div className="h-64 sm:h-96 w-screen bg-slate-300 flex items-center justify-center"> 
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

      {/* Mini-galeria de miniaturas após o título */}
      {imageCount > 1 && (
        <div className="bg-white p-5 rounded-xl shadow-lg mb-8">
          <h3 className="text-lg font-bold text-slate-800 mb-3 flex items-center gap-2">
            <i className="fa fa-images text-emerald-600" aria-hidden="true"></i>
            Galeria de Fotos
          </h3>
          <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
            {images.map((src, idx) => (
              <button
                key={idx}
                onClick={() => scrollToIndex(idx)}
                aria-label={`Ver imagem ${idx + 1}`}
                className={
                  "relative flex-shrink-0 rounded-lg overflow-hidden border-2 focus:outline-none focus:ring-2 focus:ring-emerald-400 transition-all " +
                  (idx === currentIndex
                    ? "border-emerald-500 ring-2 ring-emerald-200 scale-105"
                    : "border-slate-200 hover:border-emerald-300")
                }
              >
                <img
                  src={src}
                  alt={`Miniatura ${idx + 1} de ${land.title}`}
                  className="h-20 w-28 sm:h-24 sm:w-32 object-cover"
                />
              </button>
            ))}
          </div>
        </div>
      )}

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
            {/* Price Card avançado (preview local) */}
            <div
              className="group relative overflow-hidden rounded-2xl border-t-8 border-emerald-500 bg-gradient-to-b from-white to-emerald-50/20 px-7 py-6 shadow-lg flex flex-col gap-3 transition-all duration-300 ease-out hover:shadow-xl hover:scale-[1.01]"
              aria-labelledby="price-heading"
            >
              {/* Decor ambient light */}
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute -top-12 -right-8 w-36 h-36 bg-emerald-100/40 rounded-full blur-2xl" />
                <div className="absolute -bottom-16 -left-10 w-40 h-40 bg-emerald-50/30 rounded-full blur-3xl" />
              </div>
              <div className="flex items-center justify-between">
                <p id="price-heading" className="text-xs sm:text-sm font-semibold tracking-wider text-slate-600 uppercase">Valor de Venda</p>
                <span className={"text-[10px] font-semibold px-2 py-1 rounded-full border transition-colors " + (land.isReserved ? "bg-amber-100 text-amber-700 border-amber-200" : "bg-emerald-100 text-emerald-700 border-emerald-200")}>{land.isReserved ? "Reservado" : "Disponível"}</span>
              </div>
              {/* Animated price */}
              <AnimatedPrice value={formatPriceBRL(land.price)} reserved={!!land.isReserved} />
              <div className="flex items-center gap-1 text-[11px] text-slate-400">
                <span className="relative group/tt">
                  <i className="fa fa-info-circle text-slate-400"></i>
                  <span className="invisible opacity-0 group-hover/tt:visible group-hover/tt:opacity-100 absolute left-1/2 -translate-x-1/2 mt-2 w-44 bg-slate-800 text-white text-[10px] rounded px-2 py-1 shadow-lg transition-opacity duration-200">Valores podem sofrer reajuste conforme mercado.</span>
                </span>
                <span>Preço sujeito a alteração sem aviso prévio.</span>
              </div>
              <div className="mt-1">
                <WhatsAppButton
                  text={land.isReserved ? "VER OUTRAS OPÇÕES" : "NEGOCIAR AGORA"}
                  href={landWhatsAppLink}
                  className="w-full !py-3 !text-sm font-semibold"
                  size="large"
                />
              </div>
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
