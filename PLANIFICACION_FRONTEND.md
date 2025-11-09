# Planificación Completa del Frontend - Finance Tracker

**Fecha:** Diciembre 2024  
**Estado Backend:** ✅ Completo (41 endpoints REST, Swagger disponible)  
**Estado Frontend:** ⚠️ Setup básico necesario antes de comenzar

---

## 📊 RESUMEN DEL BACKEND

### Endpoints Disponibles

El Backend proporciona los siguientes módulos y endpoints:

#### 1. **Dashboard** (`/api/dashboard`)
- `GET /dashboard` - Resumen financiero completo

#### 2. **Cuentas** (`/api/accounts`)
- `POST /accounts` - Crear cuenta
- `GET /accounts` - Listar cuentas (con filtros)
- `GET /accounts/:id` - Obtener cuenta por ID
- `PATCH /accounts/:id` - Actualizar cuenta
- `DELETE /accounts/:id` - Eliminar cuenta

#### 3. **Ingresos** (`/api/incomes`)
- `POST /incomes` - Crear ingreso
- `GET /incomes` - Listar ingresos (con filtros)
- `GET /incomes/:id` - Obtener ingreso por ID
- `PATCH /incomes/:id` - Actualizar ingreso
- `DELETE /incomes/:id` - Eliminar ingreso (soft delete)

#### 4. **Gastos** (`/api/expenses`)
- `POST /expenses` - Crear gasto
- `GET /expenses` - Listar gastos (con filtros)
- `GET /expenses/:id` - Obtener gasto por ID
- `PATCH /expenses/:id` - Actualizar gasto
- `DELETE /expenses/:id` - Eliminar gasto (soft delete)

#### 5. **Tipos de Gastos** (`/api/expense-types`)
- `POST /expense-types` - Crear tipo de gasto
- `GET /expense-types` - Listar tipos de gasto (con filtros)
- `GET /expense-types/:id` - Obtener tipo de gasto por ID
- `PATCH /expense-types/:id` - Actualizar tipo de gasto
- `DELETE /expense-types/:id` - Eliminar tipo de gasto

#### 6. **Transacciones** (`/api/transactions`)
- `POST /transactions` - Crear transacción
- `GET /transactions` - Listar transacciones (con filtros)
- `GET /transactions/:id` - Obtener transacción por ID
- `PATCH /transactions/:id` - Actualizar transacción
- `DELETE /transactions/:id` - Eliminar transacción (soft delete)

#### 7. **Tarjetas de Crédito** (`/api/credit-cards`)
- `POST /credit-cards` - Crear tarjeta de crédito
- `GET /credit-cards` - Listar tarjetas de crédito
- `GET /credit-cards/:id` - Obtener tarjeta por ID
- `PATCH /credit-cards/:id` - Actualizar tarjeta
- `DELETE /credit-cards/:id` - Eliminar tarjeta

#### 8. **Presupuestos** (`/api/budgets`)
- `POST /budgets` - Crear presupuesto quincenal
- `GET /budgets` - Listar presupuestos (con filtros)
- `GET /budgets/:id` - Obtener presupuesto por ID
- `PATCH /budgets/:id` - Actualizar presupuesto
- `DELETE /budgets/:id` - Eliminar presupuesto

#### 9. **Ajustes de Cuenta** (`/api/account-adjustments`)
- `POST /account-adjustments` - Crear ajuste de cuenta
- `GET /account-adjustments` - Listar ajustes (con filtros)
- `GET /account-adjustments/:id` - Obtener ajuste por ID
- `PATCH /account-adjustments/:id` - Actualizar ajuste
- `DELETE /account-adjustments/:id` - Eliminar ajuste (soft delete)

### Estructura de Datos del Backend

#### Tipos (Enums)
- **AccountType:** `CASH`, `BANK`, `CREDIT_CARD`, `SAVINGS`, `OTHER`
- **IncomeFrequency:** `ONE_TIME`, `RECURRENT_MONTHLY`, `RECURRENT_BIWEEKLY`
- **ExpenseCategoryType:** `FIXED`, `VARIABLE`

#### Modelos Principales
- **Account:** id, name, type, initialBalance, balance (calculado)
- **Income:** id, amount, accountId, frequency, description, date
- **Expense:** id, amount, accountId, expenseTypeId, description, date
- **ExpenseType:** id, name, type (FIXED/VARIABLE), description
- **Transaction:** id, fromAccountId, toAccountId, amount, description, date
- **Budget:** id, expenseTypeId, monthlyAmount, biweeklyAmount, pendingAmount, startDate, endDate, isActive
- **CreditCard:** Similar a Account con tipo CREDIT_CARD
- **AccountAdjustment:** id, accountId, amount, reason, date

---

## 🔍 ESTADO ACTUAL DEL FRONTEND

> **Nota:** Este es un proyecto base de Vite. Hay que configurar todo desde cero excepto Tailwind CSS y HeroUI.

#### 1. Configuración Base 
- ✅ **Vite** configurado correctamente (`vite.config.ts`)
- ✅ **TypeScript** configurado (`tsconfig.json`, `tsconfig.app.json`)
- ✅ **ESLint** configurado (`eslint.config.js`)
- ✅ **Tailwind CSS** configurado (`@tailwindcss/vite`) con plugin HeroUI en `index.css`
- ✅ **Estructura básica:** `App.tsx`, `main.tsx`, `index.css`, `hero.ts`

