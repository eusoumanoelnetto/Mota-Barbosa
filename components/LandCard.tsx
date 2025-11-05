
import React from 'react';
import { LandListing } from '../types';

// --- Ícones para o novo Card ---
const LocationPinIcon: React.FC<{className?: string}> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
  </svg>
);


export const LandCard: React.FC<{ listing: LandListing; navigateTo: (page: string, landId: number) => void; }> = ({ listing, navigateTo }) => (
  <div className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col h-full group transform hover:-translate-y-2 transition-all duration-300">
    <div className="relative">
      <img src={listing.images?.[0] || listing.imageUrl} alt={listing.title} className="w-full h-48 object-cover" />
       <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black/70 to-transparent">
        <h3 className="text-white text-lg font-bold truncate" style={{textShadow: '0 1px 3px rgba(0,0,0,0.7)'}}>{listing.title}</h3>
      </div>
    </div>
    <div className="p-5 flex flex-col flex-grow">
      <div className="flex items-center text-slate-500 mb-3">
        <LocationPinIcon className="w-5 h-5 mr-2 text-emerald-500 flex-shrink-0" />
        <span className="text-sm font-medium">{listing.location}</span>
      </div>
       <div className="mb-4">
        {(listing.tags || []).map(tag => (
          <span key={tag} className="inline-block bg-emerald-100 text-emerald-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded-full">
            {tag}
          </span>
        ))}
      </div>
      <div className="flex-grow">
        <ul className="text-sm text-slate-600 space-y-1 mb-4">
          {(listing.features || []).slice(0, 3).map(feature => (
            <li key={feature} className="flex items-center truncate">
              <span className="w-1 h-1 bg-slate-400 rounded-full mr-2"></span>
              {feature}
            </li>
          ))}
        </ul>
      </div>
      <div className="border-t border-slate-200 pt-4 mt-auto">
        <p className="text-2xl font-extrabold text-slate-800 mb-4 text-center">{listing.price}</p>
         <button
          onClick={() => navigateTo('land-details', listing.id)}
          className="w-full text-center font-bold rounded-full shadow-lg transform hover:scale-105 transition-all duration-300 ease-in-out px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white"
        >
          Ver Detalhes
        </button>
      </div>
    </div>
  </div>
);
