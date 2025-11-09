/**
 * Utilidades para el módulo de transacciones
 */

/**
 * Formatea el texto de una transacción para mostrar en la UI
 * @param fromAccount - Nombre de la cuenta de origen
 * @param toAccount - Nombre de la cuenta de destino
 * @returns Texto formateado
 */
export const formatTransactionLabel = (
  fromAccount: string,
  toAccount: string
): string => {
  return `${fromAccount} → ${toAccount}`;
};

