import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  FormInput,
  FormSelect,
  FormTextarea,
  SubmitButton,
} from '../../../shared/components';
import { getExpenseCategoryTypeOptions } from '../expense-types.domain/expense-types.utils';
import {
  createExpenseTypeSchema,
  updateExpenseTypeSchema,
} from '../expense-types.domain/expense-types.schema';
import type {
  CreateExpenseTypeDto,
  UpdateExpenseTypeDto,
} from '../expense-types.domain/expense-types.types';
import type { ExpenseType, ExpenseCategoryType } from '../../../shared/types/common.types';
import type { Resolver } from 'react-hook-form';

interface ExpenseTypeFormProps {
  expenseType?: ExpenseType | null;
  onSubmit: (data: CreateExpenseTypeDto | UpdateExpenseTypeDto) => Promise<void>;
  onCancel?: () => void;
  isLoading?: boolean;
}

type ExpenseTypeFormData = {
  name?: string;
  type?: ExpenseCategoryType | string;
  description?: string;
};

function ExpenseTypeForm({
  expenseType,
  onSubmit,
  onCancel,
  isLoading = false,
}: ExpenseTypeFormProps) {
  const isEditMode = !!expenseType;
  const schema = isEditMode ? updateExpenseTypeSchema : createExpenseTypeSchema;

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ExpenseTypeFormData>({
    resolver: yupResolver(schema) as Resolver<ExpenseTypeFormData>,
    defaultValues: expenseType
      ? {
          name: expenseType.name,
          type: expenseType.type,
          description: expenseType.description || '',
        }
      : {
          name: '',
          type: undefined,
          description: '',
        },
    mode: 'onChange',
  });

  const handleFormSubmit = async (data: ExpenseTypeFormData) => {
    const submitData: CreateExpenseTypeDto | UpdateExpenseTypeDto = {
      ...(data.name !== undefined && { name: data.name }),
      ...(data.type !== undefined && { type: data.type as ExpenseCategoryType }),
      ...(data.description !== undefined && { description: data.description }),
    };
    await onSubmit(submitData);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
      <FormInput<ExpenseTypeFormData>
        name="name"
        control={control}
        label="Nombre del tipo de gasto"
        placeholder="Ej: Alimentación"
        isRequired={!isEditMode}
        errorMessage={errors.name?.message}
      />

      <FormSelect<ExpenseTypeFormData>
        name="type"
        control={control}
        label="Tipo de categoría"
        placeholder="Selecciona el tipo de categoría"
        options={getExpenseCategoryTypeOptions()}
        isRequired={!isEditMode}
        errorMessage={errors.type?.message}
        description="Fijo: Gastos recurrentes con presupuesto. Variable: Gastos ocasionales sin presupuesto fijo."
      />

      <FormTextarea<ExpenseTypeFormData>
        name="description"
        control={control}
        label="Descripción"
        placeholder="Descripción opcional del tipo de gasto..."
        minRows={3}
        errorMessage={errors.description?.message}
      />

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
          {isEditMode ? 'Actualizar' : 'Crear'} Tipo de Gasto
        </SubmitButton>
      </div>
    </form>
  );
}

export default ExpenseTypeForm;

