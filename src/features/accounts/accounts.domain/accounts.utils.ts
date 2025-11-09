import type { AccountType } from '../../../shared/types/common.types';

/**
 * Obtiene el nombre legible del tipo de cuenta
 * @param type - Tipo de cuenta
 * @returns Nombre legible en español
 */
export const getAccountTypeLabel = (type: AccountType | string): string => {
  const labels: Record<string, string> = {
    CASH: 'Efectivo',
    BANK: 'Banco',
    CREDIT_CARD: 'Tarjeta de Crédito',
    SAVINGS: 'Ahorros',
    OTHER: 'Otro',
  };

  return labels[type] || type;
};

/**
 * Obtiene las opciones de tipos de cuenta para un select
 * @returns Array de opciones con value y label
 */
export const getAccountTypeOptions = () => {
  return [
    { value: 'CASH', label: 'Efectivo' },
    { value: 'BANK', label: 'Banco' },
    { value: 'SAVINGS', label: 'Ahorros' },
    { value: 'CREDIT_CARD', label: 'Tarjeta de Crédito' },
    { value: 'OTHER', label: 'Otro' },
  ];
};

