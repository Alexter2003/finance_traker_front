import type { AccountAdjustment } from './account-adjustments.types';
import { formatCurrency } from '../../../shared/utils/formatters';
import { formatDate } from '../../../shared/utils/formatters';

/**
 * Formatea el monto del ajuste con su signo
 * @param amount - Monto del ajuste
 * @returns String formateado con signo
 */
export const formatAdjustmentAmount = (amount: number): string => {
  const formatted = formatCurrency(Math.abs(amount));
  return amount >= 0 ? `+${formatted}` : `-${formatted}`;
};

/**
 * Obtiene el color del monto según si es positivo o negativo
 * @param amount - Monto del ajuste
 * @returns Clase CSS para el color
 */
export const getAmountColor = (amount: number): string => {
  return amount >= 0
    ? 'text-green-400 dark:text-green-400'
    : 'text-red-400 dark:text-red-400';
};

/**
 * Formatea un ajuste de cuenta para mostrar en la UI
 * @param adjustment - Ajuste de cuenta
 * @returns Objeto con información formateada
 */
export const formatAccountAdjustment = (adjustment: AccountAdjustment) => {
  return {
    ...adjustment,
    formattedAmount: formatAdjustmentAmount(adjustment.amount),
    formattedDate: formatDate(adjustment.date),
    amountColor: getAmountColor(adjustment.amount),
  };
};

