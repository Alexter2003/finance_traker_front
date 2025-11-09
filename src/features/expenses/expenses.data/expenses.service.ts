import { apiClient } from '../../../core/api';
import { API_ENDPOINTS } from '../../../core/constants/api.constants';
import type {
  ExpensesResponse,
  ExpenseResponse,
  CreateExpenseDto,
  UpdateExpenseDto,
  QueryExpenseDto,
} from '../expenses.domain/expenses.types';

/**
 * Servicio para gestionar gastos
 */
export const expensesService = {
  /**
   * Obtiene todos los gastos con filtros y paginación
   * @param queryDto - Parámetros de consulta (filtros y paginación)
   * @returns Promise con la lista de gastos paginada
   */
  async getAll(queryDto?: QueryExpenseDto): Promise<ExpensesResponse> {
    const response = await apiClient.get<ExpensesResponse>(
      API_ENDPOINTS.EXPENSES,
      { params: queryDto }
    );
    return response.data;
  },

  /**
   * Obtiene un gasto por ID
   * @param id - ID del gasto
   * @returns Promise con los datos del gasto
   */
  async getById(id: string | number): Promise<ExpenseResponse> {
    const response = await apiClient.get<ExpenseResponse>(
      API_ENDPOINTS.EXPENSE_BY_ID(id)
    );
    return response.data;
  },

  /**
   * Crea un nuevo gasto
   * @param createExpenseDto - Datos del gasto a crear
   * @returns Promise con el gasto creado
   */
  async create(createExpenseDto: CreateExpenseDto): Promise<ExpenseResponse> {
    const response = await apiClient.post<ExpenseResponse>(
      API_ENDPOINTS.EXPENSES,
      createExpenseDto
    );
    return response.data;
  },

  /**
   * Actualiza un gasto existente
   * @param id - ID del gasto
   * @param updateExpenseDto - Datos a actualizar
   * @returns Promise con el gasto actualizado
   */
  async update(
    id: string | number,
    updateExpenseDto: UpdateExpenseDto
  ): Promise<ExpenseResponse> {
    const response = await apiClient.patch<ExpenseResponse>(
      API_ENDPOINTS.EXPENSE_BY_ID(id),
      updateExpenseDto
    );
    return response.data;
  },

  /**
   * Elimina un gasto (soft delete)
   * @param id - ID del gasto
   * @returns Promise vacío
   */
  async delete(id: string | number): Promise<void> {
    await apiClient.delete(API_ENDPOINTS.EXPENSE_BY_ID(id));
  },
};

