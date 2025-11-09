import { apiClient } from '../../../core/api';
import { API_ENDPOINTS } from '../../../core/constants/api.constants';
import type {
  ExpenseTypesResponse,
  ExpenseTypeResponse,
  CreateExpenseTypeDto,
  UpdateExpenseTypeDto,
  QueryExpenseTypeDto,
} from '../expense-types.domain/expense-types.types';

/**
 * Servicio para gestionar tipos de gasto
 */
export const expenseTypesService = {
  /**
   * Obtiene todos los tipos de gasto con filtros y paginación
   * @param queryDto - Parámetros de consulta (filtros y paginación)
   * @returns Promise con la lista de tipos de gasto paginada
   */
  async getAll(queryDto?: QueryExpenseTypeDto): Promise<ExpenseTypesResponse> {
    const response = await apiClient.get<ExpenseTypesResponse>(
      API_ENDPOINTS.EXPENSE_TYPES,
      { params: queryDto }
    );
    return response.data;
  },

  /**
   * Obtiene un tipo de gasto por ID
   * @param id - ID del tipo de gasto
   * @returns Promise con los datos del tipo de gasto
   */
  async getById(id: string | number): Promise<ExpenseTypeResponse> {
    const response = await apiClient.get<ExpenseTypeResponse>(
      API_ENDPOINTS.EXPENSE_TYPE_BY_ID(id)
    );
    return response.data;
  },

  /**
   * Crea un nuevo tipo de gasto
   * @param createExpenseTypeDto - Datos del tipo de gasto a crear
   * @returns Promise con el tipo de gasto creado
   */
  async create(
    createExpenseTypeDto: CreateExpenseTypeDto
  ): Promise<ExpenseTypeResponse> {
    const response = await apiClient.post<ExpenseTypeResponse>(
      API_ENDPOINTS.EXPENSE_TYPES,
      createExpenseTypeDto
    );
    return response.data;
  },

  /**
   * Actualiza un tipo de gasto existente
   * @param id - ID del tipo de gasto
   * @param updateExpenseTypeDto - Datos a actualizar
   * @returns Promise con el tipo de gasto actualizado
   */
  async update(
    id: string | number,
    updateExpenseTypeDto: UpdateExpenseTypeDto
  ): Promise<ExpenseTypeResponse> {
    const response = await apiClient.patch<ExpenseTypeResponse>(
      API_ENDPOINTS.EXPENSE_TYPE_BY_ID(id),
      updateExpenseTypeDto
    );
    return response.data;
  },

  /**
   * Elimina un tipo de gasto (soft delete)
   * @param id - ID del tipo de gasto
   * @returns Promise vacío
   */
  async delete(id: string | number): Promise<void> {
    await apiClient.delete(API_ENDPOINTS.EXPENSE_TYPE_BY_ID(id));
  },
};

