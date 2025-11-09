import * as yup from 'yup';

/**
 * Esquema de validación para crear un presupuesto
 */
export const createBudgetSchema = yup.object({
    expenseTypeId: yup
        .number()
        .typeError('El tipo de gasto es requerido')
        .integer('El tipo de gasto debe ser un número entero')
        .min(1, 'El tipo de gasto es requerido')
        .required('El tipo de gasto es requerido'),
    monthlyAmount: yup
        .number()
        .typeError('El monto mensual debe ser un número')
        .min(0, 'El monto mensual debe ser mayor o igual a 0')
        .required('El monto mensual es requerido'),
    biweeklyAmount: yup
        .number()
        .typeError('El monto quincenal debe ser un número')
        .min(0, 'El monto quincenal debe ser mayor o igual a 0')
        .optional(),
    pendingAmount: yup
        .number()
        .typeError('El monto pendiente debe ser un número')
        .min(0, 'El monto pendiente debe ser mayor o igual a 0')
        .optional(),
    startDate: yup
        .string()
        .required('La fecha de inicio es requerida'),
    endDate: yup
        .string()
        .required('La fecha de fin es requerida')
        .test(
            'is-after-start',
            'La fecha de fin debe ser posterior a la fecha de inicio',
            function (value) {
                const { startDate } = this.parent;
                if (!startDate || !value) return true;
                return new Date(value) > new Date(startDate);
            }
        ),
});

/**
 * Esquema de validación para actualizar un presupuesto
 */
export const updateBudgetSchema = yup.object({
    monthlyAmount: yup
        .number()
        .typeError('El monto mensual debe ser un número')
        .min(0, 'El monto mensual debe ser mayor o igual a 0')
        .optional(),
    biweeklyAmount: yup
        .number()
        .typeError('El monto quincenal debe ser un número')
        .min(0, 'El monto quincenal debe ser mayor o igual a 0')
        .optional(),
    pendingAmount: yup
        .number()
        .typeError('El monto pendiente debe ser un número')
        .min(0, 'El monto pendiente debe ser mayor o igual a 0')
        .optional(),
    startDate: yup
        .string()
        .optional(),
    endDate: yup
        .string()
        .optional()
        .test(
            'is-after-start',
            'La fecha de fin debe ser posterior a la fecha de inicio',
            function (value) {
                const { startDate } = this.parent;
                if (!startDate || !value) return true;
                return new Date(value) > new Date(startDate);
            }
        ),
});

