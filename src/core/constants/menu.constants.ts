import { 
  MdDashboard,
  MdAccountBalance,
  MdTrendingUp,
  MdTrendingDown,
  MdLabel,
  MdSwapHoriz,
  MdCreditCard,
  MdPieChart,
  MdSettings
} from 'react-icons/md';

/**
 * Items del menú del sidebar
 */
export const SIDEBAR_MENU_ITEMS = [
  {
    path: '/',
    label: 'Dashboard',
    icon: MdDashboard,
  },
  {
    path: '/accounts',
    label: 'Cuentas',
    icon: MdAccountBalance,
  },
  {
    path: '/incomes',
    label: 'Ingresos',
    icon: MdTrendingUp,
  },
  {
    path: '/expenses',
    label: 'Gastos',
    icon: MdTrendingDown,
  },
  {
    path: '/expense-types',
    label: 'Tipos de Gastos',
    icon: MdLabel,
  },
  {
    path: '/transactions',
    label: 'Transacciones',
    icon: MdSwapHoriz,
  },
  {
    path: '/credit-cards',
    label: 'Tarjetas de Crédito',
    icon: MdCreditCard,
  },
  {
    path: '/budgets',
    label: 'Presupuestos',
    icon: MdPieChart,
  },
  {
    path: '/account-adjustments',
    label: 'Ajustes de Cuenta',
    icon: MdSettings,
  },
] as const;

