import { Card } from '../../../shared/components';
import { formatCurrency } from '../../../shared/utils/formatters';
import { getAccountTypeLabel } from '../dashboard.domain/dashboard.utils';
import type { AccountSummary } from '../dashboard.domain/dashboard.types';
import { LoadingSpinner } from '../../../shared/components';

interface AccountsSummaryCardProps {
  accounts: AccountSummary[];
  loading?: boolean;
}

function AccountsSummaryCard({ accounts, loading = false }: AccountsSummaryCardProps) {
  if (loading) {
    return (
      <Card title="Resumen de Cuentas" className="w-full">
        <LoadingSpinner label="Cargando cuentas..." />
      </Card>
    );
  }

  if (accounts.length === 0) {
    return (
      <Card title="Resumen de Cuentas" className="w-full">
        <p className="text-gray-400 dark:text-gray-400 text-center py-4">
          No hay cuentas registradas
        </p>
      </Card>
    );
  }

  return (
    <Card title="Resumen de Cuentas" className="w-full">
      <div className="space-y-3">
        {accounts.map((account) => {
          const isPositive = account.balance >= 0;
          const balanceColor = isPositive ? 'text-green-400 dark:text-green-400' : 'text-red-400 dark:text-red-400';

          return (
            <div
              key={account.id}
              className="flex items-center justify-between p-3 bg-gray-700 dark:bg-gray-700 rounded-lg hover:bg-gray-600 dark:hover:bg-gray-600 transition-colors"
            >
              <div className="flex-1">
                <p className="font-medium text-white dark:text-white">{account.name}</p>
                <p className="text-sm text-gray-300 dark:text-gray-300">
                  {getAccountTypeLabel(account.type)}
                </p>
              </div>
              <div className="text-right">
                <p className={`font-semibold ${balanceColor}`}>
                  {formatCurrency(account.balance)}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}

export default AccountsSummaryCard;

