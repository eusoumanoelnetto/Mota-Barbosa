
import React from 'react';
import { LandListing } from '../types';
import { isExpiringSoon, daysUntilExpiration, formatExpirationDate, CONTRACT_LABELS } from '../utils/imageExpiration';

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
              {landListings.map(land => {
                const expiringSoon = isExpiringSoon(land);
                const daysLeft = daysUntilExpiration(land);
                const expirationText = formatExpirationDate(land);
                const contractLabel = land.contractType ? CONTRACT_LABELS[land.contractType] : 'Não definido';
                
                return (
                  <li key={land.id} className="bg-white p-4 rounded-lg shadow-md">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-slate-800">{land.title}</h3>
                        <p className="text-sm text-slate-500">
                          Código: <span className="font-mono bg-slate-100 px-1 rounded">{land.code}</span>
                        </p>
                        
                        {/* Tipo de Contrato */}
                        <div className="mt-2 flex items-center gap-2">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                            land.contractType === 'indefinite' 
                              ? 'bg-purple-100 text-purple-800' 
                              : land.contractType === '6-months'
                              ? 'bg-blue-100 text-blue-800'
                              : 'bg-emerald-100 text-emerald-800'
                          }`}>
                            <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            Contrato: {contractLabel}
                          </span>
                        </div>
                        
                        {/* Status de Expiração */}
                        {land.contractType !== 'indefinite' && land.expiresAt && (
                          <div className="mt-2">
                            {expiringSoon ? (
                              <div className="flex items-center text-amber-600 text-xs">
                                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                </svg>
                                <span className="font-semibold">Expira em {daysLeft} dias ({expirationText})</span>
                              </div>
                            ) : (
                              <p className="text-xs text-slate-400">
                                Válido até {expirationText}
                              </p>
                            )}
                          </div>
                        )}
                        
                        {land.contractType === 'indefinite' && (
                          <p className="text-xs text-purple-600 mt-2 flex items-center">
                            <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            Sem prazo de validade
                          </p>
                        )}
                      </div>
                      <div className="flex space-x-3 ml-4">
                        <button 
                          onClick={() => onEdit(land.id)}
                          className="text-blue-500 hover:text-blue-700 font-semibold whitespace-nowrap"
                        >
                          Editar
                        </button>
                        <button 
                          onClick={() => onDelete(land.id)}
                          className="text-red-500 hover:text-red-700 font-semibold whitespace-nowrap"
                        >
                          Excluir
                        </button>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>
    </main>
  );
};

export default AdminPage;
