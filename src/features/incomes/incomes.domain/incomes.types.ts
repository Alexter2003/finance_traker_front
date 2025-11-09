import type { Income, Account } from '../../../shared/types/common.types';

/**
 * Respuesta del endpoint GET /api/incomes (con paginación)
 */
export interface IncomesResponse {
  data: IncomeWithRelations[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

/**
 * Respuesta del endpoint GET /api/incomes/:id
 */
export interface IncomeResponse {
  id: number;
  amount: number;
  accountId: number;
  frequency: string;
  description?: string;
  date: string;
  createdAt: string;
  updatedAt: string;
  account: Account;
}

/**
 * Income con relaciones (account)
 */
export interface IncomeWithRelations extends Income {
  account?: Account;
}

/**
 * DTO para crear un ingreso
 */
export interface CreateIncomeDto {
  amount: number;
  accountId: number;
  frequency: string;
  description?: string;
  date: string;
}

/**
 * DTO para actualizar un ingreso
 */
export interface UpdateIncomeDto {
  amount?: number;
  accountId?: number;
  frequency?: string;
  description?: string;
  date?: string;
}

/**
 * DTO para consultar ingresos (filtros y paginación)
 */
export interface QueryIncomeDto {
  accountId?: number;
  startDate?: string;
  endDate?: string;
  page?: number;
  limit?: number;
}

