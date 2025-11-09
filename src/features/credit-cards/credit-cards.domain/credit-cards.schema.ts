import * as yup from 'yup';

/**
 * Esquema de validación para crear una tarjeta de crédito
 */
export const createCreditCardSchema = yup.object({
  name: yup
    .string()
    .required('El nombre es requerido')
    .min(1, 'El nombre debe tener al menos 1 carácter')
    .max(100, 'El nombre no puede exceder 100 caracteres'),
  initialBalance: yup
    .number()
    .typeError('El balance inicial debe ser un número')
    .required('El balance inicial es requerido'),
});

/**
 * Esquema de validación para actualizar una tarjeta de crédito
 */
export const updateCreditCardSchema = yup.object({
  name: yup
    .string()
    .min(1, 'El nombre debe tener al menos 1 carácter')
    .max(100, 'El nombre no puede exceder 100 caracteres')
    .optional(),
  initialBalance: yup
    .number()
    .typeError('El balance inicial debe ser un número')
    .optional(),
});

