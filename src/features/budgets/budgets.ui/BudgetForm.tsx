import { useEffect, useState } from 'react';
import { useForm, useController } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  FormInput,
  FormSelect,
  FormDatePicker,
  SubmitButton,
} from '../../../shared/components';
import {
  createBudgetSchema,
  updateBudgetSchema,
} from '../budgets.domain/budgets.schema';
import type {
  CreateBudgetDto,
  UpdateBudgetDto,
  Budget,
} from '../budgets.domain/budgets.types';
import { apiClient } from '../../../core/api';
import { API_ENDPOINTS } from '../../../core/constants/api.constants';
import type { ExpenseType } from '../../../shared/types/common.types';
import { ExpenseCategoryType } from '../../../shared/types/common.types';
import type { Resolver } from 'react-hook-form';

interface BudgetFormProps {
  budget?: Budget | null;
  onSubmit: (data: CreateBudgetDto | UpdateBudgetDto) => Promise<void>;
  onCancel?: () => void;
  isLoading?: boolean;
}

type BudgetFormData = {
  expenseTypeId?: number;
  monthlyAmount?: number;
  biweeklyAmount?: number;
  pendingAmount?: number;
  startDate?: string;
  endDate?: string;
  isActive?: boolean;
};

function BudgetForm({
  budget,
  onSubmit,
  onCancel,
  isLoading = false,
}: BudgetFormProps) {
  const isEditMode = !!budget;
  const schema = isEditMode ? updateBudgetSchema : createBudgetSchema;
  const [expenseTypes, setExpenseTypes] = useState<ExpenseType[]>([]);
  const [loadingExpenseTypes, setLoadingExpenseTypes] = useState(true);

  // Cargar tipos de gasto fijos
  useEffect(() => {
    const fetchExpenseTypes = async () => {
      try {
        setLoadingExpenseTypes(true);
        const response = await apiClient.get<{ data: ExpenseType[] }>(
          API_ENDPOINTS.EXPENSE_TYPES,
          {
            params: { type: ExpenseCategoryType.FIXED },
          }
        );
        setExpenseTypes(response.data.data || []);
      } catch (error) {
        console.error('Error al cargar tipos de gasto:', error);
      } finally {
        setLoadingExpenseTypes(false);
      }
    };

    fetchExpenseTypes();
  }, []);

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<BudgetFormData>({
    resolver: yupResolver(schema) as Resolver<BudgetFormData>,
    defaultValues: budget
      ? {
        monthlyAmount: budget.monthlyAmount,
        biweeklyAmount: budget.biweeklyAmount,
        pendingAmount: budget.pendingAmount,
        startDate: budget.startDate,
        endDate: budget.endDate,
        isActive: budget.isActive,
      }
      : {
        expenseTypeId: undefined,
        monthlyAmount: 0,
        biweeklyAmount: undefined,
        pendingAmount: 0,
        startDate: '',
        endDate: '',
      },
    mode: 'onChange',
  });

  const {
    field: isActiveField,
  } = useController({
    name: 'isActive',
    control,
    defaultValue: budget?.isActive ?? true,
  });

  const monthlyAmount = watch('monthlyAmount');
  const biweeklyAmount = watch('biweeklyAmount');

  // Calcular biweeklyAmount automáticamente si monthlyAmount cambia y biweeklyAmount no está definido
  useEffect(() => {
    if (!isEditMode && monthlyAmount && !biweeklyAmount) {
      // El cálculo se hará en el submit
    }
  }, [monthlyAmount, biweeklyAmount, isEditMode]);

  const handleFormSubmit = async (data: BudgetFormData) => {
    if (isEditMode) {
      // Modo edición: UpdateBudgetDto
      const submitData: UpdateBudgetDto = {};

      if (data.monthlyAmount !== undefined) {
        submitData.monthlyAmount =
          typeof data.monthlyAmount === 'string'
            ? Number(data.monthlyAmount)
            : data.monthlyAmount;
      }

      if (data.biweeklyAmount !== undefined) {
        submitData.biweeklyAmount =
          typeof data.biweeklyAmount === 'string'
            ? Number(data.biweeklyAmount)
            : data.biweeklyAmount;
      }

      if (data.pendingAmount !== undefined) {
        submitData.pendingAmount =
          typeof data.pendingAmount === 'string'
            ? Number(data.pendingAmount)
            : data.pendingAmount;
      }

      if (data.startDate) {
        submitData.startDate = data.startDate;
      }

      if (data.endDate) {
        submitData.endDate = data.endDate;
      }

      // Incluir isActive solo si está definido
      if (isActiveField.value !== undefined && typeof isActiveField.value === 'boolean') {
        submitData.isActive = isActiveField.value;
      }

      await onSubmit(submitData);
    } else {
      // Modo creación: CreateBudgetDto
      const submitData: CreateBudgetDto = {
        expenseTypeId:
          typeof data.expenseTypeId === 'string'
            ? Number(data.expenseTypeId)
            : data.expenseTypeId!,
        monthlyAmount:
          typeof data.monthlyAmount === 'string'
            ? Number(data.monthlyAmount)
            : data.monthlyAmount!,
        startDate: data.startDate!,
        endDate: data.endDate!,
      };

      // Calcular biweeklyAmount si no se proporciona
      if (data.biweeklyAmount !== undefined) {
        submitData.biweeklyAmount =
          typeof data.biweeklyAmount === 'string'
            ? Number(data.biweeklyAmount)
            : data.biweeklyAmount;
      } else {
        submitData.biweeklyAmount = submitData.monthlyAmount / 2;
      }

      // Incluir pendingAmount solo si está definido y es mayor a 0
      if (data.pendingAmount !== undefined && data.pendingAmount !== 0) {
        submitData.pendingAmount =
          typeof data.pendingAmount === 'string'
            ? Number(data.pendingAmount)
            : data.pendingAmount;
      }

      await onSubmit(submitData);
    }
  };

  const expenseTypeOptions = expenseTypes.map((et) => ({
    value: String(et.id),
    label: et.name,
  }));

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
      {!isEditMode && (
        <FormSelect<BudgetFormData>
          name="expenseTypeId"
          control={control}
          label="Tipo de Gasto"
          placeholder={
            loadingExpenseTypes
              ? 'Cargando tipos de gasto...'
              : 'Selecciona el tipo de gasto'
          }
          options={expenseTypeOptions}
          isRequired
          isDisabled={loadingExpenseTypes}
          errorMessage={errors.expenseTypeId?.message}
          description="Solo se muestran tipos de gasto fijos (FIXED)"
        />
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormInput<BudgetFormData>
          name="monthlyAmount"
          control={control}
          label="Monto Mensual"
          placeholder="0.00"
          type="number"
          step="0.01"
          isRequired={!isEditMode}
          errorMessage={errors.monthlyAmount?.message}
          description="Monto total del presupuesto mensual"
        />

        <FormInput<BudgetFormData>
          name="biweeklyAmount"
          control={control}
          label="Monto Quincenal"
          placeholder="0.00"
          type="number"
          step="0.01"
          errorMessage={errors.biweeklyAmount?.message}
          description={
            !isEditMode && monthlyAmount
              ? `Se calculará automáticamente como ${(Number(monthlyAmount) / 2).toFixed(2)} si no se especifica`
              : 'Monto quincenal (opcional, se calcula como monthlyAmount / 2)'
          }
        />
      </div>

      {isEditMode && (
        <FormInput<BudgetFormData>
          name="pendingAmount"
          control={control}
          label="Saldo Pendiente"
          placeholder="0.00"
          type="number"
          step="0.01"
          errorMessage={errors.pendingAmount?.message}
          description="Saldo pendiente del período anterior"
        />
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormDatePicker<BudgetFormData>
          name="startDate"
          control={control}
          label="Fecha de Inicio"
          isRequired={!isEditMode}
          errorMessage={errors.startDate?.message}
        />

        <FormDatePicker<BudgetFormData>
          name="endDate"
          control={control}
          label="Fecha de Fin"
          isRequired={!isEditMode}
          errorMessage={errors.endDate?.message}
        />
      </div>

      {isEditMode && (
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="isActive"
            checked={typeof isActiveField.value === 'boolean' ? isActiveField.value : false}
            onChange={(e) => isActiveField.onChange(e.target.checked)}
            onBlur={isActiveField.onBlur}
            className="w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500"
          />
          <label
            htmlFor="isActive"
            className="text-sm text-gray-300 dark:text-gray-300"
          >
            Presupuesto activo
          </label>
        </div>
      )}

      <div className="flex gap-2 justify-end pt-4">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            disabled={isLoading}
            className="px-4 py-2 text-sm bg-gray-600 hover:bg-gray-700 text-white rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Cancelar
          </button>
        )}
        <SubmitButton isLoading={isLoading} type="submit">
          {isEditMode ? 'Actualizar' : 'Crear'} Presupuesto
        </SubmitButton>
      </div>
    </form>
  );
}

export default BudgetForm;

