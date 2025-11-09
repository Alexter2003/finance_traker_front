import { useEffect, useState } from 'react';
import { Button } from '@heroui/react';
import { incomesService } from '../incomes.data/incomes.service';
import type {
  IncomeWithRelations,
  IncomesResponse,
  CreateIncomeDto,
  UpdateIncomeDto,
} from '../incomes.domain/incomes.types';
import { IncomeCard, IncomeForm } from '../incomes.ui';
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

function IncomesPage() {
  const [incomes, setIncomes] = useState<IncomeWithRelations[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedIncome, setSelectedIncome] = useState<IncomeWithRelations | null>(null);
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

  const fetchIncomes = async () => {
    try {
      setLoading(true);
      setError(null);
      const response: IncomesResponse = await incomesService.getAll({
        ...filters,
        page: pagination.page,
        limit: pagination.limit,
      });
      setIncomes(response.data);
      setPagination({
        ...pagination,
        total: response.meta.total,
        totalPages: response.meta.totalPages,
      });
    } catch (err) {
      const errorMessage = getErrorMessage(err, 'Error al cargar los ingresos');
      setError(new Error(errorMessage));
      showError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchIncomes();
  }, [pagination.page, filters]);

  const handleCreate = () => {
    setSelectedIncome(null);
    setIsModalOpen(true);
  };

  const handleEdit = (income: IncomeWithRelations) => {
    setSelectedIncome(income);
    setIsModalOpen(true);
  };

  const handleDelete = async (income: IncomeWithRelations) => {
    const confirmed = await confirm({
      title: 'Eliminar ingreso',
      message: `¿Estás seguro de que deseas eliminar el ingreso de ${income.amount}? Esta acción no se puede deshacer.`,
      confirmLabel: 'Eliminar',
      cancelLabel: 'Cancelar',
      confirmColor: 'danger',
    });

    if (!confirmed) return;

    try {
      setIsSubmitting(true);
      await incomesService.delete(income.id);
      success('Ingreso eliminado exitosamente');
      await fetchIncomes();
    } catch (err) {
      const errorMessage = getErrorMessage(err, 'Error al eliminar el ingreso');
      showError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmit = async (data: CreateIncomeDto | UpdateIncomeDto) => {
    try {
      setIsSubmitting(true);
      if (selectedIncome) {
        await incomesService.update(selectedIncome.id, data as UpdateIncomeDto);
        success('Ingreso actualizado exitosamente');
      } else {
        await incomesService.create(data as CreateIncomeDto);
        success('Ingreso creado exitosamente');
      }
      setIsModalOpen(false);
      setSelectedIncome(null);
      await fetchIncomes();
    } catch (err) {
      const defaultMessage = selectedIncome
        ? 'Error al actualizar el ingreso'
        : 'Error al crear el ingreso';
      const errorMessage = getErrorMessage(err, defaultMessage);
      showError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setSelectedIncome(null);
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
          placeholder="ID de cuenta (opcional)..."
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
        {(filters.accountId || filters.startDate || filters.endDate) && (
          <Button
            size="sm"
            variant="flat"
            onPress={() => setFilters({})}
            className="whitespace-nowrap"
          >
            Limpiar filtros
          </Button>
        )}
      </div>

      {/* Loading State */}
      {loading && incomes.length === 0 && (
        <div className="mt-6">
          <LoadingSpinner label="Cargando ingresos..." size="lg" />
        </div>
      )}

      {/* Error State */}
      {error && !loading && (
        <div className="mt-6">
          <div className="bg-red-900/30 border border-red-500 rounded-lg p-4">
            <p className="text-red-200 font-medium">Error al cargar los ingresos</p>
            <p className="text-red-300 text-sm mt-1">
              {error.message || 'No se pudieron obtener los ingresos'}
            </p>
            <button
              onClick={() => fetchIncomes()}
              className="mt-3 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
            >
              Reintentar
            </button>
          </div>
        </div>
      )}

      {/* Empty State */}
      {!loading && !error && incomes.length === 0 && (
        <EmptyState
          title="No hay ingresos registrados"
          description="Comienza registrando tu primer ingreso para gestionar tus finanzas."
          action={{
            label: 'Crear ingreso',
            onClick: handleCreate,
          }}
        />
      )}

      {/* Incomes List */}
      {!loading && !error && incomes.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {incomes.map((income) => (
            <IncomeCard
              key={income.id}
              income={income}
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
            Mostrando {incomes.length} de {pagination.total} ingresos
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
        title={selectedIncome ? 'Editar Ingreso' : 'Nuevo Ingreso'}
        size="lg"
      >
        <IncomeForm
          income={selectedIncome}
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
          title="Ingresos"
          description="Gestiona tus ingresos y registra todas tus entradas de dinero"
          actions={
            <Button color="primary" onPress={handleCreate}>
              Nuevo Ingreso
            </Button>
          }
        />
        {content}
      </div>
    </Layout>
  );
}

export default IncomesPage;

