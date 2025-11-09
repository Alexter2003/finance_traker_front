import { apiClient } from '../../../core/api';
import { API_ENDPOINTS } from '../../../core/constants/api.constants';
import type {
  AccountsResponse,
  AccountResponse,
  CreateAccountDto,
  UpdateAccountDto,
  QueryAccountDto,
} from '../accounts.domain/accounts.types';

/**
 * Servicio para gestionar cuentas
 */
export const accountsService = {
  /**
   * Obtiene todas las cuentas con filtros y paginación
   * @param queryDto - Parámetros de consulta (filtros y paginación)
   * @returns Promise con la lista de cuentas paginada
   */
  async getAll(queryDto?: QueryAccountDto): Promise<AccountsResponse> {
    const response = await apiClient.get<AccountsResponse>(
      API_ENDPOINTS.ACCOUNTS,
      { params: queryDto }
    );
    return response.data;
  },

  /**
   * Obtiene una cuenta por ID
   * @param id - ID de la cuenta
   * @returns Promise con los datos de la cuenta
   */
  async getById(id: string | number): Promise<AccountResponse> {
    const response = await apiClient.get<AccountResponse>(
      API_ENDPOINTS.ACCOUNT_BY_ID(id)
    );
    return response.data;
  },

  /**
   * Crea una nueva cuenta
   * @param createAccountDto - Datos de la cuenta a crear
   * @returns Promise con la cuenta creada
   */
  async create(createAccountDto: CreateAccountDto): Promise<AccountResponse> {
    const response = await apiClient.post<AccountResponse>(
      API_ENDPOINTS.ACCOUNTS,
      createAccountDto
    );
    return response.data;
  },

  /**
   * Actualiza una cuenta existente
   * @param id - ID de la cuenta
   * @param updateAccountDto - Datos a actualizar
   * @returns Promise con la cuenta actualizada
   */
  async update(
    id: string | number,
    updateAccountDto: UpdateAccountDto
  ): Promise<AccountResponse> {
    const response = await apiClient.patch<AccountResponse>(
      API_ENDPOINTS.ACCOUNT_BY_ID(id),
      updateAccountDto
    );
    return response.data;
  },

  /**
   * Elimina una cuenta (soft delete)
   * @param id - ID de la cuenta
   * @returns Promise vacío
   */
  async delete(id: string | number): Promise<void> {
    await apiClient.delete(API_ENDPOINTS.ACCOUNT_BY_ID(id));
  },
};

