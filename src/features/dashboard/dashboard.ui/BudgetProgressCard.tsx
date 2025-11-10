import { Card } from '../../../shared/components';
import { formatCurrency } from '../../../shared/utils/formatters';
import {
  calculateBudgetProgress,
  formatBudgetPeriod,
  isBudgetNearExpiry,
} from '../dashboard.domain/dashboard.utils';
import type { BudgetSummary } from '../dashboard.domain/dashboard.types';
import { LoadingSpinner } from '../../../shared/components';

interface BudgetProgressCardProps {
  budgets: BudgetSummary[];
  loading?: boolean;
}

function BudgetProgressCard({ budgets, loading = false }: BudgetProgressCardProps) {
  if (loading) {
    return (
      <Card title="Presupuestos Activos" className="w-full">
        <LoadingSpinner label="Cargando presupuestos..." />
      </Card>
    );
  }

  if (budgets.length === 0) {
    return (
      <Card title="Presupuestos Activos" className="w-full">
        <p className="text-gray-400 dark:text-gray-400 text-center py-4">
          No hay presupuestos activos
        </p>
      </Card>
    );
  }

  return (
    <Card title="Presupuestos Activos" className="w-full">
      <div className="space-y-4">
        {budgets.map((budget) => {
          const progress = calculateBudgetProgress(budget.startDate, budget.endDate);
          const nearExpiry = isBudgetNearExpiry(budget.endDate);
          const progressColor = nearExpiry ? 'danger' : 'primary';

          return (
            <div
              key={budget.id}
              className={`p-4 rounded-lg border ${
                nearExpiry ? 'border-orange-500 bg-orange-900/30' : 'border-gray-700 bg-gray-700'
              }`}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <p className="font-semibold text-white dark:text-white">
                    {budget.expenseTypeName}
                  </p>
                  <p className="text-sm text-gray-300 dark:text-gray-300 mt-1">
                    {formatBudgetPeriod(budget.startDate, budget.endDate)}
                  </p>
                </div>
                {nearExpiry && (
                  <span className="px-2 py-1 text-xs font-medium text-orange-200 bg-orange-600 rounded">
                    Próximo a vencer
                  </span>
                )}
              </div>

              <div className="mt-3">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm text-gray-300 dark:text-gray-300">Progreso del período</span>
                  <span className="text-sm font-medium text-white dark:text-white">{progress}%</span>
                </div>
                <div className="w-full bg-gray-600 rounded-full h-2.5">
                  <div
                    className={`h-2.5 rounded-full transition-all duration-300 ${
                      progressColor === 'danger'
                        ? 'bg-orange-500'
                        : 'bg-blue-500'
                    }`}
                    style={{ width: `${progress}%` }}
                    role="progressbar"
                    aria-valuenow={progress}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-label={`Progreso del presupuesto ${budget.expenseTypeName}`}
                  />
                </div>
              </div>

              <div className="mt-3 pt-3 border-t border-gray-600">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-300 dark:text-gray-300">Monto quincenal:</span>
                  <span className="font-semibold text-white dark:text-white">
                    {formatCurrency(budget.biweeklyAmount)}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}

export default BudgetProgressCard;

