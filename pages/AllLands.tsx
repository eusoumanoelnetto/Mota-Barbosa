
import React from 'react';
import { LandCard } from '../components/LandCard';
import { LandListing } from '../types';


const AllLandsPage: React.FC<{ landListings: LandListing[], navigateTo: (page: string, landId?: number) => void }> = ({ landListings, navigateTo }) => {
  return (
    <main>
       <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out forwards;
        }
      `}</style>
      <section id="all-lands" className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16 animate-fadeIn">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900">Nossos Terrenos Disponíveis</h1>
            <p className="text-lg text-slate-600 mt-4 max-w-3xl mx-auto">
              Explore todas as nossas oportunidades. Encontre o lugar perfeito para seu próximo projeto, seja para construir, investir ou lazer.
            </p>
            <button 
              onClick={() => navigateTo('home')} 
              className="mt-8 text-emerald-600 font-semibold hover:text-emerald-800 transition-colors text-lg"
            >
              &larr; Voltar para a página inicial
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {landListings.map((listing, index) => (
              <div 
                key={listing.id}
                className="animate-fadeIn"
                style={{ animationDelay: `${index * 100}ms`, opacity: 0}}
              >
                <LandCard listing={listing} navigateTo={navigateTo} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default AllLandsPage;
