import { Card } from '../../../shared/components';
import { formatDate } from '../../../shared/utils/formatters';
import { getAmountColor, formatAdjustmentAmount } from '../account-adjustments.domain/account-adjustments.utils';
import type { AccountAdjustment } from '../account-adjustments.domain/account-adjustments.types';

interface AccountAdjustmentCardProps {
  adjustment: AccountAdjustment;
  onEdit?: (adjustment: AccountAdjustment) => void;
  onDelete?: (adjustment: AccountAdjustment) => void;
  isLoading?: boolean;
}

function AccountAdjustmentCard({
  adjustment,
  onEdit,
  onDelete,
  isLoading = false,
}: AccountAdjustmentCardProps) {
  const amountColor = getAmountColor(adjustment.amount);
  const formattedAmount = formatAdjustmentAmount(adjustment.amount);

  return (
    <Card className="w-full">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-white dark:text-white mb-1">
            {adjustment.account?.name || `Cuenta #${adjustment.accountId}`}
          </h3>
          <p className="text-sm text-gray-300 dark:text-gray-300 mb-2">
            {adjustment.reason}
          </p>
          <div className="flex items-center gap-4 flex-wrap">
            <div>
              <p className="text-xs text-gray-400 dark:text-gray-400">Monto</p>
              <p className={`text-sm font-semibold ${amountColor}`}>
                {formattedAmount}
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-400 dark:text-gray-400">Fecha</p>
              <p className="text-sm text-gray-300 dark:text-gray-300">
                {formatDate(adjustment.date)}
              </p>
            </div>
          </div>
        </div>
        {(onEdit || onDelete) && (
          <div className="flex gap-2 ml-4">
            {onEdit && (
              <button
                onClick={() => onEdit(adjustment)}
                disabled={isLoading}
                className="px-3 py-1.5 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Editar
              </button>
            )}
            {onDelete && (
              <button
                onClick={() => onDelete(adjustment)}
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

export default AccountAdjustmentCard;

