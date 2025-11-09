import { useEffect, useState } from 'react';
import { Button } from '@heroui/react';
import { accountAdjustmentsService } from '../account-adjustments.data/account-adjustments.service';
import type {
  AccountAdjustment,
  AccountAdjustmentsResponse,
  CreateAccountAdjustmentDto,
  UpdateAccountAdjustmentDto,
} from '../account-adjustments.domain/account-adjustments.types';
import {
  AccountAdjustmentCard,
  AccountAdjustmentForm,
} from '../account-adjustments.ui';
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

function AccountAdjustmentsPage() {
  const [adjustments, setAdjustments] = useState<AccountAdjustment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAdjustment, setSelectedAdjustment] =
    useState<AccountAdjustment | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [filters, setFilters] = useState<{
    accountId?: number;
    startDate?: string;
    endDate?: string;
  }>({});
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
  });

  const { toasts, success, error: showError, removeToast } = useToast();
  const { confirm, confirmState } = useConfirm();

  const fetchAdjustments = async () => {
    try {
      setLoading(true);
      setError(null);
      const response: AccountAdjustmentsResponse =
        await accountAdjustmentsService.getAll({
          ...filters,
          page: pagination.page,
          limit: pagination.limit,
        });
      setAdjustments(response.data);
      setPagination({
        ...pagination,
        total: response.meta.total,
        totalPages: response.meta.totalPages,
      });
    } catch (err) {
      const errorMessage = getErrorMessage(
        err,
        'Error al cargar los ajustes de cuenta'
      );
      setError(new Error(errorMessage));
      showError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdjustments();
  }, [pagination.page, filters]);

  const handleCreate = () => {
    setSelectedAdjustment(null);
    setIsModalOpen(true);
  };

  const handleEdit = (adjustment: AccountAdjustment) => {
    setSelectedAdjustment(adjustment);
    setIsModalOpen(true);
  };

  const handleDelete = async (adjustment: AccountAdjustment) => {
    const confirmed = await confirm({
      title: 'Eliminar ajuste de cuenta',
      message: `¿Estás seguro de que deseas eliminar este ajuste? Esta acción no se puede deshacer.`,
      confirmLabel: 'Eliminar',
      cancelLabel: 'Cancelar',
      confirmColor: 'danger',
    });

    if (!confirmed) return;

    try {
      setIsSubmitting(true);
      await accountAdjustmentsService.delete(adjustment.id);
      success('Ajuste de cuenta eliminado exitosamente');
      await fetchAdjustments();
    } catch (err) {
      const errorMessage = getErrorMessage(
        err,
        'Error al eliminar el ajuste de cuenta'
      );
      showError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmit = async (
    data: CreateAccountAdjustmentDto | UpdateAccountAdjustmentDto
  ) => {
    try {
      setIsSubmitting(true);
      if (selectedAdjustment) {
        await accountAdjustmentsService.update(
          selectedAdjustment.id,
          data as UpdateAccountAdjustmentDto
        );
        success('Ajuste de cuenta actualizado exitosamente');
      } else {
        await accountAdjustmentsService.create(
          data as CreateAccountAdjustmentDto
        );
        success('Ajuste de cuenta creado exitosamente');
      }
      setIsModalOpen(false);
      setSelectedAdjustment(null);
      await fetchAdjustments();
    } catch (err) {
      const defaultMessage = selectedAdjustment
        ? 'Error al actualizar el ajuste de cuenta'
        : 'Error al crear el ajuste de cuenta';
      const errorMessage = getErrorMessage(err, defaultMessage);
      showError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setSelectedAdjustment(null);
  };

  const handleFilterChange = (
    key: 'accountId' | 'startDate' | 'endDate',
    value: string | number | undefined
  ) => {
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
          type="number"
          placeholder="ID de cuenta..."
          value={filters.accountId || ''}
          onChange={(e) =>
            handleFilterChange(
              'accountId',
              e.target.value ? Number(e.target.value) : undefined
            )
          }
          className="px-4 py-2 bg-gray-700 text-white rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="date"
          placeholder="Fecha inicio..."
          value={filters.startDate || ''}
          onChange={(e) =>
            handleFilterChange('startDate', e.target.value || undefined)
          }
          className="px-4 py-2 bg-gray-700 text-white rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="date"
          placeholder="Fecha fin..."
          value={filters.endDate || ''}
          onChange={(e) =>
            handleFilterChange('endDate', e.target.value || undefined)
          }
          className="px-4 py-2 bg-gray-700 text-white rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {(filters.accountId ||
          filters.startDate ||
          filters.endDate) && (
          <Button
            size="sm"
            variant="flat"
            onPress={() => {
              setFilters({});
              setPagination((prev) => ({ ...prev, page: 1 }));
            }}
          >
            Limpiar filtros
          </Button>
        )}
      </div>

      {/* Loading State */}
      {loading && adjustments.length === 0 && (
        <div className="mt-6">
          <LoadingSpinner label="Cargando ajustes de cuenta..." size="lg" />
        </div>
      )}

      {/* Error State */}
      {error && !loading && (
        <div className="mt-6">
          <div className="bg-red-900/30 border border-red-500 rounded-lg p-4">
            <p className="text-red-200 font-medium">
              Error al cargar los ajustes de cuenta
            </p>
            <p className="text-red-300 text-sm mt-1">
              {error.message || 'No se pudieron obtener los ajustes'}
            </p>
            <button
              onClick={() => fetchAdjustments()}
              className="mt-3 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
            >
              Reintentar
            </button>
          </div>
        </div>
      )}

      {/* Empty State */}
      {!loading && !error && adjustments.length === 0 && (
        <EmptyState
          title="No hay ajustes de cuenta registrados"
          description="Comienza creando tu primer ajuste de cuenta para corregir diferencias en tus cuentas."
          action={{
            label: 'Crear ajuste',
            onClick: handleCreate,
          }}
        />
      )}

      {/* Adjustments List */}
      {!loading && !error && adjustments.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {adjustments.map((adjustment) => (
            <AccountAdjustmentCard
              key={adjustment.id}
              adjustment={adjustment}
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
            Mostrando {adjustments.length} de {pagination.total} ajustes
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
        title={
          selectedAdjustment ? 'Editar Ajuste de Cuenta' : 'Nuevo Ajuste de Cuenta'
        }
        size="lg"
      >
        <AccountAdjustmentForm
          adjustment={selectedAdjustment}
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
          title="Ajustes de Cuenta"
          description="Gestiona los ajustes manuales de tus cuentas para corregir diferencias"
          actions={
            <Button color="primary" onPress={handleCreate}>
              Nuevo Ajuste
            </Button>
          }
        />
        {content}
      </div>
    </Layout>
  );
}

export default AccountAdjustmentsPage;

