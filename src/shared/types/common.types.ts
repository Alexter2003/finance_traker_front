// Enums del Backend (convertidos a const objects por compatibilidad con erasableSyntaxOnly)

export const AccountType = {
  CASH: 'CASH',
  BANK: 'BANK',
  CREDIT_CARD: 'CREDIT_CARD',
  SAVINGS: 'SAVINGS',
  OTHER: 'OTHER',
} as const;

export type AccountType = (typeof AccountType)[keyof typeof AccountType];

export const IncomeFrequency = {
  ONE_TIME: 'ONE_TIME',
  RECURRENT_MONTHLY: 'RECURRENT_MONTHLY',
  RECURRENT_BIWEEKLY: 'RECURRENT_BIWEEKLY',
} as const;

export type IncomeFrequency = (typeof IncomeFrequency)[keyof typeof IncomeFrequency];

export const ExpenseCategoryType = {
  FIXED: 'FIXED',
  VARIABLE: 'VARIABLE',
} as const;

export type ExpenseCategoryType = (typeof ExpenseCategoryType)[keyof typeof ExpenseCategoryType];

// Tipos comunes

export interface ApiResponse<T> {
  data: T;
  message?: string;
}

export interface PaginationParams {
  page?: number;
  limit?: number;
  offset?: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page?: number;
  limit?: number;
}

export interface FilterParams {
  startDate?: string;
  endDate?: string;
  accountId?: string | number;
  [key: string]: unknown;
}

// Tipos de modelos principales (basados en el Backend)

export interface Account {
  id: string | number;
  name: string;
  type: AccountType;
  initialBalance: number;
  balance?: number; // Calculado
  createdAt?: string;
  updatedAt?: string;
}

export interface Income {
  id: string | number;
  amount: number;
  accountId: string | number;
  frequency: IncomeFrequency;
  description?: string;
  date: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Expense {
  id: string | number;
  amount: number;
  accountId: string | number;
  expenseTypeId: string | number;
  description?: string;
  date: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface ExpenseType {
  id: string | number;
  name: string;
  type: ExpenseCategoryType;
  description?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Transaction {
  id: string | number;
  fromAccountId: string | number;
  toAccountId: string | number;
  amount: number;
  description?: string;
  date: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Budget {
  id: string | number;
  expenseTypeId: string | number;
  monthlyAmount: number;
  biweeklyAmount: number;
  pendingAmount?: number;
  startDate: string;
  endDate: string;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreditCard {
  id: string | number;
  name: string;
  type: typeof AccountType.CREDIT_CARD;
  initialBalance: number;
  balance?: number; // Calculado
  debt?: number; // Deuda pendiente (saldo negativo)
  createdAt?: string;
  updatedAt?: string;
}

export interface AccountAdjustment {
  id: string | number;
  accountId: string | number;
  amount: number;
  reason: string;
  date: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface DashboardData {
  totalBalance: number;
  availableMoney: number;
  totalDebt: number;
  accounts: Account[];
  activeBudgets: Budget[];
  recentTransactions: Transaction[];
  expensesByCategory: Array<{
    category: string;
    amount: number;
  }>;
  incomesByMonth: Array<{
    month: string;
    amount: number;
  }>;
}

