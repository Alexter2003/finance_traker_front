import { Card } from '../../../shared/components';
import { formatCurrency } from '../../../shared/utils/formatters';
import { getAccountTypeLabel } from '../accounts.domain/accounts.utils';
import type { Account } from '../../../shared/types/common.types';

interface AccountCardProps {
  account: Account;
  onEdit?: (account: Account) => void;
  onDelete?: (account: Account) => void;
  isLoading?: boolean;
}

function AccountCard({ account, onEdit, onDelete, isLoading = false }: AccountCardProps) {
  const isPositive = (account.balance ?? account.initialBalance) >= 0;
  const balanceColor = isPositive 
    ? 'text-green-400 dark:text-green-400' 
    : 'text-red-400 dark:text-red-400';
  
  const balance = account.balance ?? account.initialBalance;

  return (
    <Card className="w-full">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-white dark:text-white mb-1">
            {account.name}
          </h3>
          <p className="text-sm text-gray-300 dark:text-gray-300 mb-2">
            {getAccountTypeLabel(account.type)}
          </p>
          <div className="flex items-center gap-4">
            <div>
              <p className="text-xs text-gray-400 dark:text-gray-400">Balance Inicial</p>
              <p className="text-sm text-gray-300 dark:text-gray-300">
                {formatCurrency(account.initialBalance)}
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-400 dark:text-gray-400">Balance Actual</p>
              <p className={`text-sm font-semibold ${balanceColor}`}>
                {formatCurrency(balance)}
              </p>
            </div>
          </div>
        </div>
        {(onEdit || onDelete) && (
          <div className="flex gap-2 ml-4">
            {onEdit && (
              <button
                onClick={() => onEdit(account)}
                disabled={isLoading}
                className="px-3 py-1.5 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Editar
              </button>
            )}
            {onDelete && (
              <button
                onClick={() => onDelete(account)}
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

export default AccountCard;

