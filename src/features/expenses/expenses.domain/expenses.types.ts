import type { Expense, Account, ExpenseType } from '../../../shared/types/common.types';

/**
 * Respuesta del endpoint GET /api/expenses (con paginación)
 */
export interface ExpensesResponse {
  data: ExpenseWithRelations[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

/**
 * Respuesta del endpoint GET /api/expenses/:id
 */
export interface ExpenseResponse {
  id: number;
  amount: number;
  accountId: number;
  expenseTypeId: number;
  description?: string;
  date: string;
  createdAt: string;
  updatedAt: string;
  account: Account;
  expenseType: ExpenseType;
}

/**
 * Expense con relaciones (account y expenseType)
 */
export interface ExpenseWithRelations extends Expense {
  account?: Account;
  expenseType?: ExpenseType;
}

/**
 * DTO para crear un gasto
 */
export interface CreateExpenseDto {
  amount: number;
  accountId: number;
  expenseTypeId: number;
  description?: string;
  date: string;
}

/**
 * DTO para actualizar un gasto
 */
export interface UpdateExpenseDto {
  amount?: number;
  accountId?: number;
  expenseTypeId?: number;
  description?: string;
  date?: string;
}

/**
 * DTO para consultar gastos (filtros y paginación)
 */
export interface QueryExpenseDto {
  accountId?: number;
  expenseTypeId?: number;
  startDate?: string;
  endDate?: string;
  page?: number;
  limit?: number;
}

