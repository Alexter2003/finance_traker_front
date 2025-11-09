import { Card } from '../../../shared/components';
import { formatCurrency, formatDate } from '../../../shared/utils/formatters';
import {
  getBudgetStatusLabel,
  getBudgetStatusColor,
  formatBudgetInfo,
  getUsageColor,
} from '../budgets.domain/budgets.utils';
import type { Budget } from '../budgets.domain/budgets.types';

interface BudgetCardProps {
  budget: Budget;
  onEdit?: (budget: Budget) => void;
  onDelete?: (budget: Budget) => void;
  isLoading?: boolean;
}

function BudgetCard({ budget, onEdit, onDelete, isLoading = false }: BudgetCardProps) {
  const statusLabel = getBudgetStatusLabel(budget.isActive);
  const statusColor = getBudgetStatusColor(budget.isActive);
  const budgetInfo = formatBudgetInfo(budget);
  const usageColor = getUsageColor(budgetInfo.usagePercentage);

  return (
    <Card className="w-full">
      <div className="flex flex-col gap-4">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-white dark:text-white mb-1">
              {budget.expenseType?.name || `Tipo de Gasto #${budget.expenseTypeId}`}
            </h3>
            <p className="text-sm text-gray-300 dark:text-gray-300">
              <span className={statusColor}>{statusLabel}</span>
            </p>
          </div>
          {(onEdit || onDelete) && (
            <div className="flex gap-2 ml-4">
              {onEdit && (
                <button
                  onClick={() => onEdit(budget)}
                  disabled={isLoading}
                  className="px-3 py-1.5 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Editar
                </button>
              )}
              {onDelete && (
                <button
                  onClick={() => onDelete(budget)}
                  disabled={isLoading}
                  className="px-3 py-1.5 text-sm bg-red-600 hover:bg-red-700 text-white rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Eliminar
                </button>
              )}
            </div>
          )}
        </div>

        {/* Fechas */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-xs text-gray-400 dark:text-gray-400">Fecha Inicio</p>
            <p className="text-sm text-gray-300 dark:text-gray-300">
              {formatDate(budget.startDate)}
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-400 dark:text-gray-400">Fecha Fin</p>
            <p className="text-sm text-gray-300 dark:text-gray-300">
              {formatDate(budget.endDate)}
            </p>
          </div>
        </div>

        {/* Montos */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-xs text-gray-400 dark:text-gray-400">Monto Mensual</p>
            <p className="text-sm text-gray-300 dark:text-gray-300">
              {formatCurrency(budget.monthlyAmount)}
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-400 dark:text-gray-400">Monto Quincenal</p>
            <p className="text-sm text-gray-300 dark:text-gray-300">
              {formatCurrency(budget.biweeklyAmount)}
            </p>
          </div>
        </div>

        {/* Información del presupuesto */}
        {budget.totalAvailable !== undefined && (
          <div className="border-t border-gray-700 pt-4 space-y-2">
            <div className="flex justify-between items-center">
              <p className="text-xs text-gray-400 dark:text-gray-400">Total Disponible</p>
              <p className="text-sm font-semibold text-gray-300 dark:text-gray-300">
                {budgetInfo.totalAvailable}
              </p>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-xs text-gray-400 dark:text-gray-400">Gastado</p>
              <p className={`text-sm font-semibold ${usageColor}`}>
                {budgetInfo.spentAmount}
              </p>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-xs text-gray-400 dark:text-gray-400">Disponible</p>
              <p className={`text-sm font-semibold ${getUsageColor(100 - budgetInfo.usagePercentage)}`}>
                {budgetInfo.availableAmount}
              </p>
            </div>
            <div className="mt-2">
              <div className="flex justify-between items-center mb-1">
                <p className="text-xs text-gray-400 dark:text-gray-400">Uso del Presupuesto</p>
                <p className={`text-xs font-semibold ${usageColor}`}>
                  {budgetInfo.usagePercentage.toFixed(1)}%
                </p>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div
                  className={`h-2 rounded-full transition-all ${
                    budgetInfo.usagePercentage >= 100
                      ? 'bg-red-500'
                      : budgetInfo.usagePercentage >= 80
                      ? 'bg-yellow-500'
                      : 'bg-green-500'
                  }`}
                  style={{ width: `${Math.min(100, budgetInfo.usagePercentage)}%` }}
                />
              </div>
            </div>
          </div>
        )}

        {/* Pending Amount */}
        {budget.pendingAmount !== undefined && budget.pendingAmount > 0 && (
          <div className="border-t border-gray-700 pt-2">
            <p className="text-xs text-gray-400 dark:text-gray-400">Saldo Pendiente</p>
            <p className="text-sm text-yellow-400 dark:text-yellow-400">
              {formatCurrency(budget.pendingAmount)}
            </p>
          </div>
        )}
      </div>
    </Card>
  );
}

export default BudgetCard;

