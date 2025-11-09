import { Card } from '../../../shared/components';
import { formatCurrency } from '../../../shared/utils/formatters';

interface MoneyAvailableCardProps {
  availableMoney: number;
  totalBalance: number;
  totalBudgetsAmount: number;
  totalCreditCardDebt: number;
  loading?: boolean;
}

function MoneyAvailableCard({
  availableMoney,
  totalBalance,
  totalBudgetsAmount,
  totalCreditCardDebt,
  loading = false,
}: MoneyAvailableCardProps) {
  if (loading) {
    return (
      <Card className="w-full">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/2 mb-4"></div>
          <div className="h-12 bg-gray-200 rounded w-3/4"></div>
        </div>
      </Card>
    );
  }

  const isPositive = availableMoney >= 0;
  const textColor = isPositive ? 'text-green-400 dark:text-green-400' : 'text-red-400 dark:text-red-400';

  return (
    <Card title="Dinero Disponible" className="w-full">
      <div className="space-y-4">
        <div>
          <p className="text-sm text-gray-300 dark:text-gray-300 mb-2">Total disponible para gastar</p>
          <p className={`text-3xl font-bold ${textColor}`}>
            {formatCurrency(availableMoney)}
          </p>
        </div>

        <div className="pt-4 border-t border-gray-700 dark:border-gray-700 space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-300 dark:text-gray-300">Balance total:</span>
            <span className="font-medium text-white dark:text-white">{formatCurrency(totalBalance)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-300 dark:text-gray-300">Presupuestos asignados:</span>
            <span className="font-medium text-orange-400 dark:text-orange-400">
              -{formatCurrency(totalBudgetsAmount)}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-300 dark:text-gray-300">Deuda tarjetas:</span>
            <span className="font-medium text-red-400 dark:text-red-400">
              -{formatCurrency(totalCreditCardDebt)}
            </span>
          </div>
        </div>
      </div>
    </Card>
  );
}

export default MoneyAvailableCard;

