
import React from 'react';
import { LandListing } from '../types';

interface AdminPageProps {
  landListings: LandListing[];
  onAdd: () => void;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
  onReset: () => void;
  navigateTo: (page: string) => void;
}

const AdminPage: React.FC<AdminPageProps> = ({ landListings, onAdd, onEdit, onDelete, onReset, navigateTo }) => {
  return (
    <main className="bg-white py-12">
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-center mb-8 border-b pb-4">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900">Painel de Administração</h1>
          <div>
            <button
                onClick={() => navigateTo('home')}
                className="text-slate-600 font-semibold hover:text-slate-800 transition-colors mr-4"
            >
                &larr; Voltar ao Site
            </button>
            <button 
              onClick={onReset}
              className="mr-4 border border-red-300 text-red-600 font-bold py-2 px-4 rounded-lg hover:bg-red-50 transition-colors"
              title="Resetar dados para o padrão inicial"
            >
              Resetar Dados
            </button>
            <button 
              onClick={onAdd}
              className="bg-emerald-500 text-white font-bold py-2 px-6 rounded-lg hover:bg-emerald-600 transition-colors shadow"
            >
              Adicionar Novo Terreno
            </button>
          </div>
        </div>

        <div className="bg-slate-50 p-4 rounded-lg shadow-inner">
          {landListings.length === 0 ? (
            <p className="text-center text-slate-500 py-8">Nenhum terreno cadastrado.</p>
          ) : (
            <ul className="space-y-4">
              {landListings.map(land => (
                <li key={land.id} className="bg-white p-4 rounded-lg shadow-md flex justify-between items-center">
                  <div>
                    <h3 className="text-lg font-semibold text-slate-800">{land.title}</h3>
                    <p className="text-sm text-slate-500">Código: <span className="font-mono bg-slate-100 px-1 rounded">{land.code}</span></p>
                  </div>
                  <div className="space-x-3">
                    <button 
                      onClick={() => onEdit(land.id)}
                      className="text-blue-500 hover:text-blue-700 font-semibold"
                    >
                      Editar
                    </button>
                    <button 
                      onClick={() => onDelete(land.id)}
                      className="text-red-500 hover:text-red-700 font-semibold"
                    >
                      Excluir
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </main>
  );
};

export default AdminPage;
