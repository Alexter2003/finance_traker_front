import { useEffect, useState } from 'react';
import { Button } from '@heroui/react';
import { budgetsService } from '../budgets.data/budgets.service';
import type {
    Budget,
    BudgetsResponse,
    CreateBudgetDto,
    UpdateBudgetDto,
    QueryBudgetDto,
} from '../budgets.domain/budgets.types';
import { BudgetCard, BudgetForm } from '../budgets.ui';
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

function BudgetsPage() {
    const [budgets, setBudgets] = useState<Budget[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedBudget, setSelectedBudget] = useState<Budget | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [filters, setFilters] = useState<{
        expenseTypeId?: number;
        isActive?: boolean;
    }>({});
    const [pagination, setPagination] = useState({
        page: 1,
        limit: 10,
        total: 0,
        totalPages: 0,
    });

    const { toasts, success, error: showError, removeToast } = useToast();
    const { confirm, confirmState } = useConfirm();

    const fetchBudgets = async () => {
        try {
            setLoading(true);
            setError(null);
            const response: BudgetsResponse = await budgetsService.getAll({
                ...filters,
                page: pagination.page,
                limit: pagination.limit,
            });
            setBudgets(response.data);
            setPagination({
                ...pagination,
                total: response.meta.total,
                totalPages: response.meta.totalPages,
            });
        } catch (err) {
            const errorMessage = getErrorMessage(err, 'Error al cargar los presupuestos');
            setError(new Error(errorMessage));
            showError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBudgets();
    }, [pagination.page, filters]);

    const handleCreate = () => {
        setSelectedBudget(null);
        setIsModalOpen(true);
    };

    const handleEdit = (budget: Budget) => {
        setSelectedBudget(budget);
        setIsModalOpen(true);
    };

    const handleDelete = async (budget: Budget) => {
        const confirmed = await confirm({
            title: 'Eliminar presupuesto',
            message: `¿Estás seguro de que deseas eliminar el presupuesto para "${budget.expenseType?.name || `Tipo de Gasto #${budget.expenseTypeId}`}"? Esta acción no se puede deshacer.`,
            confirmLabel: 'Eliminar',
            cancelLabel: 'Cancelar',
            confirmColor: 'danger',
        });

        if (!confirmed) return;

        try {
            setIsSubmitting(true);
            await budgetsService.delete(budget.id);
            success('Presupuesto eliminado exitosamente');
            await fetchBudgets();
        } catch (err) {
            const errorMessage = getErrorMessage(err, 'Error al eliminar el presupuesto');
            showError(errorMessage);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleSubmit = async (data: CreateBudgetDto | UpdateBudgetDto) => {
        try {
            setIsSubmitting(true);
            if (selectedBudget) {
                await budgetsService.update(selectedBudget.id, data as UpdateBudgetDto);
                success('Presupuesto actualizado exitosamente');
            } else {
                await budgetsService.create(data as CreateBudgetDto);
                success('Presupuesto creado exitosamente');
            }
            setIsModalOpen(false);
            setSelectedBudget(null);
            await fetchBudgets();
        } catch (err) {
            const defaultMessage = selectedBudget
                ? 'Error al actualizar el presupuesto'
                : 'Error al crear el presupuesto';
            const errorMessage = getErrorMessage(err, defaultMessage);
            showError(errorMessage);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        setSelectedBudget(null);
    };

    const handleFilterChange = (
        key: 'expenseTypeId' | 'isActive',
        value: string | number | boolean | undefined
    ) => {
        setFilters((prev) => ({
            ...prev,
            [key]: value !== '' && value !== undefined ? value : undefined,
        }));
        setPagination((prev) => ({ ...prev, page: 1 }));
    };

    const content = (
        <>
            {/* Filtros */}
            <div className="mb-6 flex flex-col sm:flex-row gap-4">
                <input
                    type="number"
                    placeholder="Filtrar por ID de tipo de gasto..."
                    value={filters.expenseTypeId || ''}
                    onChange={(e) =>
                        handleFilterChange(
                            'expenseTypeId',
                            e.target.value ? Number(e.target.value) : undefined
                        )
                    }
                    className="px-4 py-2 bg-gray-700 text-white rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 flex-1"
                />
                <select
                    value={filters.isActive === undefined ? '' : String(filters.isActive)}
                    onChange={(e) =>
                        handleFilterChange(
                            'isActive',
                            e.target.value === ''
                                ? undefined
                                : e.target.value === 'true'
                        )
                    }
                    className="px-4 py-2 bg-gray-700 text-white rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option value="">Todos los estados</option>
                    <option value="true">Activos</option>
                    <option value="false">Inactivos</option>
                </select>
            </div>

            {/* Loading State */}
            {loading && budgets.length === 0 && (
                <div className="mt-6">
                    <LoadingSpinner label="Cargando presupuestos..." size="lg" />
                </div>
            )}

            {/* Error State */}
            {error && !loading && (
                <div className="mt-6">
                    <div className="bg-red-900/30 border border-red-500 rounded-lg p-4">
                        <p className="text-red-200 font-medium">Error al cargar los presupuestos</p>
                        <p className="text-red-300 text-sm mt-1">
                            {error.message || 'No se pudieron obtener los presupuestos'}
                        </p>
                        <button
                            onClick={() => fetchBudgets()}
                            className="mt-3 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
                        >
                            Reintentar
                        </button>
                    </div>
                </div>
            )}

            {/* Empty State */}
            {!loading && !error && budgets.length === 0 && (
                <EmptyState
                    title="No hay presupuestos registrados"
                    description="Comienza creando tu primer presupuesto para gestionar tus gastos fijos."
                    action={{
                        label: 'Crear presupuesto',
                        onClick: handleCreate,
                    }}
                />
            )}

            {/* Budgets List */}
            {!loading && !error && budgets.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {budgets.map((budget) => (
                        <BudgetCard
                            key={budget.id}
                            budget={budget}
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
                        Mostrando {budgets.length} de {pagination.total} presupuestos
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
                title={selectedBudget ? 'Editar Presupuesto' : 'Nuevo Presupuesto'}
                size="lg"
            >
                <BudgetForm
                    budget={selectedBudget}
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
                    title="Presupuestos"
                    description="Gestiona los presupuestos quincenales para tus gastos fijos"
                    actions={
                        <Button color="primary" onPress={handleCreate}>
                            Nuevo Presupuesto
                        </Button>
                    }
                />
                {content}
            </div>
        </Layout>
    );
}

export default BudgetsPage;

