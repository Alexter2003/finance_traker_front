import { useMemo } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Card } from '../../../shared/components';
import { formatCurrency } from '../../../shared/utils/formatters';
import { LoadingSpinner } from '../../../shared/components';
import type { BudgetSummary } from '../dashboard.domain/dashboard.types';

interface ExpensesChartProps {
  budgets: BudgetSummary[];
  loading?: boolean;
}

function ExpensesChart({ budgets, loading = false }: ExpensesChartProps) {
  // Agrupar presupuestos por categoría y sumar montos
  const expensesByCategory = useMemo(() => {
    const grouped = budgets.reduce((acc, budget) => {
      const category = budget.expenseTypeName;
      if (acc[category]) {
        acc[category] += budget.biweeklyAmount;
      } else {
        acc[category] = budget.biweeklyAmount;
      }
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(grouped).map(([category, amount]) => ({
      name: category,
      y: amount,
    }));
  }, [budgets]);

  const chartOptions: Highcharts.Options = useMemo(() => {
    return {
      chart: {
        type: 'pie',
        backgroundColor: 'transparent',
        height: 400,
      },
      title: {
        text: '',
        style: {
          color: '#e5e7eb',
        },
      },
      tooltip: {
        backgroundColor: '#1f2937',
        borderColor: '#374151',
        borderRadius: 8,
        style: {
          color: '#e5e7eb',
        },
        formatter: function () {
          const point = this.point || (this as any).points?.[0];
          if (!point) return '';
          const percentage = point.percentage || 0;
          return `
            <b>${point.name}</b><br/>
            Monto: <b>${formatCurrency(point.y as number)}</b><br/>
            Porcentaje: <b>${percentage.toFixed(1)}%</b>
          `;
        },
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: {
            enabled: true,
            format: '<b>{point.name}</b>: {point.percentage:.1f}%',
            style: {
              color: '#e5e7eb',
              textOutline: 'none',
            },
            distance: -30,
          },
          showInLegend: true,
          colors: [
            '#3b82f6', // blue
            '#10b981', // green
            '#f59e0b', // amber
            '#ef4444', // red
            '#8b5cf6', // purple
            '#ec4899', // pink
            '#06b6d4', // cyan
            '#f97316', // orange
            '#84cc16', // lime
            '#6366f1', // indigo
          ],
        },
      },
      legend: {
        itemStyle: {
          color: '#e5e7eb',
        },
        itemHoverStyle: {
          color: '#9ca3af',
        },
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'middle',
      },
      series: [
        {
          name: 'Gastos por Categoría',
          type: 'pie',
          data: expensesByCategory,
        },
      ],
      credits: {
        enabled: false,
      },
    };
  }, [expensesByCategory]);

  if (loading) {
    return (
      <Card title="Gastos por Categoría" className="w-full">
        <LoadingSpinner label="Cargando gráfico de gastos..." />
      </Card>
    );
  }

  if (budgets.length === 0) {
    return (
      <Card title="Gastos por Categoría" className="w-full">
        <p className="text-gray-400 dark:text-gray-400 text-center py-8">
          No hay presupuestos activos para mostrar
        </p>
      </Card>
    );
  }

  if (expensesByCategory.length === 0) {
    return (
      <Card title="Gastos por Categoría" className="w-full">
        <p className="text-gray-400 dark:text-gray-400 text-center py-8">
          No hay datos disponibles para el gráfico
        </p>
      </Card>
    );
  }

  return (
    <Card title="Gastos por Categoría" className="w-full">
      <div className="w-full">
        <HighchartsReact highcharts={Highcharts} options={chartOptions} />
      </div>
      <div className="mt-4 pt-4 border-t border-gray-700 dark:border-gray-700">
        <p className="text-sm text-gray-400 dark:text-gray-400 text-center">
          Distribución de gastos planificados por categoría (basado en presupuestos activos)
        </p>
      </div>
    </Card>
  );
}

export default ExpensesChart;

