import { LandListing } from '../types';

/**
 * Tipos de contrato disponíveis
 */
export type ContractType = '6-months' | '1-year' | 'indefinite';

/**
 * Mapeamento de meses por tipo de contrato
 */
export const CONTRACT_DURATION: Record<ContractType, number | null> = {
  '6-months': 6,
  '1-year': 12,
  'indefinite': null, // null = sem expiração
};

/**
 * Labels dos tipos de contrato
 */
export const CONTRACT_LABELS: Record<ContractType, string> = {
  '6-months': '6 meses',
  '1-year': '1 ano',
  'indefinite': 'Indeterminado',
};

/**
 * Adiciona data de criação e expiração ao anúncio
 */
export function addExpirationDates(
  listing: Omit<LandListing, 'id'>, 
  contractType: ContractType
): Omit<LandListing, 'id'> {
  const now = new Date();
  const expirationMonths = CONTRACT_DURATION[contractType];

  // Se for indeterminado, não adiciona data de expiração
  if (expirationMonths === null) {
    return {
      ...listing,
      createdAt: now.toISOString(),
      expiresAt: undefined,
      contractType,
    };
  }

  const expirationDate = new Date(now);
  expirationDate.setMonth(expirationDate.getMonth() + expirationMonths);

  return {
    ...listing,
    createdAt: now.toISOString(),
    expiresAt: expirationDate.toISOString(),
    contractType,
  };
}

/**
 * Verifica se um anúncio está expirado
 */
export function isExpired(listing: LandListing): boolean {
  if (!listing.expiresAt) return false;
  
  const expirationDate = new Date(listing.expiresAt);
  const now = new Date();
  
  return now > expirationDate;
}

/**
 * Verifica se um anúncio está próximo de expirar (30 dias)
 */
export function isExpiringSoon(listing: LandListing, daysBeforeExpiration = 30): boolean {
  if (!listing.expiresAt) return false;
  
  const expirationDate = new Date(listing.expiresAt);
  const now = new Date();
  const thirtyDaysFromNow = new Date(now);
  thirtyDaysFromNow.setDate(thirtyDaysFromNow.getDate() + daysBeforeExpiration);
  
  return now < expirationDate && expirationDate <= thirtyDaysFromNow;
}

/**
 * Retorna o número de dias até a expiração
 */
export function daysUntilExpiration(listing: LandListing): number | null {
  if (!listing.expiresAt) return null;
  
  const expirationDate = new Date(listing.expiresAt);
  const now = new Date();
  const diffTime = expirationDate.getTime() - now.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  return diffDays;
}

/**
 * Remove anúncios expirados automaticamente
 */
export function removeExpiredListings(listings: LandListing[]): {
  active: LandListing[];
  expired: LandListing[];
} {
  const active: LandListing[] = [];
  const expired: LandListing[] = [];
  
  listings.forEach(listing => {
    if (isExpired(listing)) {
      expired.push(listing);
    } else {
      active.push(listing);
    }
  });
  
  return { active, expired };
}

/**
 * Formata a data de expiração para exibição
 */
export function formatExpirationDate(listing: LandListing): string {
  if (!listing.expiresAt) {
    return listing.contractType === 'indefinite' ? 'Sem prazo de validade' : 'Sem data de expiração';
  }
  
  const expirationDate = new Date(listing.expiresAt);
  return expirationDate.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  });
}

/**
 * Estende a validade de um anúncio por mais X meses
 */
export function extendExpiration(listing: LandListing, additionalMonths = 6): LandListing {
  const currentExpiration = listing.expiresAt ? new Date(listing.expiresAt) : new Date();
  const newExpiration = new Date(currentExpiration);
  newExpiration.setMonth(newExpiration.getMonth() + additionalMonths);
  
  return {
    ...listing,
    expiresAt: newExpiration.toISOString(),
  };
}
