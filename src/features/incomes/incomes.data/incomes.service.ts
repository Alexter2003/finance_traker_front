import { apiClient } from '../../../core/api';
import { API_ENDPOINTS } from '../../../core/constants/api.constants';
import type {
  IncomesResponse,
  IncomeResponse,
  CreateIncomeDto,
  UpdateIncomeDto,
  QueryIncomeDto,
} from '../incomes.domain/incomes.types';

/**
 * Servicio para gestionar ingresos
 */
export const incomesService = {
  /**
   * Obtiene todos los ingresos con filtros y paginación
   * @param queryDto - Parámetros de consulta (filtros y paginación)
   * @returns Promise con la lista de ingresos paginada
   */
  async getAll(queryDto?: QueryIncomeDto): Promise<IncomesResponse> {
    const response = await apiClient.get<IncomesResponse>(
      API_ENDPOINTS.INCOMES,
      { params: queryDto }
    );
    return response.data;
  },

  /**
   * Obtiene un ingreso por ID
   * @param id - ID del ingreso
   * @returns Promise con los datos del ingreso
   */
  async getById(id: string | number): Promise<IncomeResponse> {
    const response = await apiClient.get<IncomeResponse>(
      API_ENDPOINTS.INCOME_BY_ID(id)
    );
    return response.data;
  },

  /**
   * Crea un nuevo ingreso
   * @param createIncomeDto - Datos del ingreso a crear
   * @returns Promise con el ingreso creado
   */
  async create(createIncomeDto: CreateIncomeDto): Promise<IncomeResponse> {
    const response = await apiClient.post<IncomeResponse>(
      API_ENDPOINTS.INCOMES,
      createIncomeDto
    );
    return response.data;
  },

  /**
   * Actualiza un ingreso existente
   * @param id - ID del ingreso
   * @param updateIncomeDto - Datos a actualizar
   * @returns Promise con el ingreso actualizado
   */
  async update(
    id: string | number,
    updateIncomeDto: UpdateIncomeDto
  ): Promise<IncomeResponse> {
    const response = await apiClient.patch<IncomeResponse>(
      API_ENDPOINTS.INCOME_BY_ID(id),
      updateIncomeDto
    );
    return response.data;
  },

  /**
   * Elimina un ingreso (soft delete)
   * @param id - ID del ingreso
   * @returns Promise vacío
   */
  async delete(id: string | number): Promise<void> {
    await apiClient.delete(API_ENDPOINTS.INCOME_BY_ID(id));
  },
};

