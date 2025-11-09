# Frontend - Finance Tracker

## 📋 Descripción

Aplicación web React para la gestión de finanzas personales con interfaz intuitiva y responsive. Permite visualizar, registrar y analizar ingresos, egresos, gastos fijos/variables y tarjetas de crédito.

## 🛠️ Stack Tecnológico

- **Framework:** React 18+
- **Build Tool:** Vite
- **Runtime:** Node.js v22
- **UI Library:** HeroUI (NextUI)
- **Routing:** React Router DOM v6+
- **Gráficas:** Highcharts + react-highcharts
- **Validación de Formularios:** Yup
- **Estado Global:** Context API
- **HTTP Client:** Axios + fetch nativo
- **Arquitectura:** Screaming Architecture

## 📁 Estructura del Proyecto (Screaming Architecture)

```
Frontend/
├── src/
│   ├── main.tsx                  # Punto de entrada
│   ├── App.tsx                    # Componente raíz
│   ├── index.css                  # Estilos globales
│   ├── app/
│   │   └── router/                # Configuración de rutas
│   │       └── AppRouter.tsx
│   ├── features/                  # Funcionalidades (Screaming Architecture)
│   │   ├── accounts/
│   │   │   ├── accounts.ui/       # Componentes UI
│   │   │   │   ├── AccountCard.tsx
│   │   │   │   └── AccountForm.tsx
│   │   │   ├── accounts.data/     # Servicios y llamadas API
│   │   │   │   └── accounts.service.ts
│   │   │   ├── accounts.domain/   # Lógica de negocio y tipos
│   │   │   │   ├── accounts.types.ts
│   │   │   │   └── accounts.utils.ts
│   │   │   └── accounts.pages/    # Páginas/vistas
│   │   │       └── AccountsPage.tsx
│   │   ├── transactions/
│   │   │   ├── transactions.ui/
│   │   │   ├── transactions.data/
│   │   │   ├── transactions.domain/
│   │   │   └── transactions.pages/
│   │   ├── incomes/
│   │   │   ├── incomes.ui/
│   │   │   ├── incomes.data/
│   │   │   ├── incomes.domain/
│   │   │   └── incomes.pages/
│   │   ├── expenses/
│   │   │   ├── expenses.ui/
│   │   │   ├── expenses.data/
│   │   │   ├── expenses.domain/
│   │   │   └── expenses.pages/
│   │   ├── fixed-expenses/
│   │   │   ├── fixed-expenses.ui/
│   │   │   ├── fixed-expenses.data/
│   │   │   ├── fixed-expenses.domain/
│   │   │   └── fixed-expenses.pages/
│   │   ├── variable-expenses/
│   │   │   ├── variable-expenses.ui/
│   │   │   ├── variable-expenses.data/
│   │   │   ├── variable-expenses.domain/
│   │   │   └── variable-expenses.pages/
│   │   ├── credit-cards/
│   │   │   ├── credit-cards.ui/
│   │   │   ├── credit-cards.data/
│   │   │   ├── credit-cards.domain/
│   │   │   └── credit-cards.pages/
│   │   └── dashboard/
│   │       ├── dashboard.ui/
│   │       │   ├── MoneyAvailableCard.tsx
│   │       │   ├── ExpensesChart.tsx
│   │       │   └── BudgetProgressCard.tsx
│   │       ├── dashboard.data/
│   │       ├── dashboard.domain/
│   │       └── dashboard.pages/
│   │           └── DashboardPage.tsx
│   ├── shared/                    # Componentes y utilidades compartidas
│   │   ├── components/             # Componentes reutilizables
│   │   │   ├── Button/
│   │   │   ├── Input/
│   │   │   ├── Card/
│   │   │   └── Loading/
│   │   ├── hooks/                  # Custom hooks
│   │   │   ├── useApi.ts
│   │   │   └── useFormValidation.ts
│   │   ├── utils/                  # Utilidades
│   │   │   ├── formatters.ts
│   │   │   └── validators.ts
│   │   └── types/                  # Tipos compartidos
│   │       └── common.types.ts
│   ├── core/                       # Configuración y setup
│   │   ├── api/                    # Configuración de Axios
│   │   │   ├── api.config.ts
│   │   │   └── api.interceptors.ts
│   │   ├── context/                # Context providers
│   │   │   ├── AppContext.tsx
│   │   │   └── FinanceContext.tsx
│   │   └── constants/              # Constantes
│   │       └── api.constants.ts
│   └── assets/                     # Recursos estáticos
│       ├── images/
│       └── icons/
├── public/                         # Archivos públicos
├── .env                            # Variables de entorno (no versionar)
├── .env.example                    # Ejemplo de variables de entorno
├── vite.config.ts                  # Configuración de Vite
├── tsconfig.json                   # Configuración de TypeScript
├── package.json                    # Dependencias y scripts
└── README.md                       # Este archivo
```