#### 2. Dependencias Instaladas 
- ✅ **React 19.1.1** y **React DOM 19.1.1** - Instalados
- ✅ **HeroUI** (`@heroui/react v2.8.5`) - Instalado y configurado
- ✅ **Framer Motion** (`v12.23.24`) - Requerido por HeroUI, instalado
- ✅ **Tailwind CSS** (`v4.1.16`) - Instalado
- ✅ **@tailwindcss/vite** (`v4.1.16`) - Instalado

#### 3. Configuración de HeroUI 
- ✅ **HeroUIProvider** configurado en `main.tsx`
- ✅ **Plugin HeroUI** configurado en `index.css` con `@plugin './hero.ts'`
- ⚠️ **HeroUI CLI:** Los componentes de HeroUI se instalan individualmente usando el CLI
  - Ejemplo: `npx @heroui/cli add button` para instalar el componente Button
  - Los componentes se instalan bajo demanda según se necesiten

### ❌ Lo que FALTA (CRÍTICO antes de desarrollar):

#### 🔴 Dependencias Faltantes (CRÍTICO)
Las siguientes dependencias están mencionadas en el README pero **NO están instaladas**:
- ❌ `react-router-dom` - Routing (necesario para navegación)
- ❌ `axios` - HTTP Client (necesario para llamadas API)
- ❌ `yup` - Validación de esquemas (necesario para formularios)
- ❌ `react-hook-form` - Manejo de formularios
- ❌ `@hookform/resolvers` - Resolver para Yup con React Hook Form
- ❌ `highcharts` - Librería de gráficas
- ❌ `highcharts-react-official` - Wrapper React para Highcharts

**Impacto:** Sin estas dependencias NO se puede desarrollar el Frontend según la arquitectura especificada.

#### 🔴 Estructura de Carpetas Faltante (CRÍTICO)
Según el README, se debe usar **Screaming Architecture**, pero actualmente NO existe.

**Estructura Actual:**
```
src/
├── App.tsx
├── App.css
├── main.tsx
├── index.css
└── assets/
    └── react.svg
```

**Estructura Requerida (según README):**
```
src/
├── app/
│   └── router/
│       └── AppRouter.tsx
├── features/
│   ├── accounts/
│   ├── dashboard/
│   ├── expenses/
│   └── ...
├── shared/
│   ├── components/
│   ├── hooks/
│   ├── utils/
│   └── types/
└── core/
    ├── api/
    ├── context/
    └── constants/
```

**Impacto:** Sin esta estructura, no se puede seguir la arquitectura especificada.

#### 🔴 Configuración Base Faltante (CRÍTICO)
1. **Variables de Entorno**
   - ❌ No existe archivo `.env`
   - ❌ No existe archivo `.env.example`
   - ✅ Debe crearse con: `VITE_API_URL=http://localhost:3000/api`

2. **Configuración de Axios**
   - ❌ No existe `core/api/api.config.ts`
   - ❌ No existe `core/api/api.interceptors.ts` (opcional pero recomendado)

3. **Router**
   - ❌ No existe `app/router/AppRouter.tsx`
   - ❌ No hay rutas configuradas

4. **Context API** (Opcional pero recomendado)
   - ❌ No existe `core/context/FinanceContext.tsx`

5. **Constantes**
   - ❌ No existe `core/constants/api.constants.ts`

6. **Tipos y Utilidades Compartidas**
   - ❌ No existe `shared/types/common.types.ts`
   - ❌ No existe `shared/utils/formatters.ts`
   - ❌ No existe `shared/utils/validators.ts`

### 📊 Resumen del Estado

**Estado General:** ⚠️ **Proyecto Base de Vite** - Configuración inicial necesaria (~30-45 minutos)

**Completado:**
- ✅ Configuración básica de herramientas (Vite, TypeScript, ESLint)
- ✅ Tailwind CSS configurado con plugin HeroUI
- ✅ HeroUI instalado (componentes se instalan con CLI según necesidad)
- ✅ Estructura mínima de archivos (App.tsx, main.tsx, index.css)

**Pendiente (Crítico):**
- ❌ 7 dependencias faltantes (react-router-dom, axios, yup, react-hook-form, etc.)
- ❌ Estructura de carpetas Screaming Architecture (completamente nueva)
- ❌ Configuración de API y Router
- ❌ Variables de entorno
- ❌ Instalación de componentes HeroUI según necesidad (usando CLI)

---

## 📋 FASE 0: SETUP INICIAL (CRÍTICO - ANTES DE DESARROLLAR)

> **Tiempo estimado:** ~30 minutos  
> **Prioridad:** 🔴 CRÍTICA - No se puede desarrollar sin esto

### 0.1 Instalación de Dependencias Faltantes

**Comando a ejecutar:**
```bash
cd Frontend
npm install react-router-dom axios yup react-hook-form @hookform/resolvers highcharts highcharts-react-official
```

**Dependencias a instalar (7 en total):**
- `react-router-dom` - Routing para navegación entre páginas
- `axios` - Cliente HTTP para llamadas API
- `yup` - Validación de esquemas para formularios
- `react-hook-form` - Manejo de formularios con validación
- `@hookform/resolvers` - Integración Yup + React Hook Form
- `highcharts` - Librería para gráficas
- `highcharts-react-official` - Wrapper React para Highcharts

**Nota sobre HeroUI:**
- Los componentes de HeroUI se instalan individualmente usando el CLI cuando se necesiten
- Ejemplo: `npx @heroui/cli add button card input` para instalar múltiples componentes
- Los componentes se instalan en el proyecto y se pueden importar desde `@heroui/react`
- No es necesario instalar todos los componentes de una vez, solo los que se vayan a usar

