import { useEffect, useState } from 'react';
import { Button } from '@heroui/react';
import { creditCardsService } from '../credit-cards.data/credit-cards.service';
import type {
  CreditCard,
  CreditCardsResponse,
  CreateCreditCardDto,
  UpdateCreditCardDto,
} from '../credit-cards.domain/credit-cards.types';
import { CreditCardCard, CreditCardForm } from '../credit-cards.ui';
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

function CreditCardsPage() {
  const [creditCards, setCreditCards] = useState<CreditCard[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCreditCard, setSelectedCreditCard] = useState<CreditCard | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [filters, setFilters] = useState<{
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

  const fetchCreditCards = async () => {
    try {
      setLoading(true);
      setError(null);
      const response: CreditCardsResponse = await creditCardsService.getAll({
        ...filters,
        page: pagination.page,
        limit: pagination.limit,
      });
      setCreditCards(response.data);
      setPagination({
        ...pagination,
        total: response.meta.total,
        totalPages: response.meta.totalPages,
      });
    } catch (err) {
      const errorMessage = getErrorMessage(err, 'Error al cargar las tarjetas de crédito');
      setError(new Error(errorMessage));
      showError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCreditCards();
  }, [pagination.page, filters]);

  const handleCreate = () => {
    setSelectedCreditCard(null);
    setIsModalOpen(true);
  };

  const handleEdit = (creditCard: CreditCard) => {
    setSelectedCreditCard(creditCard);
    setIsModalOpen(true);
  };

  const handleDelete = async (creditCard: CreditCard) => {
    const confirmed = await confirm({
      title: 'Eliminar tarjeta de crédito',
      message: `¿Estás seguro de que deseas eliminar la tarjeta "${creditCard.name}"? Esta acción no se puede deshacer.`,
      confirmLabel: 'Eliminar',
      cancelLabel: 'Cancelar',
      confirmColor: 'danger',
    });

    if (!confirmed) return;

    try {
      setIsSubmitting(true);
      await creditCardsService.delete(creditCard.id);
      success('Tarjeta de crédito eliminada exitosamente');
      await fetchCreditCards();
    } catch (err) {
      const errorMessage = getErrorMessage(err, 'Error al eliminar la tarjeta de crédito');
      showError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmit = async (data: CreateCreditCardDto | UpdateCreditCardDto) => {
    try {
      setIsSubmitting(true);
      if (selectedCreditCard) {
        await creditCardsService.update(selectedCreditCard.id, data as UpdateCreditCardDto);
        success('Tarjeta de crédito actualizada exitosamente');
      } else {
        await creditCardsService.create(data as CreateCreditCardDto);
        success('Tarjeta de crédito creada exitosamente');
      }
      setIsModalOpen(false);
      setSelectedCreditCard(null);
      await fetchCreditCards();
    } catch (err) {
      const defaultMessage = selectedCreditCard
        ? 'Error al actualizar la tarjeta de crédito'
        : 'Error al crear la tarjeta de crédito';
      const errorMessage = getErrorMessage(err, defaultMessage);
      showError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setSelectedCreditCard(null);
  };

  const handleFilterChange = (value: string) => {
    setFilters((prev) => ({
      ...prev,
      search: value || undefined,
    }));
    setPagination((prev) => ({ ...prev, page: 1 }));
  };

  const content = (
    <>
      {/* Filtros */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Buscar por nombre..."
          value={filters.search || ''}
          onChange={(e) => handleFilterChange(e.target.value)}
          className="px-4 py-2 bg-gray-700 text-white rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full max-w-md"
        />
      </div>

      {/* Loading State */}
      {loading && creditCards.length === 0 && (
        <div className="mt-6">
          <LoadingSpinner label="Cargando tarjetas de crédito..." size="lg" />
        </div>
      )}

      {/* Error State */}
      {error && !loading && (
        <div className="mt-6">
          <div className="bg-red-900/30 border border-red-500 rounded-lg p-4">
            <p className="text-red-200 font-medium">Error al cargar las tarjetas de crédito</p>
            <p className="text-red-300 text-sm mt-1">
              {error.message || 'No se pudieron obtener las tarjetas de crédito'}
            </p>
            <button
              onClick={() => fetchCreditCards()}
              className="mt-3 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
            >
              Reintentar
            </button>
          </div>
        </div>
      )}

      {/* Empty State */}
      {!loading && !error && creditCards.length === 0 && (
        <EmptyState
          title="No hay tarjetas de crédito registradas"
          description="Comienza creando tu primera tarjeta de crédito para gestionar tus finanzas."
          action={{
            label: 'Crear tarjeta',
            onClick: handleCreate,
          }}
        />
      )}

      {/* Credit Cards List */}
      {!loading && !error && creditCards.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {creditCards.map((creditCard) => (
            <CreditCardCard
              key={creditCard.id}
              creditCard={creditCard}
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
            Mostrando {creditCards.length} de {pagination.total} tarjetas de crédito
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
        title={selectedCreditCard ? 'Editar Tarjeta de Crédito' : 'Nueva Tarjeta de Crédito'}
        size="lg"
      >
        <CreditCardForm
          creditCard={selectedCreditCard}
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
          title="Tarjetas de Crédito"
          description="Gestiona tus tarjetas de crédito y controla tu deuda pendiente"
          actions={
            <Button color="primary" onPress={handleCreate}>
              Nueva Tarjeta
            </Button>
          }
        />
        {content}
      </div>
    </Layout>
  );
}

export default CreditCardsPage;

