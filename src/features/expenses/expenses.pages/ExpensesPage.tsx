import { useEffect, useState } from 'react';
import { Button } from '@heroui/react';
import { expensesService } from '../expenses.data/expenses.service';
import type {
  ExpenseWithRelations,
  ExpensesResponse,
  CreateExpenseDto,
  UpdateExpenseDto,
} from '../expenses.domain/expenses.types';
import { ExpenseCard, ExpenseForm } from '../expenses.ui';
import {
  LoadingSpinner,
  Layout,
  Modal,
  ConfirmDialog,
  EmptyState,
  ToastContainer,
  PageHeader,
} from '../../../shared/components';
import { useToast, useConfirm } from '../../../shared/hooks';
import { getErrorMessage } from '../../../shared/utils/error.utils';
import { SIDEBAR_MENU_ITEMS } from '../../../core/constants/menu.constants';
import { accountsService } from '../../accounts/accounts.data/accounts.service';
import { expenseTypesService } from '../../expense-types/expense-types.data/expense-types.service';
import type { Account } from '../../../shared/types/common.types';
import type { ExpenseType } from '../../../shared/types/common.types';

function ExpensesPage() {
  const [expenses, setExpenses] = useState<ExpenseWithRelations[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedExpense, setSelectedExpense] =
    useState<ExpenseWithRelations | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [filters, setFilters] = useState<{
    accountId?: number;
    expenseTypeId?: number;
    startDate?: string;
    endDate?: string;
  }>({});
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
  });
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [expenseTypes, setExpenseTypes] = useState<ExpenseType[]>([]);

  const { toasts, success, error: showError, removeToast } = useToast();
  const { confirm, confirmState } = useConfirm();

  const fetchExpenses = async () => {
    try {
      setLoading(true);
      setError(null);
      const response: ExpensesResponse = await expensesService.getAll({
        ...filters,
        page: pagination.page,
        limit: pagination.limit,
      });
      setExpenses(response.data);
      setPagination({
        ...pagination,
        total: response.meta.total,
        totalPages: response.meta.totalPages,
      });
    } catch (err) {
      const errorMessage = getErrorMessage(err, 'Error al cargar los gastos');
      setError(new Error(errorMessage));
      showError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, [pagination.page, filters]);

  useEffect(() => {
    const loadFiltersData = async () => {
      try {
        const [accountsResponse, expenseTypesResponse] = await Promise.all([
          accountsService.getAll({ limit: 100 }),
          expenseTypesService.getAll({ limit: 100 }),
        ]);
        setAccounts(accountsResponse.data);
        setExpenseTypes(expenseTypesResponse.data);
      } catch (err) {
        console.error('Error al cargar datos para filtros:', err);
      }
    };

    loadFiltersData();
  }, []);

  const handleCreate = () => {
    setSelectedExpense(null);
    setIsModalOpen(true);
  };

  const handleEdit = (expense: ExpenseWithRelations) => {
    setSelectedExpense(expense);
    setIsModalOpen(true);
  };

  const handleDelete = async (expense: ExpenseWithRelations) => {
    const confirmed = await confirm({
      title: 'Eliminar gasto',
      message: `¿Estás seguro de que deseas eliminar el gasto de ${expense.amount}? Esta acción no se puede deshacer.`,
      confirmLabel: 'Eliminar',
      cancelLabel: 'Cancelar',
      confirmColor: 'danger',
    });

    if (!confirmed) return;

    try {
      setIsSubmitting(true);
      await expensesService.delete(expense.id);
      success('Gasto eliminado exitosamente');
      await fetchExpenses();
    } catch (err) {
      const errorMessage = getErrorMessage(err, 'Error al eliminar el gasto');
      showError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmit = async (data: CreateExpenseDto | UpdateExpenseDto) => {
    try {
      setIsSubmitting(true);
      if (selectedExpense) {
        await expensesService.update(
          selectedExpense.id,
          data as UpdateExpenseDto
        );
        success('Gasto actualizado exitosamente');
      } else {
        await expensesService.create(data as CreateExpenseDto);
        success('Gasto creado exitosamente');
      }
      setIsModalOpen(false);
      setSelectedExpense(null);
      await fetchExpenses();
    } catch (err) {
      const defaultMessage = selectedExpense
        ? 'Error al actualizar el gasto'
        : 'Error al crear el gasto';
      const errorMessage = getErrorMessage(err, defaultMessage);
      showError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setSelectedExpense(null);
  };

  const handleFilterChange = (
    key: 'accountId' | 'expenseTypeId' | 'startDate' | 'endDate',
    value: string | number | undefined
  ) => {
    setFilters((prev) => ({
      ...prev,
      [key]:
        value === '' || value === undefined
          ? undefined
          : typeof value === 'string' && (key === 'startDate' || key === 'endDate')
          ? value
          : Number(value),
    }));
    setPagination((prev) => ({ ...prev, page: 1 }));
  };

  const content = (
    <>
      {/* Filtros */}
      <div className="mb-6 flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <select
            value={filters.accountId || ''}
            onChange={(e) =>
              handleFilterChange('accountId', e.target.value || undefined)
            }
            className="px-4 py-2 bg-gray-700 text-white rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Todas las cuentas</option>
            {accounts.map((account) => (
              <option key={account.id} value={account.id}>
                {account.name}
              </option>
            ))}
          </select>

          <select
            value={filters.expenseTypeId || ''}
            onChange={(e) =>
              handleFilterChange('expenseTypeId', e.target.value || undefined)
            }
            className="px-4 py-2 bg-gray-700 text-white rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Todos los tipos</option>
            {expenseTypes.map((expenseType) => (
              <option key={expenseType.id} value={expenseType.id}>
                {expenseType.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <input
            type="date"
            placeholder="Fecha inicio"
            value={filters.startDate || ''}
            onChange={(e) =>
              handleFilterChange('startDate', e.target.value || undefined)
            }
            className="px-4 py-2 bg-gray-700 text-white rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="date"
            placeholder="Fecha fin"
            value={filters.endDate || ''}
            onChange={(e) =>
              handleFilterChange('endDate', e.target.value || undefined)
            }
            className="px-4 py-2 bg-gray-700 text-white rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Loading State */}
      {loading && expenses.length === 0 && (
        <div className="mt-6">
          <LoadingSpinner label="Cargando gastos..." size="lg" />
        </div>
      )}

      {/* Error State */}
      {error && !loading && (
        <div className="mt-6">
          <div className="bg-red-900/30 border border-red-500 rounded-lg p-4">
            <p className="text-red-200 font-medium">Error al cargar los gastos</p>
            <p className="text-red-300 text-sm mt-1">
              {error.message || 'No se pudieron obtener los gastos'}
            </p>
            <button
              onClick={() => fetchExpenses()}
              className="mt-3 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
            >
              Reintentar
            </button>
          </div>
        </div>
      )}

      {/* Empty State */}
      {!loading && !error && expenses.length === 0 && (
        <EmptyState
          title="No hay gastos registrados"
          description="Comienza registrando tu primer gasto para llevar un control de tus egresos."
          action={{
            label: 'Registrar gasto',
            onClick: handleCreate,
          }}
        />
      )}

      {/* Expenses List */}
      {!loading && !error && expenses.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {expenses.map((expense) => (
            <ExpenseCard
              key={expense.id}
              expense={expense}
              onEdit={handleEdit}
              onDelete={handleDelete}
              isLoading={isSubmitting}
            />
          ))}
        </div>
      )}

      {/* Pagination */}
      {!loading && !error && pagination.totalPages > 1 && (
        <div className="mt-6 flex items-center justify-between">
          <p className="text-sm text-gray-400">
            Mostrando {expenses.length} de {pagination.total} gastos
          </p>
          <div className="flex gap-2">
            <Button
              size="sm"
              variant="flat"
              onPress={() =>
                setPagination((prev) => ({
                  ...prev,
                  page: Math.max(1, prev.page - 1),
                }))
              }
              isDisabled={pagination.page === 1}
            >
              Anterior
            </Button>
            <span className="px-4 py-2 text-sm text-gray-300">
              Página {pagination.page} de {pagination.totalPages}
            </span>
            <Button
              size="sm"
              variant="flat"
              onPress={() =>
                setPagination((prev) => ({
                  ...prev,
                  page: Math.min(prev.totalPages, prev.page + 1),
                }))
              }
              isDisabled={pagination.page === pagination.totalPages}
            >
              Siguiente
            </Button>
          </div>
        </div>
      )}

      {/* Create/Edit Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={handleCancel}
        title={selectedExpense ? 'Editar Gasto' : 'Nuevo Gasto'}
        size="lg"
      >
        <ExpenseForm
          expense={selectedExpense}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          isLoading={isSubmitting}
        />
      </Modal>

      {/* Confirm Dialog */}
      {confirmState && (
        <ConfirmDialog
          isOpen={confirmState.isOpen}
          onClose={confirmState.onCancel}
          onConfirm={confirmState.onConfirm}
          title={confirmState.title}
          message={confirmState.message}
          confirmLabel={confirmState.confirmLabel}
          cancelLabel={confirmState.cancelLabel}
          confirmColor={confirmState.confirmColor}
          isLoading={isSubmitting}
        />
      )}

      {/* Toast Container */}
      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </>
  );

  return (
    <Layout showSidebar sidebarItems={SIDEBAR_MENU_ITEMS}>
      <div className="p-6">
        <PageHeader
          title="Gastos"
          description="Registra y gestiona tus gastos por categoría"
          actions={
            <Button color="primary" onPress={handleCreate}>
              Nuevo Gasto
            </Button>
          }
        />
        {content}
      </div>
    </Layout>
  );
}

export default ExpensesPage;

