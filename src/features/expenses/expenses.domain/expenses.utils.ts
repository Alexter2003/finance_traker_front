import { formatCurrency } from '../../../shared/utils/formatters';
import type { ExpenseWithRelations } from './expenses.types';

/**
 * Formatea un gasto para mostrar en la UI
 */
export const formatExpense = (expense: ExpenseWithRelations): string => {
  const accountName = expense.account?.name || 'Cuenta desconocida';
  const expenseTypeName = expense.expenseType?.name || 'Tipo desconocido';
  return `${formatCurrency(expense.amount)} - ${expenseTypeName} (${accountName})`;
};