**Verificación:** Después de instalar, verificar que aparecen en `package.json`

### 0.2 Crear Estructura de Carpetas (Screaming Architecture)

**Estado Actual:** Proyecto base de Vite con estructura mínima:
```
src/
├── App.tsx
├── main.tsx
├── index.css
├── hero.ts
└── assets/ (si existe)
```

**Nota:** Este es un proyecto completamente nuevo, hay que crear toda la estructura desde cero.

**Estructura a crear completamente:**

```
src/
├── app/
│   └── router/
│       └── AppRouter.tsx
├── features/
│   ├── dashboard/
│   ├── accounts/
│   ├── incomes/
│   ├── expenses/
│   ├── expense-types/
│   ├── transactions/
│   ├── credit-cards/
│   ├── budgets/
│   └── account-adjustments/
├── shared/
│   ├── components/
│   ├── hooks/
│   ├── utils/
│   └── types/
└── core/
    ├── api/
    ├── context/
    └── constants/
```

### 0.3 Configuración Base

#### 0.3.1 Variables de Entorno

**Archivos a crear:**
1. **`.env`** (raíz del proyecto Frontend)
   ```env
   VITE_API_URL=http://localhost:3000/api
   ```

2. **`.env.example`** (para documentar variables necesarias)
   ```env
   VITE_API_URL=http://localhost:3000/api
   ```

**Nota:** El `.env` debe estar en `.gitignore` (verificar que existe)

#### 0.3.2 Configuración de Axios

**Archivos a crear:**

1. **`src/core/api/api.config.ts`**
   - Instancia de Axios con `baseURL` desde `import.meta.env.VITE_API_URL`
   - Configurar `timeout` y headers básicos

2. **`src/core/api/api.interceptors.ts`** (Opcional pero recomendado)
   - Interceptor de request (agregar headers si es necesario)
   - Interceptor de response (manejo de errores centralizado)

#### 0.3.3 Constantes y Tipos

**Archivos a crear:**

1. **`src/core/constants/api.constants.ts`**
   - Constantes de endpoints (rutas de API)
   - Ejemplo: `export const API_ENDPOINTS = { ACCOUNTS: '/accounts', ... }`

2. **`src/shared/types/common.types.ts`**
   - Tipos compartidos
   - Enums del Backend (AccountType, IncomeFrequency, ExpenseCategoryType)
   - Interfaces comunes (ApiResponse, Pagination, etc.)

#### 0.3.4 Utilidades Compartidas

**Archivos a crear:**

1. **`src/shared/utils/formatters.ts`**
   - `formatCurrency(amount: number): string` - Formateo de moneda
   - `formatDate(date: Date | string): string` - Formateo de fechas
   - `formatDateTime(date: Date | string): string` - Formateo de fecha y hora

2. **`src/shared/utils/validators.ts`**
   - Validaciones comunes reutilizables
   - Funciones de validación que complementen Yup

#### 0.3.5 Router

**Archivos a crear:**

1. **`src/app/router/AppRouter.tsx`**
   - Configuración básica con `BrowserRouter`
   - Rutas iniciales: Dashboard y 404
   - Layout wrapper (crear Layout básico primero)

**Rutas iniciales mínimas:**
- `/` → DashboardPage (a crear en Fase 2)
- `*` → NotFoundPage (404)

#### 0.3.6 Context API (Opcional pero recomendado)

**Archivos a crear:**

1. **`src/core/context/FinanceContext.tsx`** (Opcional)
   - Context para estado global compartido
   - Puede incluir: accounts, incomes, expenses (cache)
   - Provider para envolver la aplicación

#### 0.3.7 Actualizar `main.tsx` y `App.tsx`

**Modificaciones necesarias:**

1. **`src/main.tsx`**
   - Ya tiene HeroUIProvider ✅
   - Agregar: Router (BrowserRouter o usar AppRouter)

2. **`src/App.tsx`**
   - Reemplazar contenido actual por: Layout + Router
   - O usar AppRouter directamente

### 0.4 Verificación de Conexión con Backend

**Paso de verificación:**
1. Crear archivo de prueba `src/core/api/api.test.ts` (temporal)
2. Hacer llamada de prueba: `GET /api/dashboard`
3. Verificar que CORS funciona correctamente
4. Eliminar archivo de prueba después de verificar

**Comandos de verificación:**
```bash
# Asegurar que Backend está corriendo
cd Backend
npm run start:dev  # Debe estar en puerto 3000

# En otra terminal, iniciar Frontend
cd Frontend
npm run dev  # Debe estar en puerto 5173
```

---

## 🎯 FASE 1: COMPONENTES BASE Y SHARED

### 1.1 Componentes Compartidos (`shared/components/`)

#### Loading Components
- **LoadingSpinner.tsx** - Spinner de carga
- **LoadingCard.tsx** - Card con skeleton loading

#### Form Components
- **FormInput.tsx** - Input con validación integrada
- **FormSelect.tsx** - Select con opciones
- **FormDatePicker.tsx** - Date picker
- **FormTextarea.tsx** - Textarea
- **SubmitButton.tsx** - Botón de submit con estado de carga

#### Layout Components
- **Layout.tsx** - Layout principal con header y sidebar
- **Header.tsx** - Header con navegación
- **Sidebar.tsx** - Sidebar con menú de navegación
- **PageHeader.tsx** - Header de página con título y acciones

