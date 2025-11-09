import type { AccountType } from '../../../shared/types/common.types';

/**
 * Respuesta del endpoint GET /api/dashboard
 */
export interface DashboardResponse {
  availableMoney: number;
  totalBalance: number;
  totalBudgetsAmount: number;
  totalCreditCardDebt: number;
  accounts: AccountSummary[];
  activeBudgets: BudgetSummary[];
  creditCards: CreditCardSummary[];
}

/**
 * Resumen de cuenta del dashboard
 */
export interface AccountSummary {
  id: string | number;
  name: string;
  type: AccountType;
  balance: number;
}

/**
 * Resumen de presupuesto activo del dashboard
 */
export interface BudgetSummary {
  id: string | number;
  expenseTypeName: string;
  biweeklyAmount: number;
  startDate: string;
  endDate: string;
}

/**
 * Resumen de tarjeta de crédito del dashboard
 */
export interface CreditCardSummary {
  id: string | number;
  name: string;
  debt: number;
}

