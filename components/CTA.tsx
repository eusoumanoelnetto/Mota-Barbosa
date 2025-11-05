

import React from 'react';
import { WhatsAppButton } from './WhatsAppButton';
import { WHATSAPP_LINK } from '../constants';

const CTA: React.FC = () => {
  return (
    <section className="bg-emerald-600">
      <div className="container mx-auto px-6 py-16 text-center text-white">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Pronto para Começar?</h2>
        <p className="text-lg md:text-xl max-w-3xl mx-auto mb-8 text-emerald-100">
          Seja para uma completa limpeza de terreno para construção, a manutenção de pousada para receber hóspedes, ou a poda de árvores para segurança na sua casa de praia, o primeiro passo é o mais importante. Nossa equipe está pronta para entender e atender sua necessidade.
        </p>
        <WhatsAppButton text="Falar com um Especialista" href={WHATSAPP_LINK} variant="secondary" size="large" />
      </div>
    </section>
  );
};

export default CTA;
