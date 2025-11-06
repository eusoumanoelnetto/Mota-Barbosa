
export const WHATSAPP_PHONE_NUMBER = '(93) 99976-0963';
const WHATSAPP_API_NUMBER = '5593999760963';

// Mensagens contextualizadas por seção do site
const MESSAGES = {
  general: 'Olá! Visitei o site e tenho interesse nos serviços de limpeza de terreno, poda de árvores ou manutenção. Gostaria de solicitar um orçamento para meu espaço (terreno, pousada ou casa de praia).',
  hero: 'Olá! Vi a página principal do site e gostaria de solicitar um orçamento para serviços de limpeza de terreno, poda de árvores ou manutenção.',
  services: 'Olá! Tenho interesse nos serviços oferecidos (limpeza de terreno, poda de árvores ou manutenção). Gostaria de mais informações e um orçamento.',
  limpezaTerreno: 'Olá! Preciso de um serviço de limpeza de terreno. Gostaria de solicitar um orçamento e entender melhor como funciona.',
  podaArvores: 'Olá! Tenho interesse no serviço de poda de árvores. Gostaria de solicitar um orçamento e saber mais sobre o processo.',
  manutencao: 'Olá! Preciso de serviços de manutenção para minha pousada/casa de praia. Gostaria de um orçamento e mais informações.',
  about: 'Olá! Conheci a empresa através do site e fiquei interessado nos serviços. Gostaria de solicitar um orçamento.',
  landSales: 'Olá! Vi que vocês têm terrenos à venda. Gostaria de conhecer mais opções e receber informações sobre os imóveis disponíveis.',
  cta: 'Olá! Quero transformar meu espaço com serviços profissionais de limpeza e manutenção. Gostaria de solicitar um orçamento!',
};

// Link padrão (mensagem geral)
const GENERAL_MESSAGE = MESSAGES.general;
export const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_API_NUMBER}?text=${encodeURIComponent(GENERAL_MESSAGE)}`;

// Função para criar link contextualizado do WhatsApp
export const createWhatsAppLink = (context: keyof typeof MESSAGES = 'general'): string => {
  const message = MESSAGES[context] || MESSAGES.general;
  return `https://wa.me/${WHATSAPP_API_NUMBER}?text=${encodeURIComponent(message)}`;
};

// Função específica para terrenos (mantém a mesma lógica)
export const createLandWhatsAppLink = (landTitle: string): string => {
  const message = `Olá! Vi o anúncio do terreno "${landTitle}" no site e gostaria de mais informações.`;
  return `https://wa.me/${WHATSAPP_API_NUMBER}?text=${encodeURIComponent(message)}`;
};