import { apiClient } from '../../../core/api';
import { API_ENDPOINTS } from '../../../core/constants/api.constants';
import type {
  CreditCardsResponse,
  CreditCardResponse,
  CreateCreditCardDto,
  UpdateCreditCardDto,
  QueryCreditCardDto,
} from '../credit-cards.domain/credit-cards.types';

/**
 * Servicio para gestionar tarjetas de crédito
 */
export const creditCardsService = {
  /**
   * Obtiene todas las tarjetas de crédito con filtros y paginación
   * @param queryDto - Parámetros de consulta (filtros y paginación)
   * @returns Promise con la lista de tarjetas de crédito paginada
   */
  async getAll(queryDto?: QueryCreditCardDto): Promise<CreditCardsResponse> {
    const response = await apiClient.get<CreditCardsResponse>(
      API_ENDPOINTS.CREDIT_CARDS,
      { params: queryDto }
    );
    return response.data;
  },

  /**
   * Obtiene una tarjeta de crédito por ID
   * @param id - ID de la tarjeta de crédito
   * @returns Promise con los datos de la tarjeta de crédito
   */
  async getById(id: string | number): Promise<CreditCardResponse> {
    const response = await apiClient.get<CreditCardResponse>(
      API_ENDPOINTS.CREDIT_CARD_BY_ID(id)
    );
    return response.data;
  },

  /**
   * Crea una nueva tarjeta de crédito
   * @param createCreditCardDto - Datos de la tarjeta de crédito a crear
   * @returns Promise con la tarjeta de crédito creada
   */
  async create(createCreditCardDto: CreateCreditCardDto): Promise<CreditCardResponse> {
    const response = await apiClient.post<CreditCardResponse>(
      API_ENDPOINTS.CREDIT_CARDS,
      createCreditCardDto
    );
    return response.data;
  },

  /**
   * Actualiza una tarjeta de crédito existente
   * @param id - ID de la tarjeta de crédito
   * @param updateCreditCardDto - Datos a actualizar
   * @returns Promise con la tarjeta de crédito actualizada
   */
  async update(
    id: string | number,
    updateCreditCardDto: UpdateCreditCardDto
  ): Promise<CreditCardResponse> {
    const response = await apiClient.patch<CreditCardResponse>(
      API_ENDPOINTS.CREDIT_CARD_BY_ID(id),
      updateCreditCardDto
    );
    return response.data;
  },

  /**
   * Elimina una tarjeta de crédito (soft delete)
   * @param id - ID de la tarjeta de crédito
   * @returns Promise vacío
   */
  async delete(id: string | number): Promise<void> {
    await apiClient.delete(API_ENDPOINTS.CREDIT_CARD_BY_ID(id));
  },
};

