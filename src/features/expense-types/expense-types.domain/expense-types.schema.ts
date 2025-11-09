import * as yup from 'yup';
import { ExpenseCategoryType } from '../../../shared/types/common.types';

/**
 * Esquema de validación para crear un tipo de gasto
 */
export const createExpenseTypeSchema = yup.object({
  name: yup
    .string()
    .required('El nombre es requerido')
    .min(1, 'El nombre debe tener al menos 1 carácter')
    .max(100, 'El nombre no puede exceder 100 caracteres'),
  type: yup
    .string()
    .oneOf(
      Object.values(ExpenseCategoryType) as string[],
      'Tipo de categoría inválido'
    )
    .required('El tipo de categoría es requerido'),
  description: yup
    .string()
    .max(500, 'La descripción no puede exceder 500 caracteres')
    .optional(),
});

/**
 * Esquema de validación para actualizar un tipo de gasto
 */
export const updateExpenseTypeSchema = yup.object({
  name: yup
    .string()
    .min(1, 'El nombre debe tener al menos 1 carácter')
    .max(100, 'El nombre no puede exceder 100 caracteres')
    .optional(),
  type: yup
    .string()
    .oneOf(
      Object.values(ExpenseCategoryType) as string[],
      'Tipo de categoría inválido'
    )
    .optional(),
  description: yup
    .string()
    .max(500, 'La descripción no puede exceder 500 caracteres')
    .optional(),
});

