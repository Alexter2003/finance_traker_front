import type { Account, AccountType } from '../../../shared/types/common.types';

/**
 * Respuesta del endpoint GET /api/accounts (con paginación)
 */
export interface AccountsResponse {
  data: Account[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

/**
 * Respuesta del endpoint GET /api/accounts/:id
 */
export interface AccountResponse {
  id: number;
  name: string;
  type: AccountType;
  initialBalance: number;
  balance: number;
  createdAt: string;
  updatedAt: string;
}

/**
 * DTO para crear una cuenta
 */
export interface CreateAccountDto {
  name: string;
  type: AccountType;
  initialBalance: number;
}

/**
 * DTO para actualizar una cuenta
 */
export interface UpdateAccountDto {
  name?: string;
  type?: AccountType;
  initialBalance?: number;
}

/**
 * DTO para consultar cuentas (filtros y paginación)
 */
export interface QueryAccountDto {
  type?: AccountType;
  search?: string;
  page?: number;
  limit?: number;
}

