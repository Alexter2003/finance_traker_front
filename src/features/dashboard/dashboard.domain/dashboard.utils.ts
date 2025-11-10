import { formatDate } from '../../../shared/utils/formatters';

/**
 * Calcula el porcentaje de días transcurridos en un período de presupuesto
 * @param startDate - Fecha de inicio del presupuesto
 * @param endDate - Fecha de fin del presupuesto
 * @returns Porcentaje (0-100)
 */
export const calculateBudgetProgress = (
  startDate: string,
  endDate: string
): number => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const now = new Date();

  // Si ya pasó la fecha de fin, retornar 100%
  if (now >= end) {
    return 100;
  }

  // Si aún no ha comenzado, retornar 0%
  if (now < start) {
    return 0;
  }

  const totalDays = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
  const elapsedDays = Math.ceil((now.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));

  return Math.min(Math.round((elapsedDays / totalDays) * 100), 100);
};

/**
 * Formatea el período de un presupuesto
 * @param startDate - Fecha de inicio
 * @param endDate - Fecha de fin
 * @returns String formateado (ej: "01/12/2024 - 15/12/2024")
 */
export const formatBudgetPeriod = (
  startDate: string,
  endDate: string
): string => {
  return `${formatDate(startDate)} - ${formatDate(endDate)}`;
};

/**
 * Obtiene el nombre legible del tipo de cuenta
 * @param type - Tipo de cuenta
 * @returns Nombre legible en español
 */
export const getAccountTypeLabel = (type: string): string => {
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
 * Verifica si un presupuesto está próximo a vencer (menos de 3 días)
 * @param endDate - Fecha de fin del presupuesto
 * @returns true si está próximo a vencer
 */
export const isBudgetNearExpiry = (endDate: string): boolean => {
  const end = new Date(endDate);
  const now = new Date();
  const diffDays = Math.ceil((end.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));

  return diffDays >= 0 && diffDays <= 3;
};

