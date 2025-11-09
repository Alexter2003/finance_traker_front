import { formatCurrency } from '../../../shared/utils/formatters';
import type { Budget } from './budgets.types';

/**
 * Formatea el estado del presupuesto
 */
export const getBudgetStatusLabel = (isActive: boolean): string => {
  return isActive ? 'Activo' : 'Inactivo';
};

/**
 * Obtiene el color del estado del presupuesto
 */
export const getBudgetStatusColor = (isActive: boolean): string => {
  return isActive
    ? 'text-green-400 dark:text-green-400'
    : 'text-gray-400 dark:text-gray-400';
};

/**
 * Calcula el porcentaje usado del presupuesto
 */
export const calculateBudgetUsage = (budget: Budget): number => {
  if (!budget.totalAvailable || budget.totalAvailable === 0) return 0;
  const spent = budget.spentAmount || 0;
  return Math.min(100, (spent / budget.totalAvailable) * 100);
};

/**
 * Formatea la información del presupuesto para mostrar
 */
export const formatBudgetInfo = (budget: Budget): {
  totalAvailable: string;
  spentAmount: string;
  availableAmount: string;
  usagePercentage: number;
} => {
  const totalAvailable = budget.totalAvailable || 0;
  const spentAmount = budget.spentAmount || 0;
  const availableAmount = budget.availableAmount || 0;
  const usagePercentage = calculateBudgetUsage(budget);

  return {
    totalAvailable: formatCurrency(totalAvailable),
    spentAmount: formatCurrency(spentAmount),
    availableAmount: formatCurrency(availableAmount),
    usagePercentage,
  };
};

/**
 * Obtiene el color según el porcentaje de uso
 */
export const getUsageColor = (percentage: number): string => {
  if (percentage >= 100) return 'text-red-400 dark:text-red-400';
  if (percentage >= 80) return 'text-yellow-400 dark:text-yellow-400';
  return 'text-green-400 dark:text-green-400';
};

