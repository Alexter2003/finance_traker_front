import { Card } from '../../../shared/components';
import { getExpenseCategoryTypeLabel } from '../expense-types.domain/expense-types.utils';
import type { ExpenseType } from '../../../shared/types/common.types';

interface ExpenseTypeCardProps {
  expenseType: ExpenseType;
  onEdit?: (expenseType: ExpenseType) => void;
  onDelete?: (expenseType: ExpenseType) => void;
  isLoading?: boolean;
}

function ExpenseTypeCard({
  expenseType,
  onEdit,
  onDelete,
  isLoading = false,
}: ExpenseTypeCardProps) {
  const typeColor =
    expenseType.type === 'FIXED'
      ? 'text-blue-400 dark:text-blue-400'
      : 'text-purple-400 dark:text-purple-400';

  return (
    <Card className="w-full">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-white dark:text-white mb-1">
            {expenseType.name}
          </h3>
          <p className={`text-sm font-medium mb-2 ${typeColor}`}>
            {getExpenseCategoryTypeLabel(expenseType.type)}
          </p>
          {expenseType.description && (
            <p className="text-sm text-gray-300 dark:text-gray-300 line-clamp-2">
              {expenseType.description}
            </p>
          )}
        </div>
        {(onEdit || onDelete) && (
          <div className="flex gap-2 ml-4">
            {onEdit && (
              <button
                onClick={() => onEdit(expenseType)}
                disabled={isLoading}
                className="px-3 py-1.5 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Editar
              </button>
            )}
            {onDelete && (
              <button
                onClick={() => onDelete(expenseType)}
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

export default ExpenseTypeCard;

