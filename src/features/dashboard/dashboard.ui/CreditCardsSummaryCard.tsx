import { Card } from '../../../shared/components';
import { formatCurrency } from '../../../shared/utils/formatters';
import type { CreditCardSummary } from '../dashboard.domain/dashboard.types';
import { LoadingSpinner } from '../../../shared/components';

interface CreditCardsSummaryCardProps {
  creditCards: CreditCardSummary[];
  loading?: boolean;
}

function CreditCardsSummaryCard({
  creditCards,
  loading = false,
}: CreditCardsSummaryCardProps) {
  if (loading) {
    return (
      <Card title="Tarjetas de Crédito" className="w-full">
        <LoadingSpinner label="Cargando tarjetas..." />
      </Card>
    );
  }

  if (creditCards.length === 0) {
    return (
      <Card title="Tarjetas de Crédito" className="w-full">
        <p className="text-gray-400 dark:text-gray-400 text-center py-4">
          No hay tarjetas de crédito registradas
        </p>
      </Card>
    );
  }

  const totalDebt = creditCards.reduce((sum, card) => sum + card.debt, 0);

  return (
    <Card title="Tarjetas de Crédito" className="w-full">
      <div className="space-y-3">
        {creditCards.map((card) => (
          <div
            key={card.id}
            className="flex items-center justify-between p-3 bg-gray-700 dark:bg-gray-700 rounded-lg hover:bg-gray-600 dark:hover:bg-gray-600 transition-colors"
          >
            <div className="flex-1">
              <p className="font-medium text-white dark:text-white">{card.name}</p>
            </div>
            <div className="text-right">
              <p className="font-semibold text-red-400 dark:text-red-400">
                {formatCurrency(card.debt)}
              </p>
            </div>
          </div>
        ))}

        {creditCards.length > 1 && (
          <div className="pt-3 mt-3 border-t border-gray-600">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-white dark:text-white">Deuda total:</span>
              <span className="font-bold text-red-400 dark:text-red-400 text-lg">
                {formatCurrency(totalDebt)}
              </span>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}

export default CreditCardsSummaryCard;

