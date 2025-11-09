export const API_ENDPOINTS = {
  // Dashboard
  DASHBOARD: '/dashboard',
  
  // Accounts
  ACCOUNTS: '/accounts',
  ACCOUNT_BY_ID: (id: string | number) => `/accounts/${id}`,
  
  // Incomes
  INCOMES: '/incomes',
  INCOME_BY_ID: (id: string | number) => `/incomes/${id}`,
  
  // Expenses
  EXPENSES: '/expenses',
  EXPENSE_BY_ID: (id: string | number) => `/expenses/${id}`,
  
  // Expense Types
  EXPENSE_TYPES: '/expense-types',
  EXPENSE_TYPE_BY_ID: (id: string | number) => `/expense-types/${id}`,
  
  // Transactions
  TRANSACTIONS: '/transactions',
  TRANSACTION_BY_ID: (id: string | number) => `/transactions/${id}`,
  
  // Credit Cards
  CREDIT_CARDS: '/credit-cards',
  CREDIT_CARD_BY_ID: (id: string | number) => `/credit-cards/${id}`,
  
  // Budgets
  BUDGETS: '/budgets',
  BUDGET_BY_ID: (id: string | number) => `/budgets/${id}`,
  
  // Account Adjustments
  ACCOUNT_ADJUSTMENTS: '/account-adjustments',
  ACCOUNT_ADJUSTMENT_BY_ID: (id: string | number) => `/account-adjustments/${id}`,
} as const;