#### UI Components
- **Card.tsx** - Card reutilizable
- **Modal.tsx** - Modal genérico
- **ConfirmDialog.tsx** - Diálogo de confirmación
- **Toast.tsx** - Componente de notificaciones (usar HeroUI)
- **DataTable.tsx** - Tabla de datos con paginación y filtros
- **EmptyState.tsx** - Estado vacío

### 1.2 Hooks Compartidos (`shared/hooks/`)

- **useApi.ts** - Hook para llamadas API con manejo de carga y errores
- **useFormValidation.ts** - Hook para validación de formularios
- **useToast.ts** - Hook para mostrar notificaciones
- **useConfirm.ts** - Hook para confirmaciones

### 1.3 Tipos Compartidos (`shared/types/`)

- **common.types.ts** - Tipos compartidos (Enums, interfaces comunes)
- **api.types.ts** - Tipos de respuesta de API

---

## 🏠 FASE 2: DASHBOARD (PRIORIDAD ALTA - PÁGINA PRINCIPAL)

### 2.1 Estructura del Módulo Dashboard

```
features/dashboard/
├── dashboard.data/
│   └── dashboard.service.ts
├── dashboard.domain/
│   ├── dashboard.types.ts
│   └── dashboard.utils.ts
├── dashboard.ui/
│   ├── MoneyAvailableCard.tsx
│   ├── AccountsSummaryCard.tsx
│   ├── BudgetProgressCard.tsx
│   ├── ExpensesChart.tsx (Highcharts)
│   ├── IncomesChart.tsx (Highcharts)
│   └── RecentTransactionsCard.tsx
└── dashboard.pages/
    └── DashboardPage.tsx
```

### 2.2 Endpoints a Consumir
- `GET /api/dashboard` - Obtener resumen completo

### 2.3 Componentes a Desarrollar

#### MoneyAvailableCard
- Muestra el dinero disponible para gastar
- Fórmula: Balance total - Presupuestos activos - Deuda tarjetas

#### AccountsSummaryCard
- Lista de cuentas con sus balances
- Mostrar solo cuentas no-CREDIT_CARD
- Formato de moneda

#### BudgetProgressCard
- Presupuestos activos y su progreso
- Barra de progreso visual
- Monto disponible vs utilizado

#### ExpensesChart
- Gráfica de pastel (pie chart) con gastos por categoría
- Usar Highcharts
- Filtro por mes/período

#### IncomesChart
- Gráfica de barras con ingresos por mes
- Usar Highcharts

#### RecentTransactionsCard
- Últimas 5-10 transacciones recientes
- Tabla con scroll

---

## 💰 FASE 3: CUENTAS (ACCOUNTS)

### 3.1 Estructura del Módulo

```
features/accounts/
├── accounts.data/
│   └── accounts.service.ts
├── accounts.domain/
│   ├── accounts.types.ts
│   ├── accounts.schema.ts (Yup)
│   └── accounts.utils.ts
├── accounts.ui/
│   ├── AccountCard.tsx
│   ├── AccountForm.tsx
│   ├── AccountList.tsx
│   └── AccountDetails.tsx
└── accounts.pages/
    ├── AccountsPage.tsx
    └── AccountDetailPage.tsx
```

### 3.2 Endpoints a Consumir
- `GET /api/accounts` - Listar cuentas
- `POST /api/accounts` - Crear cuenta
- `GET /api/accounts/:id` - Obtener cuenta
- `PATCH /api/accounts/:id` - Actualizar cuenta
- `DELETE /api/accounts/:id` - Eliminar cuenta

### 3.3 Funcionalidades

#### AccountsPage
- Lista de todas las cuentas
- Card por cuenta mostrando: nombre, tipo, balance
- Filtros: por tipo de cuenta
- Botón para crear nueva cuenta
- Acciones: editar, eliminar, ver detalles

#### AccountForm (Modal o Página)
- Campos: nombre, tipo (select), balance inicial
- Validación con Yup
- Reutilizable para crear y editar

#### AccountDetailPage
- Detalle completo de una cuenta
- Balance actualizado (calculado)
- Historial de movimientos asociados
- Tabs: Ingresos, Gastos, Transacciones, Ajustes

---

## 💵 FASE 4: INGRESOS (INCOMES)

### 4.1 Estructura del Módulo

```
features/incomes/
├── incomes.data/
│   └── incomes.service.ts
├── incomes.domain/
│   ├── incomes.types.ts
│   ├── incomes.schema.ts (Yup)
│   └── incomes.utils.ts
├── incomes.ui/
│   ├── IncomeCard.tsx
│   ├── IncomeForm.tsx
│   ├── IncomeList.tsx
│   └── IncomeFilters.tsx
└── incomes.pages/
    └── IncomesPage.tsx
```

### 4.2 Endpoints a Consumir
- `GET /api/incomes` - Listar ingresos (con filtros)
- `POST /api/incomes` - Crear ingreso
- `GET /api/incomes/:id` - Obtener ingreso
- `PATCH /api/incomes/:id` - Actualizar ingreso
- `DELETE /api/incomes/:id` - Eliminar ingreso

### 4.3 Funcionalidades

#### IncomesPage
- Lista de ingresos con tabla o cards
- Filtros: por cuenta, por fecha (rango), por frecuencia
- Botón para crear nuevo ingreso
- Formato de moneda y fecha

#### IncomeForm
- Campos: monto, cuenta (select), frecuencia, descripción (opcional), fecha
- Validación con Yup
- Select de cuentas desde API

---

## 💸 FASE 5: GASTOS (EXPENSES)

### 5.1 Estructura del Módulo

