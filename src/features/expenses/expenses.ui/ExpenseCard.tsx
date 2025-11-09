import { Card } from '../../../shared/components';
import { formatCurrency } from '../../../shared/utils/formatters';
import { formatDate } from '../../../shared/utils/formatters';
import type { ExpenseWithRelations } from '../expenses.domain/expenses.types';

interface ExpenseCardProps {
  expense: ExpenseWithRelations;
  onEdit?: (expense: ExpenseWithRelations) => void;
  onDelete?: (expense: ExpenseWithRelations) => void;
  isLoading?: boolean;
}

function ExpenseCard({
  expense,
  onEdit,
  onDelete,
  isLoading = false,
}: ExpenseCardProps) {
  return (
    <Card className="w-full">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-semibold text-white dark:text-white">
              {formatCurrency(expense.amount)}
            </h3>
            <span className="text-xs text-gray-400 dark:text-gray-400">
              {formatDate(expense.date)}
            </span>
          </div>
          <p className="text-sm font-medium text-blue-400 dark:text-blue-400 mb-1">
            {expense.expenseType?.name || 'Tipo desconocido'}
          </p>
          <p className="text-sm text-gray-300 dark:text-gray-300 mb-1">
            {expense.account?.name || 'Cuenta desconocida'}
          </p>
          {expense.description && (
            <p className="text-sm text-gray-400 dark:text-gray-400 line-clamp-2 mt-2">
              {expense.description}
            </p>
          )}
        </div>
        {(onEdit || onDelete) && (
          <div className="flex gap-2 ml-4">
            {onEdit && (
              <button
                onClick={() => onEdit(expense)}
                disabled={isLoading}
                className="px-3 py-1.5 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Editar
              </button>
            )}
            {onDelete && (
              <button
                onClick={() => onDelete(expense)}
                disabled={isLoading}
                className="px-3 py-1.5 text-sm bg-red-600 hover:bg-red-700 text-white rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Eliminar
              </button>
            )}
          </div>
        )}
      </div>
    </Card>
  );
}

export default ExpenseCard;

