import { apiClient } from '../../../core/api';
import { API_ENDPOINTS } from '../../../core/constants/api.constants';
import type {
  TransactionsResponse,
  TransactionResponse,
  CreateTransactionDto,
  UpdateTransactionDto,
  QueryTransactionDto,
} from '../transactions.domain/transactions.types';

/**
 * Servicio para gestionar transacciones
 */
export const transactionsService = {
  /**
   * Obtiene todas las transacciones con filtros y paginación
   * @param queryDto - Parámetros de consulta (filtros y paginación)
   * @returns Promise con la lista de transacciones paginada
   */
  async getAll(queryDto?: QueryTransactionDto): Promise<TransactionsResponse> {
    const response = await apiClient.get<TransactionsResponse>(
      API_ENDPOINTS.TRANSACTIONS,
      { params: queryDto }
    );
    return response.data;
  },

  /**
   * Obtiene una transacción por ID
   * @param id - ID de la transacción
   * @returns Promise con los datos de la transacción
   */
  async getById(id: string | number): Promise<TransactionResponse> {
    const response = await apiClient.get<TransactionResponse>(
      API_ENDPOINTS.TRANSACTION_BY_ID(id)
    );
    return response.data;
  },

  /**
   * Crea una nueva transacción
   * @param createTransactionDto - Datos de la transacción a crear
   * @returns Promise con la transacción creada
   */
  async create(
    createTransactionDto: CreateTransactionDto
  ): Promise<TransactionResponse> {
    const response = await apiClient.post<TransactionResponse>(
      API_ENDPOINTS.TRANSACTIONS,
      createTransactionDto
    );
    return response.data;
  },

  /**
   * Actualiza una transacción existente
   * @param id - ID de la transacción
   * @param updateTransactionDto - Datos a actualizar
   * @returns Promise con la transacción actualizada
   */
  async update(
    id: string | number,
    updateTransactionDto: UpdateTransactionDto
  ): Promise<TransactionResponse> {
    const response = await apiClient.patch<TransactionResponse>(
      API_ENDPOINTS.TRANSACTION_BY_ID(id),
      updateTransactionDto
    );
    return response.data;
  },

  /**
   * Elimina una transacción (soft delete)
   * @param id - ID de la transacción
   * @returns Promise vacío
   */
  async delete(id: string | number): Promise<void> {
    await apiClient.delete(API_ENDPOINTS.TRANSACTION_BY_ID(id));
  },
};

