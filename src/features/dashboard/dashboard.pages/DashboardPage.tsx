import { useEffect, useState } from 'react';
import { dashboardService } from '../dashboard.data/dashboard.service';
import type { DashboardResponse } from '../dashboard.domain/dashboard.types';
import MoneyAvailableCard from '../dashboard.ui/MoneyAvailableCard';
import AccountsSummaryCard from '../dashboard.ui/AccountsSummaryCard';
import BudgetProgressCard from '../dashboard.ui/BudgetProgressCard';
import CreditCardsSummaryCard from '../dashboard.ui/CreditCardsSummaryCard';
import ExpensesChart from '../dashboard.ui/ExpensesChart';
import { LoadingSpinner, Layout } from '../../../shared/components';
import { SIDEBAR_MENU_ITEMS } from '../../../core/constants/menu.constants';

function DashboardPage() {
  const [dashboardData, setDashboardData] = useState<DashboardResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchDashboard = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await dashboardService.getDashboard();
      setDashboardData(data);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Error desconocido'));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  // Recargar datos cada 30 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      fetchDashboard();
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const content = (
    <>
      {loading && !dashboardData && (
        <div className="mt-6">
          <LoadingSpinner label="Cargando información del dashboard..." size="lg" />
        </div>
      )}

      {error && (
        <div className="mt-6">
          <div className="bg-red-900/30 border border-red-500 rounded-lg p-4">
            <p className="text-red-200 font-medium">Error al cargar el dashboard</p>
            <p className="text-red-300 text-sm mt-1">
              {error.message || 'No se pudo obtener la información del dashboard'}
            </p>
            <button
              onClick={() => fetchDashboard()}
              className="mt-3 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
            >
              Reintentar
            </button>
          </div>
        </div>
      )}

      {!loading && !error && !dashboardData && (
        <div className="mt-6">
          <p className="text-gray-400">No hay datos disponibles</p>
        </div>
      )}

      {!loading && !error && dashboardData && (
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Dinero Disponible - Ocupa toda la fila en desktop */}
          <div className="lg:col-span-2">
            <MoneyAvailableCard
              availableMoney={dashboardData.availableMoney}
              totalBalance={dashboardData.totalBalance}
              totalBudgetsAmount={dashboardData.totalBudgetsAmount}
              totalCreditCardDebt={dashboardData.totalCreditCardDebt}
              loading={loading}
            />
          </div>

          {/* Resumen de Cuentas */}
          <AccountsSummaryCard
            accounts={dashboardData.accounts || []}
            loading={loading}
          />

          {/* Presupuestos Activos */}
          <BudgetProgressCard
            budgets={dashboardData.activeBudgets || []}
            loading={loading}
          />

          {/* Gráfico de Gastos por Categoría - Ocupa toda la fila si hay presupuestos */}
          {dashboardData.activeBudgets?.length > 0 && (
            <div className="lg:col-span-2">
              <ExpensesChart
                budgets={dashboardData.activeBudgets || []}
                loading={loading}
              />
            </div>
          )}

          {/* Tarjetas de Crédito - Ocupa toda la fila si hay tarjetas */}
          {dashboardData.creditCards?.length > 0 && (
            <div className="lg:col-span-2">
              <CreditCardsSummaryCard
                creditCards={dashboardData.creditCards || []}
                loading={loading}
              />
            </div>
          )}
        </div>
      )}
    </>
  );

  return (
    <Layout showSidebar sidebarItems={SIDEBAR_MENU_ITEMS}>
      <div className="p-6">
        <h1 className="text-2xl font-bold text-white dark:text-white mb-6">Dashboard</h1>
        {content}
      </div>
    </Layout>
  );
}

export default DashboardPage;
