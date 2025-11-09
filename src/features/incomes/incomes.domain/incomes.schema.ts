import * as yup from 'yup';
import { IncomeFrequency } from '../../../shared/types/common.types';

/**
 * Esquema de validación para crear un ingreso
 */
export const createIncomeSchema = yup.object({
  amount: yup
    .number()
    .typeError('El monto debe ser un número')
    .min(0.01, 'El monto debe ser mayor a 0')
    .required('El monto es requerido'),
  accountId: yup
    .number()
    .typeError('La cuenta es requerida')
    .required('La cuenta es requerida')
    .integer('La cuenta debe ser un número entero'),
  frequency: yup
    .string()
    .oneOf(
      Object.values(IncomeFrequency) as string[],
      'Frecuencia inválida'
    )
    .required('La frecuencia es requerida'),
  description: yup
    .string()
    .max(500, 'La descripción no puede exceder 500 caracteres')
    .optional(),
  date: yup
    .string()
    .required('La fecha es requerida'),
});

/**
 * Esquema de validación para actualizar un ingreso
 */
export const updateIncomeSchema = yup.object({
  amount: yup
    .number()
    .typeError('El monto debe ser un número')
    .min(0.01, 'El monto debe ser mayor a 0')
    .optional(),
  accountId: yup
    .number()
    .typeError('La cuenta debe ser un número')
    .integer('La cuenta debe ser un número entero')
    .optional(),
  frequency: yup
    .string()
    .oneOf(
      Object.values(IncomeFrequency) as string[],
      'Frecuencia inválida'
    )
    .optional(),
  description: yup
    .string()
    .max(500, 'La descripción no puede exceder 500 caracteres')
    .optional(),
  date: yup
    .string()
    .optional(),
});

