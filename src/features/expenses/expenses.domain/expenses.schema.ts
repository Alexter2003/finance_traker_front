import * as yup from 'yup';

/**
 * Esquema de validación para crear un gasto
 */
export const createExpenseSchema = yup.object({
  amount: yup
    .number()
    .typeError('El monto debe ser un número')
    .min(0.01, 'El monto debe ser mayor a 0')
    .required('El monto es requerido'),
  accountId: yup
    .number()
    .typeError('Debes seleccionar una cuenta')
    .required('La cuenta es requerida'),
  expenseTypeId: yup
    .number()
    .typeError('Debes seleccionar un tipo de gasto')
    .required('El tipo de gasto es requerido'),
  description: yup
    .string()
    .max(500, 'La descripción no puede exceder 500 caracteres')
    .optional(),
  date: yup
    .string()
    .required('La fecha es requerida'),
});

/**
 * Esquema de validación para actualizar un gasto
 */
export const updateExpenseSchema = yup.object({
  amount: yup
    .number()
    .typeError('El monto debe ser un número')
    .min(0.01, 'El monto debe ser mayor a 0')
    .optional(),
  accountId: yup
    .number()
    .typeError('Debes seleccionar una cuenta')
    .optional(),
  expenseTypeId: yup
    .number()
    .typeError('Debes seleccionar un tipo de gasto')
    .optional(),
  description: yup
    .string()
    .max(500, 'La descripción no puede exceder 500 caracteres')
    .optional(),
  date: yup
    .string()
    .optional(),
});