```
features/expenses/
├── expenses.data/
│   └── expenses.service.ts
├── expenses.domain/
│   ├── expenses.types.ts
│   ├── expenses.schema.ts (Yup)
│   └── expenses.utils.ts
├── expenses.ui/
│   ├── ExpenseCard.tsx
│   ├── ExpenseForm.tsx
│   ├── ExpenseList.tsx
│   └── ExpenseFilters.tsx
└── expenses.pages/
    └── ExpensesPage.tsx
```

### 5.2 Endpoints a Consumir
- `GET /api/expenses` - Listar gastos (con filtros)
- `POST /api/expenses` - Crear gasto
- `GET /api/expenses/:id` - Obtener gasto
- `PATCH /api/expenses/:id` - Actualizar gasto
- `DELETE /api/expenses/:id` - Eliminar gasto

### 5.3 Funcionalidades

#### ExpensesPage
- Lista de gastos con tabla o cards
- Filtros: por cuenta, por tipo de gasto, por fecha, por tipo (FIXED/VARIABLE)
- Botón para crear nuevo gasto
- Indicador visual si es gasto fijo o variable
- Relación con presupuesto (si es gasto fijo)

#### ExpenseForm
- Campos: monto, cuenta (select), tipo de gasto (select), descripción (opcional), fecha
- Validación con Yup
- Select de tipos de gasto desde API
- Mostrar presupuesto disponible si es gasto fijo

---

## 🏷️ FASE 6: TIPOS DE GASTOS (EXPENSE TYPES)

### 6.1 Estructura del Módulo

```
features/expense-types/
├── expense-types.data/
│   └── expense-types.service.ts
├── expense-types.domain/
│   ├── expense-types.types.ts
│   ├── expense-types.schema.ts (Yup)
│   └── expense-types.utils.ts
├── expense-types.ui/
│   ├── ExpenseTypeCard.tsx
│   ├── ExpenseTypeForm.tsx
│   ├── ExpenseTypeList.tsx
│   └── ExpenseTypeBadge.tsx (FIXED/VARIABLE)
└── expense-types.pages/
    └── ExpenseTypesPage.tsx
```

### 6.2 Endpoints a Consumir
- `GET /api/expense-types` - Listar tipos de gasto
- `POST /api/expense-types` - Crear tipo de gasto
- `GET /api/expense-types/:id` - Obtener tipo de gasto
- `PATCH /api/expense-types/:id` - Actualizar tipo de gasto
- `DELETE /api/expense-types/:id` - Eliminar tipo de gasto

### 6.3 Funcionalidades

#### ExpenseTypesPage
- Lista de tipos de gasto
- Agrupación visual: Fijos vs Variables
- Badge indicando si es FIXED o VARIABLE
- Botón para crear nuevo tipo

#### ExpenseTypeForm
- Campos: nombre, tipo (FIXED/VARIABLE), descripción (opcional)
- Validación con Yup

---

## 🔄 FASE 7: TRANSACCIONES (TRANSACTIONS)

### 7.1 Estructura del Módulo

```
features/transactions/
├── transactions.data/
│   └── transactions.service.ts
├── transactions.domain/
│   ├── transactions.types.ts
│   ├── transactions.schema.ts (Yup)
│   └── transactions.utils.ts
├── transactions.ui/
│   ├── TransactionCard.tsx
│   ├── TransactionForm.tsx
│   ├── TransactionList.tsx
│   └── TransactionFilters.tsx
└── transactions.pages/
    └── TransactionsPage.tsx
```

### 7.2 Endpoints a Consumir
- `GET /api/transactions` - Listar transacciones (con filtros)
- `POST /api/transactions` - Crear transacción
- `GET /api/transactions/:id` - Obtener transacción
- `PATCH /api/transactions/:id` - Actualizar transacción
- `DELETE /api/transactions/:id` - Eliminar transacción

### 7.3 Funcionalidades

#### TransactionsPage
- Lista de transacciones
- Mostrar: desde cuenta → hacia cuenta, monto, fecha
- Filtros: por cuenta origen, por cuenta destino, por fecha
- Botón para crear nueva transacción

#### TransactionForm
- Campos: cuenta origen (select), cuenta destino (select), monto, descripción (opcional), fecha
- Validación: cuenta origen diferente de destino
- Validación con Yup

---

## 💳 FASE 8: TARJETAS DE CRÉDITO (CREDIT CARDS)

### 8.1 Estructura del Módulo

```
features/credit-cards/
├── credit-cards.data/
│   └── credit-cards.service.ts
├── credit-cards.domain/
│   ├── credit-cards.types.ts
│   ├── credit-cards.schema.ts (Yup)
│   └── credit-cards.utils.ts
├── credit-cards.ui/
│   ├── CreditCardCard.tsx
│   ├── CreditCardForm.tsx
│   ├── CreditCardList.tsx
│   └── CreditCardBalanceCard.tsx (saldo negativo = deuda)
└── credit-cards.pages/
    └── CreditCardsPage.tsx
```

### 8.2 Endpoints a Consumir
- `GET /api/credit-cards` - Listar tarjetas
- `POST /api/credit-cards` - Crear tarjeta
- `GET /api/credit-cards/:id` - Obtener tarjeta
- `PATCH /api/credit-cards/:id` - Actualizar tarjeta
- `DELETE /api/credit-cards/:id` - Eliminar tarjeta

### 8.3 Funcionalidades

#### CreditCardsPage
- Lista de tarjetas de crédito
- Mostrar deuda pendiente (saldo negativo)
- Indicadores visuales de nivel de deuda
- Botón para crear nueva tarjeta

