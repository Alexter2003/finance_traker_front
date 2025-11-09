import { useEffect, useState } from 'react';
import { Button } from '@heroui/react';
import { expenseTypesService } from '../expense-types.data/expense-types.service';
import type {
  ExpenseType,
  ExpenseTypesResponse,
  CreateExpenseTypeDto,
  UpdateExpenseTypeDto,
} from '../expense-types.domain/expense-types.types';
import { ExpenseTypeCard, ExpenseTypeForm } from '../expense-types.ui';
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
import { ExpenseCategoryType } from '../../../shared/types/common.types';

function ExpenseTypesPage() {
  const [expenseTypes, setExpenseTypes] = useState<ExpenseType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedExpenseType, setSelectedExpenseType] =
    useState<ExpenseType | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [filters, setFilters] = useState<{
    type?: ExpenseCategoryType;
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

  const fetchExpenseTypes = async () => {
    try {
      setLoading(true);
      setError(null);
      const response: ExpenseTypesResponse = await expenseTypesService.getAll({
        ...filters,
        page: pagination.page,
        limit: pagination.limit,
      });
      setExpenseTypes(response.data);
      setPagination({
        ...pagination,
        total: response.meta.total,
        totalPages: response.meta.totalPages,
      });
    } catch (err) {
      const errorMessage = getErrorMessage(
        err,
        'Error al cargar los tipos de gasto'
      );
      setError(new Error(errorMessage));
      showError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExpenseTypes();
  }, [pagination.page, filters]);

  const handleCreate = () => {
    setSelectedExpenseType(null);
    setIsModalOpen(true);
  };

  const handleEdit = (expenseType: ExpenseType) => {
    setSelectedExpenseType(expenseType);
    setIsModalOpen(true);
  };

  const handleDelete = async (expenseType: ExpenseType) => {
    const confirmed = await confirm({
      title: 'Eliminar tipo de gasto',
      message: `¿Estás seguro de que deseas eliminar el tipo de gasto "${expenseType.name}"? Esta acción no se puede deshacer.`,
      confirmLabel: 'Eliminar',
      cancelLabel: 'Cancelar',
      confirmColor: 'danger',
    });

    if (!confirmed) return;

    try {
      setIsSubmitting(true);
      await expenseTypesService.delete(expenseType.id);
      success('Tipo de gasto eliminado exitosamente');
      await fetchExpenseTypes();
    } catch (err) {
      const errorMessage = getErrorMessage(
        err,
        'Error al eliminar el tipo de gasto'
      );
      showError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmit = async (
    data: CreateExpenseTypeDto | UpdateExpenseTypeDto
  ) => {
    try {
      setIsSubmitting(true);
      if (selectedExpenseType) {
        await expenseTypesService.update(
          selectedExpenseType.id,
          data as UpdateExpenseTypeDto
        );
        success('Tipo de gasto actualizado exitosamente');
      } else {
        await expenseTypesService.create(data as CreateExpenseTypeDto);
        success('Tipo de gasto creado exitosamente');
      }
      setIsModalOpen(false);
      setSelectedExpenseType(null);
      await fetchExpenseTypes();
    } catch (err) {
      const defaultMessage = selectedExpenseType
        ? 'Error al actualizar el tipo de gasto'
        : 'Error al crear el tipo de gasto';
      const errorMessage = getErrorMessage(err, defaultMessage);
      showError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setSelectedExpenseType(null);
  };

  const handleFilterChange = (
    key: 'type' | 'search',
    value: string | undefined
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
          <option value="FIXED">Fijo</option>
          <option value="VARIABLE">Variable</option>
        </select>
      </div>

      {/* Loading State */}
      {loading && expenseTypes.length === 0 && (
        <div className="mt-6">
          <LoadingSpinner label="Cargando tipos de gasto..." size="lg" />
        </div>
      )}

      {/* Error State */}
      {error && !loading && (
        <div className="mt-6">
          <div className="bg-red-900/30 border border-red-500 rounded-lg p-4">
            <p className="text-red-200 font-medium">
              Error al cargar los tipos de gasto
            </p>
            <p className="text-red-300 text-sm mt-1">
              {error.message || 'No se pudieron obtener los tipos de gasto'}
            </p>
            <button
              onClick={() => fetchExpenseTypes()}
              className="mt-3 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
            >
              Reintentar
            </button>
          </div>
        </div>
      )}

      {/* Empty State */}
      {!loading && !error && expenseTypes.length === 0 && (
        <EmptyState
          title="No hay tipos de gasto registrados"
          description="Comienza creando tu primer tipo de gasto para categorizar tus egresos."
          action={{
            label: 'Crear tipo de gasto',
            onClick: handleCreate,
          }}
        />
      )}

      {/* Expense Types List */}
      {!loading && !error && expenseTypes.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {expenseTypes.map((expenseType) => (
            <ExpenseTypeCard
              key={expenseType.id}
              expenseType={expenseType}
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
            Mostrando {expenseTypes.length} de {pagination.total} tipos de gasto
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
          selectedExpenseType
            ? 'Editar Tipo de Gasto'
            : 'Nuevo Tipo de Gasto'
        }
        size="lg"
      >
        <ExpenseTypeForm
          expenseType={selectedExpenseType}
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
          title="Tipos de Gastos"
          description="Gestiona las categorías de gastos fijos y variables"
          actions={
            <Button color="primary" onPress={handleCreate}>
              Nuevo Tipo de Gasto
            </Button>
          }
        />
        {content}
      </div>
    </Layout>
  );
}

export default ExpenseTypesPage;

