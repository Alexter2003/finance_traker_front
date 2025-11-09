import type { Transaction, Account } from '../../../shared/types/common.types';

/**
 * Respuesta del endpoint GET /api/transactions (con paginación)
 */
export interface TransactionsResponse {
  data: TransactionWithRelations[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

/**
 * Respuesta del endpoint GET /api/transactions/:id
 */
export interface TransactionResponse {
  id: number;
  fromAccountId: number;
  toAccountId: number;
  amount: number;
  description?: string;
  date: string;
  createdAt: string;
  updatedAt: string;
  fromAccount: Account;
  toAccount: Account;
}

/**
 * Transaction con relaciones (fromAccount y toAccount)
 */
export interface TransactionWithRelations extends Transaction {
  fromAccount?: Account;
  toAccount?: Account;
}

/**
 * DTO para crear una transacción
 */
export interface CreateTransactionDto {
  fromAccountId: number;
  toAccountId: number;
  amount: number;
  description?: string;
  date: string;
}

/**
 * DTO para actualizar una transacción
 */
export interface UpdateTransactionDto {
  fromAccountId?: number;
  toAccountId?: number;
  amount?: number;
  description?: string;
  date?: string;
}

/**
 * DTO para consultar transacciones (filtros y paginación)
 */
export interface QueryTransactionDto {
  fromAccountId?: number;
  toAccountId?: number;
  startDate?: string;
  endDate?: string;
  page?: number;
  limit?: number;
}

