import { useEffect, useState } from 'react';
import { Button } from '@heroui/react';
import { accountsService } from '../accounts.data/accounts.service';
import type {
  Account,
  AccountsResponse,
  CreateAccountDto,
  UpdateAccountDto,
} from '../accounts.domain/accounts.types';
import { AccountCard, AccountForm } from '../accounts.ui';
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
import { AccountType } from '../../../shared/types/common.types';

function AccountsPage() {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState<Account | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [filters, setFilters] = useState<{
    type?: AccountType;
    search?: string;
  }>({});
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
  });

  const { toasts, success, error: showError, removeToast } = useToast();
  const { confirm, confirmState } = useConfirm();

  const fetchAccounts = async () => {
    try {
      setLoading(true);
      setError(null);
      const response: AccountsResponse = await accountsService.getAll({
        ...filters,
        page: pagination.page,
        limit: pagination.limit,
      });
      setAccounts(response.data);
      setPagination({
        ...pagination,
        total: response.meta.total,
        totalPages: response.meta.totalPages,
      });
    } catch (err) {
      const errorMessage = getErrorMessage(err, 'Error al cargar las cuentas');
      setError(new Error(errorMessage));
      showError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAccounts();
  }, [pagination.page, filters]);

  const handleCreate = () => {
    setSelectedAccount(null);
    setIsModalOpen(true);
  };

  const handleEdit = (account: Account) => {
    setSelectedAccount(account);
    setIsModalOpen(true);
  };

  const handleDelete = async (account: Account) => {
    const confirmed = await confirm({
      title: 'Eliminar cuenta',
      message: `¿Estás seguro de que deseas eliminar la cuenta "${account.name}"? Esta acción no se puede deshacer.`,
      confirmLabel: 'Eliminar',
      cancelLabel: 'Cancelar',
      confirmColor: 'danger',
    });

    if (!confirmed) return;

    try {
      setIsSubmitting(true);
      await accountsService.delete(account.id);
      success('Cuenta eliminada exitosamente');
      await fetchAccounts();
    } catch (err) {
      const errorMessage = getErrorMessage(err, 'Error al eliminar la cuenta');
      showError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmit = async (data: CreateAccountDto | UpdateAccountDto) => {
    try {
      setIsSubmitting(true);
      if (selectedAccount) {
        await accountsService.update(selectedAccount.id, data as UpdateAccountDto);
        success('Cuenta actualizada exitosamente');
      } else {
        await accountsService.create(data as CreateAccountDto);
        success('Cuenta creada exitosamente');
      }
      setIsModalOpen(false);
      setSelectedAccount(null);
      await fetchAccounts();
    } catch (err) {
      const defaultMessage = selectedAccount
        ? 'Error al actualizar la cuenta'
        : 'Error al crear la cuenta';
      const errorMessage = getErrorMessage(err, defaultMessage);
      showError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setSelectedAccount(null);
  };

  const handleFilterChange = (key: 'type' | 'search', value: string | undefined) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value || undefined,
    }));
    setPagination((prev) => ({ ...prev, page: 1 }));
  };

  const content = (
    <>
      {/* Filtros */}
      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        <input
          type="text"
          placeholder="Buscar por nombre..."
          value={filters.search || ''}
          onChange={(e) => handleFilterChange('search', e.target.value)}
          className="px-4 py-2 bg-gray-700 text-white rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 flex-1"
        />
        <select
          value={filters.type || ''}
          onChange={(e) =>
            handleFilterChange('type', e.target.value || undefined)
          }
          className="px-4 py-2 bg-gray-700 text-white rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Todos los tipos</option>
          <option value="CASH">Efectivo</option>
          <option value="BANK">Banco</option>
          <option value="SAVINGS">Ahorros</option>
          <option value="CREDIT_CARD">Tarjeta de Crédito</option>
          <option value="OTHER">Otro</option>
        </select>
      </div>

      {/* Loading State */}
      {loading && accounts.length === 0 && (
        <div className="mt-6">
          <LoadingSpinner label="Cargando cuentas..." size="lg" />
        </div>
      )}

      {/* Error State */}
      {error && !loading && (
        <div className="mt-6">
          <div className="bg-red-900/30 border border-red-500 rounded-lg p-4">
            <p className="text-red-200 font-medium">Error al cargar las cuentas</p>
            <p className="text-red-300 text-sm mt-1">
              {error.message || 'No se pudieron obtener las cuentas'}
            </p>
            <button
              onClick={() => fetchAccounts()}
              className="mt-3 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
            >
              Reintentar
            </button>
          </div>
        </div>
      )}

      {/* Empty State */}
      {!loading && !error && accounts.length === 0 && (
        <EmptyState
          title="No hay cuentas registradas"
          description="Comienza creando tu primera cuenta para gestionar tus finanzas."
          action={{
            label: 'Crear cuenta',
            onClick: handleCreate,
          }}
        />
      )}

      {/* Accounts List */}
      {!loading && !error && accounts.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {accounts.map((account) => (
            <AccountCard
              key={account.id}
              account={account}
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
            Mostrando {accounts.length} de {pagination.total} cuentas
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
        title={selectedAccount ? 'Editar Cuenta' : 'Nueva Cuenta'}
        size="lg"
      >
        <AccountForm
          account={selectedAccount}
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
          title="Cuentas"
          description="Gestiona tus cuentas bancarias, efectivo y otros tipos de cuentas"
          actions={
            <Button color="primary" onPress={handleCreate}>
              Nueva Cuenta
            </Button>
          }
        />
        {content}
      </div>
    </Layout>
  );
}

export default AccountsPage;