## 🏗️ Screaming Architecture

La arquitectura se organiza por **features** (funcionalidades) en lugar de por tipo de archivo. Cada feature contiene:

- **`.ui/`** - Componentes de presentación y UI
- **`.data/`** - Servicios, llamadas API, integraciones externas
- **`.domain/`** - Lógica de negocio, tipos, utilidades específicas del dominio
- **`.pages/`** - Páginas/vistas completas que componen múltiples componentes

### Ventajas

- Escalabilidad: Fácil agregar nuevas features sin afectar otras
- Mantenibilidad: Todo relacionado a una feature está junto
- Claridad: Estructura predecible y fácil de navegar

## 🎨 HeroUI (NextUI)

HeroUI proporciona componentes pre-estilizados y accesibles:

```tsx
import { Button, Card, Input } from '@heroui/react';

function Example() {
  return (
    <Card>
      <Input label="Nombre" />
      <Button color="primary">Guardar</Button>
    </Card>
  );
}
```

### Configuración del Provider

```tsx
// main.tsx
import { NextUIProvider } from '@heroui/react';

<NextUIProvider>
  <App />
</NextUIProvider>
```

## 📊 Highcharts

Para visualización de gráficas:

```tsx
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

function ExpensesChart({ data }) {
  const options = {
    chart: { type: 'pie' },
    title: { text: 'Gastos por Categoría' },
    series: [{ data }]
  };

  return <HighchartsReact highcharts={Highcharts} options={options} />;
}
```

## 🔄 Context API

Manejo de estado global mediante Context API:

```tsx
// core/context/FinanceContext.tsx
export const FinanceContext = createContext();

export function FinanceProvider({ children }) {
  const [accounts, setAccounts] = useState([]);
  const [incomes, setIncomes] = useState([]);
  
  return (
    <FinanceContext.Provider value={{ accounts, incomes }}>
      {children}
    </FinanceContext.Provider>
  );
}
```

## 🌐 HTTP Client

### Configuración de Axios

```typescript
// core/api/api.config.ts
import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10000,
});

export default api;
```

### Uso en Servicios

```typescript
// features/accounts/accounts.data/accounts.service.ts
import api from '@/core/api/api.config';

export const accountsService = {
  getAll: () => api.get('/accounts'),
  create: (data) => api.post('/accounts', data),
  update: (id, data) => api.put(`/accounts/${id}`, data),
  delete: (id) => api.delete(`/accounts/${id}`),
};
```

## ✅ Validación con Yup

Esquemas de validación para formularios:

```typescript
// features/accounts/accounts.domain/accounts.schema.ts
import * as yup from 'yup';

export const createAccountSchema = yup.object({
  name: yup.string().required('El nombre es requerido'),
  type: yup.string().required('El tipo es requerido'),
  initialBalance: yup
    .number()
    .min(0, 'El balance debe ser positivo')
    .required('El balance inicial es requerido'),
});
```

### Uso con React Hook Form

```tsx
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

function AccountForm() {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(createAccountSchema),
  });

  return <form onSubmit={handleSubmit(onSubmit)}>...</form>;
}
```

## 🛣️ React Router DOM

