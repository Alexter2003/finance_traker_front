import type { ExpenseType } from '../../../shared/types/common.types';

/**
 * Respuesta del endpoint GET /api/budgets (con paginación)
 */
export interface BudgetsResponse {
  data: Budget[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

/**
 * Respuesta del endpoint GET /api/budgets/:id
 */
export interface BudgetResponse {
  id: number;
  expenseTypeId: number;
  monthlyAmount: number;
  biweeklyAmount: number;
  pendingAmount: number;
  startDate: string;
  endDate: string;
  isActive: boolean;
  spentAmount?: number;
  totalAvailable?: number;
  availableAmount?: number;
  expenseType?: ExpenseType;
  createdAt?: string;
  updatedAt?: string;
}

/**
 * Presupuesto con información calculada
 */
export interface Budget extends BudgetResponse {
  expenseType?: ExpenseType;
}

/**
 * DTO para crear un presupuesto
 */
export interface CreateBudgetDto {
  expenseTypeId: number;
  monthlyAmount: number;
  biweeklyAmount?: number;
  pendingAmount?: number;
  startDate: string;
  endDate: string;
}

/**
 * DTO para actualizar un presupuesto
 */
export interface UpdateBudgetDto {
  monthlyAmount?: number;
  biweeklyAmount?: number;
  pendingAmount?: number;
  startDate?: string;
  endDate?: string;
  isActive?: boolean;
}

/**
 * DTO para consultar presupuestos (filtros y paginación)
 */
export interface QueryBudgetDto {
  expenseTypeId?: number;
  isActive?: boolean;
  page?: number;
  limit?: number;
}

