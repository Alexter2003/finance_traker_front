import type { Account } from '../../../shared/types/common.types';

/**
 * Ajuste de cuenta
 */
export interface AccountAdjustment {
  id: number;
  accountId: number;
  amount: number;
  reason: string;
  date: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  account?: Account;
}

/**
 * Respuesta del endpoint GET /api/account-adjustments (con paginación)
 */
export interface AccountAdjustmentsResponse {
  data: AccountAdjustment[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

/**
 * Respuesta del endpoint GET /api/account-adjustments/:id
 */
export interface AccountAdjustmentResponse extends AccountAdjustment {}

/**
 * DTO para crear un ajuste de cuenta
 */
export interface CreateAccountAdjustmentDto {
  accountId: number;
  amount: number;
  reason: string;
  date: string;
}

/**
 * DTO para actualizar un ajuste de cuenta
 */
export interface UpdateAccountAdjustmentDto {
  accountId?: number;
  amount?: number;
  reason?: string;
  date?: string;
}

/**
 * DTO para consultar ajustes de cuenta (filtros y paginación)
 */
export interface QueryAccountAdjustmentDto {
  accountId?: number;
  startDate?: string;
  endDate?: string;
  page?: number;
  limit?: number;
}

