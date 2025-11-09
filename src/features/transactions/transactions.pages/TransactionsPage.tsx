import { useEffect, useState } from 'react';
import { Button } from '@heroui/react';
import { transactionsService } from '../transactions.data/transactions.service';
import type {
  TransactionWithRelations,
  TransactionsResponse,
  CreateTransactionDto,
  UpdateTransactionDto,
} from '../transactions.domain/transactions.types';
import { TransactionCard, TransactionForm } from '../transactions.ui';
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
import type { Account } from '../../../shared/types/common.types';

function TransactionsPage() {
  const [transactions, setTransactions] = useState<TransactionWithRelations[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] =
    useState<TransactionWithRelations | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [filters, setFilters] = useState<{
    fromAccountId?: number;
    toAccountId?: number;
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

  const { toasts, success, error: showError, removeToast } = useToast();
  const { confirm, confirmState } = useConfirm();

  const fetchTransactions = async () => {
    try {
      setLoading(true);
      setError(null);
      const response: TransactionsResponse = await transactionsService.getAll({
        ...filters,
        page: pagination.page,
        limit: pagination.limit,
      });
      setTransactions(response.data);
      setPagination({
        ...pagination,
        total: response.meta.total,
        totalPages: response.meta.totalPages,
      });
    } catch (err) {
      const errorMessage = getErrorMessage(err, 'Error al cargar las transacciones');
      setError(new Error(errorMessage));
      showError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, [pagination.page, filters]);

  useEffect(() => {
    const loadFiltersData = async () => {
      try {
        const accountsResponse = await accountsService.getAll({ limit: 100 });
        setAccounts(accountsResponse.data);
      } catch (err) {
        console.error('Error al cargar datos para filtros:', err);
      }
    };

    loadFiltersData();
  }, []);

  const handleCreate = () => {
    setSelectedTransaction(null);
    setIsModalOpen(true);
  };

  const handleEdit = (transaction: TransactionWithRelations) => {
    setSelectedTransaction(transaction);
    setIsModalOpen(true);
  };

  const handleDelete = async (transaction: TransactionWithRelations) => {
    const confirmed = await confirm({
      title: 'Eliminar transacción',
      message: `¿Estás seguro de que deseas eliminar la transacción de ${transaction.amount}? Esta acción no se puede deshacer.`,
      confirmLabel: 'Eliminar',
      cancelLabel: 'Cancelar',
      confirmColor: 'danger',
    });

    if (!confirmed) return;

    try {
      setIsSubmitting(true);
      await transactionsService.delete(transaction.id);
      success('Transacción eliminada exitosamente');
      await fetchTransactions();
    } catch (err) {
      const errorMessage = getErrorMessage(err, 'Error al eliminar la transacción');
      showError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmit = async (data: CreateTransactionDto | UpdateTransactionDto) => {
    try {
      setIsSubmitting(true);
      if (selectedTransaction) {
        await transactionsService.update(
          selectedTransaction.id,
          data as UpdateTransactionDto
        );
        success('Transacción actualizada exitosamente');
      } else {
        await transactionsService.create(data as CreateTransactionDto);
        success('Transacción creada exitosamente');
      }
      setIsModalOpen(false);
      setSelectedTransaction(null);
      await fetchTransactions();
    } catch (err) {
      const defaultMessage = selectedTransaction
        ? 'Error al actualizar la transacción'
        : 'Error al crear la transacción';
      const errorMessage = getErrorMessage(err, defaultMessage);
      showError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setSelectedTransaction(null);
  };

  const handleFilterChange = (
    key: 'fromAccountId' | 'toAccountId' | 'startDate' | 'endDate',
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
            value={filters.fromAccountId || ''}
            onChange={(e) =>
              handleFilterChange('fromAccountId', e.target.value || undefined)
            }
            className="px-4 py-2 bg-gray-700 text-white rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Todas las cuentas de origen</option>
            {accounts.map((account) => (
              <option key={account.id} value={account.id}>
                {account.name}
              </option>
            ))}
          </select>

          <select
            value={filters.toAccountId || ''}
            onChange={(e) =>
              handleFilterChange('toAccountId', e.target.value || undefined)
            }
            className="px-4 py-2 bg-gray-700 text-white rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Todas las cuentas de destino</option>
            {accounts.map((account) => (
              <option key={account.id} value={account.id}>
                {account.name}
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
      {loading && transactions.length === 0 && (
        <div className="mt-6">
          <LoadingSpinner label="Cargando transacciones..." size="lg" />
        </div>
      )}

      {/* Error State */}
      {error && !loading && (
        <div className="mt-6">
          <div className="bg-red-900/30 border border-red-500 rounded-lg p-4">
            <p className="text-red-200 font-medium">Error al cargar las transacciones</p>
            <p className="text-red-300 text-sm mt-1">
              {error.message || 'No se pudieron obtener las transacciones'}
            </p>
            <button
              onClick={() => fetchTransactions()}
              className="mt-3 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
            >
              Reintentar
            </button>
          </div>
        </div>
      )}

      {/* Empty State */}
      {!loading && !error && transactions.length === 0 && (
        <EmptyState
          title="No hay transacciones registradas"
          description="Comienza creando tu primera transacción para transferir dinero entre cuentas."
          action={{
            label: 'Crear transacción',
            onClick: handleCreate,
          }}
        />
      )}

      {/* Transactions List */}
      {!loading && !error && transactions.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {transactions.map((transaction) => (
            <TransactionCard
              key={transaction.id}
              transaction={transaction}
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
            Mostrando {transactions.length} de {pagination.total} transacciones
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
        title={selectedTransaction ? 'Editar Transacción' : 'Nueva Transacción'}
        size="lg"
      >
        <TransactionForm
          transaction={selectedTransaction}
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
          title="Transacciones"
          description="Gestiona las transferencias de dinero entre tus cuentas"
          actions={
            <Button color="primary" onPress={handleCreate}>
              Nueva Transacción
            </Button>
          }
        />
        {content}
      </div>
    </Layout>
  );
}

export default TransactionsPage;

