import * as yup from 'yup';

/**
 * Esquema de validación para crear una transacción
 */
export const createTransactionSchema = yup.object({
  fromAccountId: yup
    .number()
    .typeError('Debes seleccionar una cuenta de origen')
    .required('La cuenta de origen es requerida'),
  toAccountId: yup
    .number()
    .typeError('Debes seleccionar una cuenta de destino')
    .required('La cuenta de destino es requerida')
    .test(
      'different-accounts',
      'La cuenta de origen y destino no pueden ser la misma',
      function (value) {
        return value !== this.parent.fromAccountId;
      }
    ),
  amount: yup
    .number()
    .typeError('El monto debe ser un número')
    .min(0.01, 'El monto debe ser mayor a 0')
    .required('El monto es requerido'),
  description: yup
    .string()
    .max(500, 'La descripción no puede exceder 500 caracteres')
    .optional(),
  date: yup.string().required('La fecha es requerida'),
});

/**
 * Esquema de validación para actualizar una transacción
 */
export const updateTransactionSchema = yup.object({
  fromAccountId: yup
    .number()
    .typeError('Debes seleccionar una cuenta de origen')
    .optional()
    .test(
      'different-accounts',
      'La cuenta de origen y destino no pueden ser la misma',
      function (value) {
        if (value === undefined) return true;
        const toAccountId = this.parent.toAccountId;
        if (toAccountId !== undefined) {
          return value !== toAccountId;
        }
        return true;
      }
    ),
  toAccountId: yup
    .number()
    .typeError('Debes seleccionar una cuenta de destino')
    .optional()
    .test(
      'different-accounts',
      'La cuenta de origen y destino no pueden ser la misma',
      function (value) {
        if (value === undefined) return true;
        const fromAccountId = this.parent.fromAccountId;
        if (fromAccountId !== undefined) {
          return value !== fromAccountId;
        }
        return true;
      }
    ),
  amount: yup
    .number()
    .typeError('El monto debe ser un número')
    .min(0.01, 'El monto debe ser mayor a 0')
    .optional(),
  description: yup
    .string()
    .max(500, 'La descripción no puede exceder 500 caracteres')
    .optional(),
  date: yup.string().optional(),
});

