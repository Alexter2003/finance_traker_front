import type { ExpenseCategoryType } from '../../../shared/types/common.types';

/**
 * Obtiene el nombre legible del tipo de categoría de gasto
 * @param type - Tipo de categoría
 * @returns Nombre legible en español
 */
export const getExpenseCategoryTypeLabel = (
  type: ExpenseCategoryType | string
): string => {
  const labels: Record<string, string> = {
    FIXED: 'Fijo',
    VARIABLE: 'Variable',
  };

  return labels[type] || type;
};

/**
 * Obtiene las opciones de tipos de categoría para un select
 * @returns Array de opciones con value y label
 */
export const getExpenseCategoryTypeOptions = () => {
  return [
    { value: 'FIXED', label: 'Fijo' },
    { value: 'VARIABLE', label: 'Variable' },
  ];
};

