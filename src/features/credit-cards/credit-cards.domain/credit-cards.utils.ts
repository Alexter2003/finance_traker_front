/**
 * Utilidades para tarjetas de crédito
 */

/**
 * Formatea el balance de una tarjeta de crédito
 * @param balance - Balance de la tarjeta
 * @returns Balance formateado con signo
 */
export const formatCreditCardBalance = (balance: number): string => {
  return balance >= 0 ? `+${balance.toFixed(2)}` : balance.toFixed(2);
};

/**
 * Obtiene el color del balance según si es positivo o negativo
 * @param balance - Balance de la tarjeta
 * @returns Clase CSS para el color
 */
export const getBalanceColor = (balance: number): string => {
  return balance >= 0
    ? 'text-green-400 dark:text-green-400'
    : 'text-red-400 dark:text-red-400';
};

/**
 * Obtiene el color de la deuda
 * @param debt - Deuda pendiente
 * @returns Clase CSS para el color
 */
export const getDebtColor = (debt: number): string => {
  return debt > 0
    ? 'text-red-400 dark:text-red-400'
    : 'text-green-400 dark:text-green-400';
};

