import { apiClient } from '../../../core/api';
import { API_ENDPOINTS } from '../../../core/constants/api.constants';
import type {
  BudgetsResponse,
  BudgetResponse,
  CreateBudgetDto,
  UpdateBudgetDto,
  QueryBudgetDto,
} from '../budgets.domain/budgets.types';

/**
 * Servicio para gestionar presupuestos
 */
export const budgetsService = {
  /**
   * Obtiene todos los presupuestos con filtros y paginación
   * @param queryDto - Parámetros de consulta (filtros y paginación)
   * @returns Promise con la lista de presupuestos paginada
   */
  async getAll(queryDto?: QueryBudgetDto): Promise<BudgetsResponse> {
    const response = await apiClient.get<BudgetsResponse>(
      API_ENDPOINTS.BUDGETS,
      { params: queryDto }
    );
    return response.data;
  },

  /**
   * Obtiene un presupuesto por ID
   * @param id - ID del presupuesto
   * @returns Promise con los datos del presupuesto
   */
  async getById(id: string | number): Promise<BudgetResponse> {
    const response = await apiClient.get<BudgetResponse>(
      API_ENDPOINTS.BUDGET_BY_ID(id)
    );
    return response.data;
  },

  /**
   * Crea un nuevo presupuesto
   * @param createBudgetDto - Datos del presupuesto a crear
   * @returns Promise con el presupuesto creado
   */
  async create(createBudgetDto: CreateBudgetDto): Promise<BudgetResponse> {
    const response = await apiClient.post<BudgetResponse>(
      API_ENDPOINTS.BUDGETS,
      createBudgetDto
    );
    return response.data;
  },

  /**
   * Actualiza un presupuesto existente
   * @param id - ID del presupuesto
   * @param updateBudgetDto - Datos a actualizar
   * @returns Promise con el presupuesto actualizado
   */
  async update(
    id: string | number,
    updateBudgetDto: UpdateBudgetDto
  ): Promise<BudgetResponse> {
    const response = await apiClient.patch<BudgetResponse>(
      API_ENDPOINTS.BUDGET_BY_ID(id),
      updateBudgetDto
    );
    return response.data;
  },

  /**
   * Elimina un presupuesto (soft delete)
   * @param id - ID del presupuesto
   * @returns Promise vacío
   */
  async delete(id: string | number): Promise<void> {
    await apiClient.delete(API_ENDPOINTS.BUDGET_BY_ID(id));
  },
};

