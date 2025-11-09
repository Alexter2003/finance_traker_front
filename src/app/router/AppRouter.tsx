import { BrowserRouter, Routes, Route } from 'react-router-dom';
import DashboardPage from '../../features/dashboard/dashboard.pages/DashboardPage';
import AccountsPage from '../../features/accounts/accounts.pages/AccountsPage';
import AccountAdjustmentsPage from '../../features/account-adjustments/account-adjustments.pages/AccountAdjustmentsPage';
import BudgetsPage from '../../features/budgets/budgets.pages/BudgetsPage';
import CreditCardsPage from '../../features/credit-cards/credit-cards.pages/CreditCardsPage';
import ExpenseTypesPage from '../../features/expense-types/expense-types.pages/ExpenseTypesPage';
import ExpensesPage from '../../features/expenses/expenses.pages/ExpensesPage';
import IncomesPage from '../../features/incomes/incomes.pages/IncomesPage';
import TransactionsPage from '../../features/transactions/transactions.pages/TransactionsPage';
import HeroUIKitPage from '../../features/kit/kit.pages/HeroUIKitPage';
import NotFoundPage from '../../shared/components/NotFoundPage';

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/accounts" element={<AccountsPage />} />
        <Route path="/account-adjustments" element={<AccountAdjustmentsPage />} />
        <Route path="/budgets" element={<BudgetsPage />} />
        <Route path="/credit-cards" element={<CreditCardsPage />} />
        <Route path="/expense-types" element={<ExpenseTypesPage />} />
        <Route path="/expenses" element={<ExpensesPage />} />
        <Route path="/incomes" element={<IncomesPage />} />
        <Route path="/transactions" element={<TransactionsPage />} />
        <Route path="/kit/heroui" element={<HeroUIKitPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;