#### CreditCardForm
- Similar a AccountForm pero específico para tarjetas
- Campos: nombre, límite de crédito (opcional), balance inicial

---

## 📊 FASE 9: PRESUPUESTOS (BUDGETS)

### 9.1 Estructura del Módulo

```
features/budgets/
├── budgets.data/
│   └── budgets.service.ts
├── budgets.domain/
│   ├── budgets.types.ts
│   ├── budgets.schema.ts (Yup)
│   └── budgets.utils.ts
├── budgets.ui/
│   ├── BudgetCard.tsx
│   ├── BudgetForm.tsx
│   ├── BudgetList.tsx
│   ├── BudgetProgressBar.tsx
│   └── BudgetPeriodSelector.tsx
└── budgets.pages/
    └── BudgetsPage.tsx
```

### 9.2 Endpoints a Consumir
- `GET /api/budgets` - Listar presupuestos (con filtros)
- `POST /api/budgets` - Crear presupuesto quincenal
- `GET /api/budgets/:id` - Obtener presupuesto
- `PATCH /api/budgets/:id` - Actualizar presupuesto
- `DELETE /api/budgets/:id` - Eliminar presupuesto

### 9.3 Funcionalidades

#### BudgetsPage
- Lista de presupuestos activos
- Mostrar: tipo de gasto, período (fechas), monto mensual, monto quincenal, pendiente, disponible
- Filtros: por tipo de gasto, por período, solo activos
- Botón para crear nuevo presupuesto quincenal
- Botón para sugerir próximo presupuesto (si hay uno que termina)

#### BudgetForm
- Campos: tipo de gasto (solo FIXED), monto mensual, monto quincenal (auto-calculado pero editable), fecha inicio, fecha fin
- Validación: tipo de gasto debe ser FIXED
- Auto-sugerir monto quincenal = mensual / 2
- Auto-calcular fecha fin = fecha inicio + 15 días
- Validación de períodos que no se superpongan

#### BudgetProgressBar
- Barra de progreso visual mostrando:
  - Monto utilizado vs disponible
  - Porcentaje de uso
  - Pendiente del período anterior

---

## 🔧 FASE 10: AJUSTES DE CUENTA (ACCOUNT ADJUSTMENTS)

### 10.1 Estructura del Módulo

```
features/account-adjustments/
├── account-adjustments.data/
│   └── account-adjustments.service.ts
├── account-adjustments.domain/
│   ├── account-adjustments.types.ts
│   ├── account-adjustments.schema.ts (Yup)
│   └── account-adjustments.utils.ts
├── account-adjustments.ui/
│   ├── AccountAdjustmentCard.tsx
│   ├── AccountAdjustmentForm.tsx
│   └── AccountAdjustmentList.tsx
└── account-adjustments.pages/
    └── AccountAdjustmentsPage.tsx
```

### 10.2 Endpoints a Consumir
- `GET /api/account-adjustments` - Listar ajustes (con filtros)
- `POST /api/account-adjustments` - Crear ajuste
- `GET /api/account-adjustments/:id` - Obtener ajuste
- `PATCH /api/account-adjustments/:id` - Actualizar ajuste
- `DELETE /api/account-adjustments/:id` - Eliminar ajuste

### 10.3 Funcionalidades

#### AccountAdjustmentsPage
- Lista de ajustes de cuenta
- Filtros: por cuenta, por fecha
- Botón para crear nuevo ajuste

#### AccountAdjustmentForm
- Campos: cuenta (select), monto (positivo o negativo), razón (obligatorio), fecha
- Validación con Yup
- Indicador visual si aumenta o disminuye el balance

---

## 🎨 CONSIDERACIONES DE UI/UX

### Diseño Visual
- **Colores:** Usar paleta de HeroUI
- **Tema:** Claro/Oscuro (implementar toggle)
- **Responsive:** Mobile-first, funciona en móvil, tablet y desktop
- **Iconografía:** Usar iconos de HeroUI o agregar librería de iconos

### Uso de HeroUI con CLI
- **Instalación de componentes:** Usar `npx @heroui/cli add <component-name>` para instalar componentes individuales
- **Ejemplos comunes:**
  - `npx @heroui/cli add button` - Instalar Button
  - `npx @heroui/cli add card` - Instalar Card
  - `npx @heroui/cli add input select` - Instalar múltiples componentes
  - `npx @heroui/cli add modal` - Instalar Modal
- **Documentación:** Consultar documentación de HeroUI para lista completa de componentes disponibles
- **Importación:** Una vez instalado, importar desde `@heroui/react`: `import { Button } from '@heroui/react'`

### Navegación
- **Layout Principal:** Header + Sidebar + Content Area
- **Sidebar:** Menú de navegación con todas las secciones
- **Breadcrumbs:** Para navegación profunda
- **Rutas:**
  - `/` - Dashboard
  - `/accounts` - Cuentas
  - `/incomes` - Ingresos
  - `/expenses` - Gastos
  - `/expense-types` - Tipos de Gastos
  - `/transactions` - Transacciones
  - `/credit-cards` - Tarjetas de Crédito
  - `/budgets` - Presupuestos
  - `/account-adjustments` - Ajustes de Cuenta

### Feedback al Usuario
- **Loading States:** Spinners durante carga de datos
- **Success Messages:** Toast/notificaciones al crear/editar/eliminar
- **Error Handling:** Mensajes de error claros y útiles
- **Empty States:** Mensajes cuando no hay datos
- **Confirmations:** Diálogos de confirmación antes de eliminar

