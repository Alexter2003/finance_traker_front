import * as yup from 'yup';

/**
 * Esquema de validación para crear un ajuste de cuenta
 */
export const createAccountAdjustmentSchema = yup.object({
  accountId: yup
    .number()
    .typeError('El ID de cuenta debe ser un número')
    .integer('El ID de cuenta debe ser un número entero')
    .required('La cuenta es requerida'),
  amount: yup
    .number()
    .typeError('El monto debe ser un número')
    .required('El monto es requerido')
    .test(
      'decimal-places',
      'El monto no puede tener más de 2 decimales',
      (value) => {
        if (value === undefined || value === null) return true;
        const decimalPlaces = (value.toString().split('.')[1] || '').length;
        return decimalPlaces <= 2;
      }
    ),
  reason: yup
    .string()
    .required('La razón del ajuste es requerida')
    .min(1, 'La razón debe tener al menos 1 carácter')
    .max(500, 'La razón no puede exceder 500 caracteres'),
  date: yup
    .string()
    .required('La fecha es requerida')
    .test('is-date', 'La fecha debe ser válida', (value) => {
      if (!value) return false;
      const date = new Date(value);
      return !isNaN(date.getTime());
    }),
});

/**
 * Esquema de validación para actualizar un ajuste de cuenta
 */
export const updateAccountAdjustmentSchema = yup.object({
  accountId: yup
    .number()
    .typeError('El ID de cuenta debe ser un número')
    .integer('El ID de cuenta debe ser un número entero')
    .optional(),
  amount: yup
    .number()
    .typeError('El monto debe ser un número')
    .optional()
    .test(
      'decimal-places',
      'El monto no puede tener más de 2 decimales',
      (value) => {
        if (value === undefined || value === null) return true;
        const decimalPlaces = (value.toString().split('.')[1] || '').length;
        return decimalPlaces <= 2;
      }
    ),
  reason: yup
    .string()
    .min(1, 'La razón debe tener al menos 1 carácter')
    .max(500, 'La razón no puede exceder 500 caracteres')
    .optional(),
  date: yup
    .string()
    .optional()
    .test('is-date', 'La fecha debe ser válida', (value) => {
      if (!value) return true;
      const date = new Date(value);
      return !isNaN(date.getTime());
    }),
});

