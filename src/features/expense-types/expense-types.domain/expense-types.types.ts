import type { ExpenseCategoryType } from '../../../shared/types/common.types';
import type { ExpenseType } from '../../../shared/types/common.types';

export type { ExpenseType };

/**
 * Respuesta del endpoint GET /api/expense-types (con paginación)
 */
export interface ExpenseTypesResponse {
    data: ExpenseType[];
    meta: {
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    };
}

/**
 * Respuesta del endpoint GET /api/expense-types/:id
 */
export interface ExpenseTypeResponse {
    id: number;
    name: string;
    type: ExpenseCategoryType;
    description?: string;
    createdAt: string;
    updatedAt: string;
}

/**
 * DTO para crear un tipo de gasto
 */
export interface CreateExpenseTypeDto {
    name: string;
    type: ExpenseCategoryType;
    description?: string;
}

/**
 * DTO para actualizar un tipo de gasto
 */
export interface UpdateExpenseTypeDto {
    name?: string;
    type?: ExpenseCategoryType;
    description?: string;
}

/**
 * DTO para consultar tipos de gasto (filtros y paginación)
 */
export interface QueryExpenseTypeDto {
    type?: ExpenseCategoryType;
    search?: string;
    page?: number;
    limit?: number;
}