### Formularios
- **Validación:** En tiempo real con Yup
- **Mensajes de Error:** Claros y específicos
- **Placeholders:** Textos descriptivos
- **Labels:** Siempre visibles y claros
- **Submit:** Botón con estado de carga

---

## 📦 DEPENDENCIAS ENTRE FASES

```
FASE 0 (Setup)
    ↓
FASE 1 (Shared Components)
    ↓
FASE 2 (Dashboard) ← Puede empezar en paralelo con FASE 3
    ↓
FASE 3 (Accounts) ← Base para otras features
    ↓
FASE 4 (Incomes) ──┐
FASE 5 (Expenses) ──┤
FASE 6 (Expense Types) ← Necesario para Expenses
FASE 7 (Transactions) ──┤ Todas pueden desarrollarse en paralelo
FASE 8 (Credit Cards) ──┤
FASE 9 (Budgets) ────────┘
FASE 10 (Account Adjustments)
```

### Prioridades Recomendadas:
1. **CRÍTICO:** Fase 0 y Fase 1 (base)
2. **ALTA:** Fase 2 (Dashboard) - Página principal
3. **ALTA:** Fase 3 (Accounts) - Base para todo
4. **MEDIA:** Fase 6 (Expense Types) antes de Fase 5
5. **MEDIA:** Fase 4, 5, 7, 8, 9, 10 (pueden ser en paralelo)

---

## ✅ CHECKLIST DE DESARROLLO POR FASE

### FASE 0: Setup (CRÍTICO - ~30 minutos)

#### Dependencias:
- [ ] Instalar `react-router-dom`
- [ ] Instalar `axios`
- [ ] Instalar `yup`
- [ ] Instalar `react-hook-form`
- [ ] Instalar `@hookform/resolvers`
- [ ] Instalar `highcharts`
- [ ] Instalar `highcharts-react-official`
- [ ] Verificar que todas aparecen en `package.json`

#### Estructura de Carpetas:
- [ ] Crear `src/app/router/`
- [ ] Crear `src/core/api/`
- [ ] Crear `src/core/constants/`
- [ ] Crear `src/core/context/` (opcional)
- [ ] Crear `src/shared/components/`
- [ ] Crear `src/shared/hooks/`
- [ ] Crear `src/shared/utils/`
- [ ] Crear `src/shared/types/`
- [ ] Crear `src/features/` (estructura base para todas las features)

#### Configuración Base:
- [ ] Crear `.env` con `VITE_API_URL=http://localhost:3000/api`
- [ ] Crear `.env.example`
- [ ] Crear `core/api/api.config.ts` (Axios configurado)
- [ ] Crear `core/api/api.interceptors.ts` (opcional)
- [ ] Crear `core/constants/api.constants.ts`
- [ ] Crear `shared/types/common.types.ts` (Enums del Backend)
- [ ] Crear `shared/utils/formatters.ts`
- [ ] Crear `shared/utils/validators.ts`
- [ ] Crear `app/router/AppRouter.tsx` (rutas básicas)
- [ ] Crear `core/context/FinanceContext.tsx` (opcional)

#### Actualización de Archivos Existentes:
- [ ] Actualizar `main.tsx` (integrar Router si es necesario)
- [ ] Actualizar `App.tsx` (usar Layout y Router)

#### Verificación:
- [ ] Backend corriendo en `http://localhost:3000`
- [ ] Frontend corriendo en `http://localhost:5173`
- [ ] Hacer llamada de prueba a API (ej: GET /api/dashboard)
- [ ] Verificar que CORS funciona correctamente
- [ ] Verificar que no hay errores en consola

**Estado Esperado:** ✅ Setup completo, Frontend listo para desarrollar features

**Nota sobre HeroUI:**
- Los componentes de HeroUI se instalarán con CLI según se vayan necesitando durante el desarrollo
- No es necesario instalar todos los componentes de una vez en la Fase 0
- Se recomienda instalar componentes cuando se vayan a usar en cada fase

### FASE 1: Shared Components
- [ ] Instalar componentes HeroUI necesarios con CLI (Button, Card, Input, Select, Modal, etc.)
- [ ] LoadingSpinner, LoadingCard
- [ ] FormInput, FormSelect, FormDatePicker, FormTextarea, SubmitButton
- [ ] Layout, Header, Sidebar, PageHeader
- [ ] Card, Modal, ConfirmDialog, Toast, DataTable, EmptyState
- [ ] Hooks: useApi, useFormValidation, useToast, useConfirm

### FASE 2: Dashboard
- [ ] Dashboard service
- [ ] Dashboard types y utils
- [ ] MoneyAvailableCard
- [ ] AccountsSummaryCard
- [ ] BudgetProgressCard
- [ ] ExpensesChart (Highcharts)
- [ ] IncomesChart (Highcharts)
- [ ] RecentTransactionsCard
- [ ] DashboardPage (composición)

### FASE 3: Accounts
- [ ] Accounts service
- [ ] Accounts types, schema (Yup), utils
- [ ] AccountCard, AccountForm, AccountList, AccountDetails
- [ ] AccountsPage, AccountDetailPage

### FASE 4: Incomes
- [ ] Incomes service
- [ ] Incomes types, schema (Yup), utils
- [ ] IncomeCard, IncomeForm, IncomeList, IncomeFilters
- [ ] IncomesPage

### FASE 5: Expenses
- [ ] Expenses service
- [ ] Expenses types, schema (Yup), utils
- [ ] ExpenseCard, ExpenseForm, ExpenseList, ExpenseFilters
- [ ] ExpensesPage

