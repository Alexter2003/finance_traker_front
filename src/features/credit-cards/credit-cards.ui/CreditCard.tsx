import { Card } from '../../../shared/components';
import { formatCurrency } from '../../../shared/utils/formatters';
import { getBalanceColor, getDebtColor } from '../credit-cards.domain/credit-cards.utils';
import type { CreditCard } from '../../../shared/types/common.types';

interface CreditCardCardProps {
  creditCard: CreditCard;
  onEdit?: (creditCard: CreditCard) => void;
  onDelete?: (creditCard: CreditCard) => void;
  isLoading?: boolean;
}

function CreditCardCard({ creditCard, onEdit, onDelete, isLoading = false }: CreditCardCardProps) {
  const balance = creditCard.balance ?? creditCard.initialBalance;
  const debt = creditCard.debt ?? 0;
  const balanceColor = getBalanceColor(balance);
  const debtColor = getDebtColor(debt);

  return (
    <Card className="w-full">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-white dark:text-white mb-1">
            {creditCard.name}
          </h3>
          <p className="text-sm text-gray-300 dark:text-gray-300 mb-2">
            Tarjeta de Crédito
          </p>
          <div className="flex items-center gap-4">
            <div>
              <p className="text-xs text-gray-400 dark:text-gray-400">Balance Inicial</p>
              <p className="text-sm text-gray-300 dark:text-gray-300">
                {formatCurrency(creditCard.initialBalance)}
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-400 dark:text-gray-400">Balance Actual</p>
              <p className={`text-sm font-semibold ${balanceColor}`}>
                {formatCurrency(balance)}
              </p>
            </div>
            {debt > 0 && (
              <div>
                <p className="text-xs text-gray-400 dark:text-gray-400">Deuda Pendiente</p>
                <p className={`text-sm font-semibold ${debtColor}`}>
                  {formatCurrency(debt)}
                </p>
              </div>
            )}
          </div>
        </div>
        {(onEdit || onDelete) && (
          <div className="flex gap-2 ml-4">
            {onEdit && (
              <button
                onClick={() => onEdit(creditCard)}
                disabled={isLoading}
                className="px-3 py-1.5 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Editar
              </button>
            )}
            {onDelete && (
              <button
                onClick={() => onDelete(creditCard)}
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

export default CreditCardCard;