Configuración de rutas:

```tsx
// app/router/AppRouter.tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/accounts" element={<AccountsPage />} />
        <Route path="/incomes" element={<IncomesPage />} />
        <Route path="/expenses" element={<ExpensesPage />} />
      </Routes>
    </BrowserRouter>
  );
}
```

## 📱 Responsive Design

HeroUI incluye soporte responsive nativo. Para breakpoints personalizados:

```tsx
// Usando clases de Tailwind (HeroUI usa Tailwind)
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  {/* Contenido responsive */}
</div>
```

## 🔧 Configuración

### Variables de Entorno

Crear archivo `.env` en la raíz del proyecto:

```env
VITE_API_URL=http://localhost:3000
VITE_APP_NAME=Finance Tracker
```

Acceso en código:

```typescript
const apiUrl = import.meta.env.VITE_API_URL;
```

### Vite Config

```typescript
// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
```

## 📦 Dependencias Principales

### Producción
- `react` - Biblioteca React
- `react-dom` - React DOM
- `react-router-dom` - Routing
- `@heroui/react` - Componentes UI
- `highcharts` - Librería de gráficas
- `highcharts-react-official` - Wrapper React para Highcharts
- `axios` - Cliente HTTP
- `yup` - Validación de esquemas
- `react-hook-form` - Manejo de formularios

### Desarrollo
- `@vitejs/plugin-react` - Plugin React para Vite
- `typescript` - TypeScript
- `@types/react` - Tipos de React
- `@types/node` - Tipos de Node.js

## 🚀 Scripts Disponibles

```bash
# Desarrollo
npm run dev          # Inicia servidor de desarrollo (http://localhost:5173)

# Producción
npm run build        # Compila para producción
npm run preview      # Preview de build de producción

# Linting y formato
npm run lint         # Ejecuta ESLint
npm run format       # Formatea código con Prettier
```

## 🎯 Convenciones de Código

### Nomenclatura

- **Componentes:** PascalCase (`AccountCard.tsx`)
- **Hooks:** camelCase con prefijo `use` (`useAccounts.ts`)
- **Servicios:** camelCase (`accounts.service.ts`)
- **Tipos:** PascalCase (`Account.types.ts`)
- **Utilidades:** camelCase (`formatters.ts`)

### Estructura de Componentes

```tsx
// Estructura típica de componente
import { useState } from 'react';
import { Button } from '@heroui/react';

interface Props {
  // Props tipadas
}

export function ComponentName({ prop1, prop2 }: Props) {
  // Hooks
  const [state, setState] = useState();
  
  // Handlers
  const handleClick = () => {};
  
  // Render
  return <div>...</div>;
}
```

## 📋 Checklist de Desarrollo

- [ ] Variables de entorno configuradas
- [ ] API backend corriendo y accesible
- [ ] HeroUI Provider configurado en App
- [ ] Router configurado con todas las rutas
- [ ] Context API configurado para estado global
- [ ] Axios configurado con baseURL correcta
- [ ] Esquemas de Yup creados para formularios
- [ ] Highcharts configurado para gráficas
- [ ] Diseño responsive implementado
- [ ] Manejo de errores en llamadas API

## 🎨 Consideraciones de UI/UX

- **Diseño Intuitivo:** Navegación clara y predecible
- **Feedback Visual:** Loading states, mensajes de éxito/error
- **Responsive:** Funciona en móvil, tablet y desktop
- **Accesibilidad:** Componentes HeroUI incluyen soporte ARIA
- **Performance:** Lazy loading de rutas y componentes pesados

## 🔮 Estructura de Features Ejemplo

Cada feature sigue el mismo patrón:

```
feature-name/
├── feature-name.ui/           # Componentes de presentación
├── feature-name.data/          # Servicios y API calls
├── feature-name.domain/        # Lógica de negocio y tipos
└── feature-name.pages/         # Páginas completas
```

Esto facilita:
- Escalabilidad del proyecto
- Mantenimiento del código
- Colaboración en equipo

