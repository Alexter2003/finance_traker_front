import * as yup from 'yup';
import { AccountType } from '../../../shared/types/common.types';

/**
 * Esquema de validación para crear una cuenta
 */
export const createAccountSchema = yup.object({
  name: yup
    .string()
    .required('El nombre es requerido')
    .min(1, 'El nombre debe tener al menos 1 carácter')
    .max(100, 'El nombre no puede exceder 100 caracteres'),
  type: yup
    .string()
    .oneOf(
      Object.values(AccountType) as string[],
      'Tipo de cuenta inválido'
    )
    .required('El tipo de cuenta es requerido'),
  initialBalance: yup
    .number()
    .typeError('El balance inicial debe ser un número')
    .min(0, 'El balance inicial debe ser mayor o igual a 0')
    .required('El balance inicial es requerido'),
});

/**
 * Esquema de validación para actualizar una cuenta
 */
export const updateAccountSchema = yup.object({
  name: yup
    .string()
    .min(1, 'El nombre debe tener al menos 1 carácter')
    .max(100, 'El nombre no puede exceder 100 caracteres')
    .optional(),
  type: yup
    .string()
    .oneOf(
      Object.values(AccountType) as string[],
      'Tipo de cuenta inválido'
    )
    .optional(),
  initialBalance: yup
    .number()
    .typeError('El balance inicial debe ser un número')
    .min(0, 'El balance inicial debe ser mayor o igual a 0')
    .optional(),
});

