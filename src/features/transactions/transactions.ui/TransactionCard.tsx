import { Card } from '../../../shared/components';
import { formatCurrency } from '../../../shared/utils/formatters';
import { formatDate } from '../../../shared/utils/formatters';
import { formatTransactionLabel } from '../transactions.domain/transactions.utils';
import type { TransactionWithRelations } from '../transactions.domain/transactions.types';

interface TransactionCardProps {
  transaction: TransactionWithRelations;
  onEdit?: (transaction: TransactionWithRelations) => void;
  onDelete?: (transaction: TransactionWithRelations) => void;
  isLoading?: boolean;
}

function TransactionCard({
  transaction,
  onEdit,
  onDelete,
  isLoading = false,
}: TransactionCardProps) {
  const fromAccountName = transaction.fromAccount?.name || 'Cuenta desconocida';
  const toAccountName = transaction.toAccount?.name || 'Cuenta desconocida';

  return (
    <Card className="w-full">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-semibold text-white dark:text-white">
              {formatCurrency(transaction.amount)}
            </h3>
            <span className="text-xs text-gray-400 dark:text-gray-400">
              {formatDate(transaction.date)}
            </span>
          </div>
          <p className="text-sm font-medium text-blue-400 dark:text-blue-400 mb-1">
            {formatTransactionLabel(fromAccountName, toAccountName)}
          </p>
          <div className="flex items-center gap-4 text-xs text-gray-400 dark:text-gray-400">
            <span>De: {fromAccountName}</span>
            <span>→</span>
            <span>A: {toAccountName}</span>
          </div>
          {transaction.description && (
            <p className="text-sm text-gray-400 dark:text-gray-400 line-clamp-2 mt-2">
              {transaction.description}
            </p>
          )}
        </div>
        {(onEdit || onDelete) && (
          <div className="flex gap-2 ml-4">
            {onEdit && (
              <button
                onClick={() => onEdit(transaction)}
                disabled={isLoading}
                className="px-3 py-1.5 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Editar
              </button>
            )}
            {onDelete && (
              <button
                onClick={() => onDelete(transaction)}
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

export default TransactionCard;

