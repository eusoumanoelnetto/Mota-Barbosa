
import React from 'react';
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
  const firstImage = land.images?.[0] || land.imageUrl || '';
  const imageCount = land.images?.length ?? (land.imageUrl ? 1 : 0);

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
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Main Column */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Title and Location */}
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-800 mb-2">{land.title}</h2>
            <p className="text-xl text-emerald-600 font-semibold mb-4">{land.location}</p>
            <div className="flex items-start text-slate-500">
              <LocationIcon className="w-5 h-5 mr-2 flex-shrink-0 mt-0.5" />
              <span className="text-sm">{formatShortAddress(land.fullAddress)}</span>
            </div>
          </div>

          {/* Image Gallery */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="h-64 sm:h-96 w-full bg-slate-300 flex items-center justify-center relative">
              {firstImage ? (
                <img src={firstImage} alt={land.title} className="w-full h-full object-cover" />
              ) : (
                <div className="text-slate-600">Sem imagem disponível</div>
              )}
              <div className="absolute bottom-4 right-4 bg-black bg-opacity-50 text-white text-sm px-3 py-1 rounded-full">{`1 de ${imageCount} fotos`}</div>
            </div>
          </div>

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
              <div className="text-emerald-600 text-5xl font-extrabold mb-4">{land.price}</div>
              <WhatsAppButton 
                text="QUERO MAIS INFORMAÇÕES"
                href={landWhatsAppLink}
                className="w-full"
                size="large"
              />
            </div>

            {/* Agent Card */}
            <div className="bg-white p-6 rounded-xl shadow-lg text-center mt-6">
              <p className="text-slate-500 mb-2">Fale com o Corretor</p>
              <p className="text-3xl font-bold text-slate-800 mb-3">{WHATSAPP_PHONE_NUMBER}</p>
              <a href={landWhatsAppLink} target="_blank" rel="noopener noreferrer" className="text-sm text-emerald-600 hover:text-emerald-800 font-medium">
                (Abrir WhatsApp)
              </a>
            </div>
          </div>
        </div>

      </div>
    </main>
  );
};

export default LandDetailsPage;
