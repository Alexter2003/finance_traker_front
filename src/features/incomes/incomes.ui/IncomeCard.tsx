import { Card } from '../../../shared/components';
import { formatCurrency } from '../../../shared/utils/formatters';
import { formatDate } from '../../../shared/utils/formatters';
import { getIncomeFrequencyLabel } from '../incomes.domain/incomes.utils';
import type { IncomeWithRelations } from '../incomes.domain/incomes.types';

interface IncomeCardProps {
  income: IncomeWithRelations;
  onEdit?: (income: IncomeWithRelations) => void;
  onDelete?: (income: IncomeWithRelations) => void;
  isLoading?: boolean;
}

function IncomeCard({
  income,
  onEdit,
  onDelete,
  isLoading = false,
}: IncomeCardProps) {
  return (
    <Card className="w-full">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-semibold text-green-400 dark:text-green-400">
              {formatCurrency(income.amount)}
            </h3>
            <span className="text-xs text-gray-400 dark:text-gray-400">
              {formatDate(income.date)}
            </span>
          </div>
          <p className="text-sm font-medium text-green-300 dark:text-green-300 mb-1">
            {getIncomeFrequencyLabel(income.frequency)}
          </p>
          <p className="text-sm text-gray-300 dark:text-gray-300 mb-1">
            {income.account?.name || 'Cuenta desconocida'}
          </p>
          {income.description && (
            <p className="text-sm text-gray-400 dark:text-gray-400 line-clamp-2 mt-2">
              {income.description}
            </p>
          )}
        </div>
        {(onEdit || onDelete) && (
          <div className="flex gap-2 ml-4">
            {onEdit && (
              <button
                onClick={() => onEdit(income)}
                disabled={isLoading}
                className="px-3 py-1.5 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Editar
              </button>
            )}
            {onDelete && (
              <button
                onClick={() => onDelete(income)}
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

export default IncomeCard;

