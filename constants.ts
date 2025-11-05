
export const WHATSAPP_PHONE_NUMBER = '(93) 99976-0963';
const WHATSAPP_API_NUMBER = '5593999760963';
const GENERAL_MESSAGE = 'Olá! Visitei o site e tenho interesse nos serviços de limpeza de terreno, poda de árvores ou manutenção. Gostaria de solicitar um orçamento para meu espaço (terreno, pousada ou casa de praia).';
export const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_API_NUMBER}?text=${encodeURIComponent(GENERAL_MESSAGE)}`;

export const createLandWhatsAppLink = (landTitle: string): string => {
  const message = `Olá! Vi o anúncio do terreno "${landTitle}" no site e gostaria de mais informações.`;
  return `https://wa.me/${WHATSAPP_API_NUMBER}?text=${encodeURIComponent(message)}`;
};