### FASE 6: Expense Types
- [ ] Expense Types service
- [ ] Expense Types types, schema (Yup), utils
- [ ] ExpenseTypeCard, ExpenseTypeForm, ExpenseTypeList, ExpenseTypeBadge
- [ ] ExpenseTypesPage

### FASE 7: Transactions
- [ ] Transactions service
- [ ] Transactions types, schema (Yup), utils
- [ ] TransactionCard, TransactionForm, TransactionList, TransactionFilters
- [ ] TransactionsPage

### FASE 8: Credit Cards
- [ ] Credit Cards service
- [ ] Credit Cards types, schema (Yup), utils
- [ ] CreditCardCard, CreditCardForm, CreditCardList, CreditCardBalanceCard
- [ ] CreditCardsPage

### FASE 9: Budgets
- [ ] Budgets service
- [ ] Budgets types, schema (Yup), utils
- [ ] BudgetCard, BudgetForm, BudgetList, BudgetProgressBar, BudgetPeriodSelector
- [ ] BudgetsPage

### FASE 10: Account Adjustments
- [ ] Account Adjustments service
- [ ] Account Adjustments types, schema (Yup), utils
- [ ] AccountAdjustmentCard, AccountAdjustmentForm, AccountAdjustmentList
- [ ] AccountAdjustmentsPage

---

## 🚀 PRÓXIMOS PASOS INMEDIATOS

### Paso 1: Completar Fase 0 (CRÍTICO) ⏱️ ~30 minutos

Este paso es **OBLIGATORIO** antes de continuar. Incluye:

1. **Instalar 7 dependencias faltantes**
   ```bash
   npm install react-router-dom axios yup react-hook-form @hookform/resolvers highcharts highcharts-react-official
   ```

2. **Crear estructura completa de carpetas** según Screaming Architecture
   - Crear todas las carpetas base: `app/`, `core/`, `shared/`, `features/`
   - Crear subcarpetas necesarias en cada una

3. **Configurar archivos base**
   - `.env` y `.env.example`
   - `core/api/api.config.ts` (Axios)
   - `core/constants/api.constants.ts`
   - `shared/types/common.types.ts` (con Enums del Backend)
   - `shared/utils/formatters.ts` y `validators.ts`
   - `app/router/AppRouter.tsx`

4. **Verificar conexión**
   - Hacer petición de prueba al Backend
   - Asegurar que CORS funciona

**✅ Al completar:** Frontend estará al 100% listo para desarrollar features.

### Paso 2: Desarrollar Fase 1 (Componentes Compartidos)

Una vez completada la Fase 0, desarrollar los componentes base que serán usados en todas las features:
- Componentes de Loading
- Componentes de Formularios
- Layout Components (Header, Sidebar, Layout)
- UI Components reutilizables
- Hooks compartidos

### Paso 3: Comenzar Fase 2 (Dashboard)

Página principal que muestra el resumen financiero completo. Ideal para:
- Probar la integración con el Backend
- Ver resultados visuales inmediatos
- Validar que todo funciona correctamente

### Paso 4: Continuar con Fases 3-10 según Prioridades

Ver sección "Dependencias entre Fases" para orden recomendado.

---

## 📝 NOTAS IMPORTANTES

- **Backend Base URL:** `http://localhost:3000/api` (configurar en `.env`)
- **Swagger:** Disponible en `http://localhost:3000/api` para referencia de API
- **Validaciones:** Todas las validaciones deben coincidir con las del Backend (class-validator)
- **Manejo de Errores:** Implementar manejo centralizado de errores de API
- **Formato de Fechas:** Usar formato consistente en toda la aplicación
- **Formato de Moneda:** Usar formato localizado (MX o según necesidad)
- **Soft Delete:** El Backend usa soft delete, considerar esto en la UI

---

---

## 📋 REFERENCIA RÁPIDA

### Checklist Pre-Desarrollo (Antes de empezar a codear features)

```bash
# 1. Instalar dependencias faltantes
cd Frontend
npm install react-router-dom axios yup react-hook-form @hookform/resolvers highcharts highcharts-react-official

# 2. Verificar Backend está corriendo
cd ../Backend
npm run start:dev  # Puerto 3000

# 3. Verificar Frontend puede iniciar
cd ../Frontend
npm run dev  # Puerto 5173
```

### Estructura de Carpetas Mínima Requerida

```
src/
├── app/router/AppRouter.tsx
├── core/
│   ├── api/api.config.ts
│   └── constants/api.constants.ts
├── shared/
│   ├── types/common.types.ts
│   └── utils/formatters.ts
└── features/  (estructura base, se llena en fases siguientes)
```

### Archivos de Configuración Críticos

1. `.env` → `VITE_API_URL=http://localhost:3000/api`
2. `core/api/api.config.ts` → Configuración de Axios
3. `app/router/AppRouter.tsx` → Rutas básicas
4. `shared/types/common.types.ts` → Enums del Backend

---

**Última Actualización:** Diciembre 2024  
**Estado:** ✅ Planificación Completa y Actualizada  
**Basado en:** Revisión del Backend + Estado actual del proyecto  
**Estado Actual Frontend:** ⚠️ Proyecto Base de Vite - Falta Fase 0 (Setup inicial - ~30-45 min)

**Notas Importantes:**
- HeroUI usa CLI para instalar componentes individualmente: `npx @heroui/cli add <component>`
- Tailwind CSS y HeroUI ya están configurados
- Todo lo demás (estructura, dependencias, configuración) debe crearse desde cero

