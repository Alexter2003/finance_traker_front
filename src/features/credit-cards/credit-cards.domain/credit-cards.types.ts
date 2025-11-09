import type { CreditCard } from '../../../shared/types/common.types';

/**
 * Respuesta del endpoint GET /api/credit-cards (con paginación)
 */
export interface CreditCardsResponse {
  data: CreditCard[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

/**
 * Respuesta del endpoint GET /api/credit-cards/:id
 */
export interface CreditCardResponse {
  id: number;
  name: string;
  initialBalance: number;
  balance: number;
  debt: number;
  createdAt: string;
  updatedAt: string;
}

/**
 * DTO para crear una tarjeta de crédito
 */
export interface CreateCreditCardDto {
  name: string;
  initialBalance: number;
}

/**
 * DTO para actualizar una tarjeta de crédito
 */
export interface UpdateCreditCardDto {
  name?: string;
  initialBalance?: number;
}

/**
 * DTO para consultar tarjetas de crédito (filtros y paginación)
 */
export interface QueryCreditCardDto {
  search?: string;
  page?: number;
  limit?: number;
}

