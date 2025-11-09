import { apiClient } from '../../../core/api';
import { API_ENDPOINTS } from '../../../core/constants/api.constants';
import type {
  AccountAdjustmentsResponse,
  AccountAdjustmentResponse,
  CreateAccountAdjustmentDto,
  UpdateAccountAdjustmentDto,
  QueryAccountAdjustmentDto,
} from '../account-adjustments.domain/account-adjustments.types';

/**
 * Servicio para gestionar ajustes de cuenta
 */
export const accountAdjustmentsService = {
  /**
   * Obtiene todos los ajustes de cuenta con filtros y paginación
   * @param queryDto - Parámetros de consulta (filtros y paginación)
   * @returns Promise con la lista de ajustes paginada
   */
  async getAll(
    queryDto?: QueryAccountAdjustmentDto
  ): Promise<AccountAdjustmentsResponse> {
    const response = await apiClient.get<AccountAdjustmentsResponse>(
      API_ENDPOINTS.ACCOUNT_ADJUSTMENTS,
      { params: queryDto }
    );
    return response.data;
  },

  /**
   * Obtiene un ajuste de cuenta por ID
   * @param id - ID del ajuste
   * @returns Promise con los datos del ajuste
   */
  async getById(
    id: string | number
  ): Promise<AccountAdjustmentResponse> {
    const response = await apiClient.get<AccountAdjustmentResponse>(
      API_ENDPOINTS.ACCOUNT_ADJUSTMENT_BY_ID(id)
    );
    return response.data;
  },

  /**
   * Crea un nuevo ajuste de cuenta
   * @param createAccountAdjustmentDto - Datos del ajuste a crear
   * @returns Promise con el ajuste creado
   */
  async create(
    createAccountAdjustmentDto: CreateAccountAdjustmentDto
  ): Promise<AccountAdjustmentResponse> {
    const response = await apiClient.post<AccountAdjustmentResponse>(
      API_ENDPOINTS.ACCOUNT_ADJUSTMENTS,
      createAccountAdjustmentDto
    );
    return response.data;
  },

  /**
   * Actualiza un ajuste de cuenta existente
   * @param id - ID del ajuste
   * @param updateAccountAdjustmentDto - Datos a actualizar
   * @returns Promise con el ajuste actualizado
   */
  async update(
    id: string | number,
    updateAccountAdjustmentDto: UpdateAccountAdjustmentDto
  ): Promise<AccountAdjustmentResponse> {
    const response = await apiClient.patch<AccountAdjustmentResponse>(
      API_ENDPOINTS.ACCOUNT_ADJUSTMENT_BY_ID(id),
      updateAccountAdjustmentDto
    );
    return response.data;
  },

  /**
   * Elimina un ajuste de cuenta (soft delete)
   * @param id - ID del ajuste
   * @returns Promise vacío
   */
  async delete(id: string | number): Promise<void> {
    await apiClient.delete(API_ENDPOINTS.ACCOUNT_ADJUSTMENT_BY_ID(id));
  },
};

