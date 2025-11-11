import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  FormInput,
  FormSelect,
  FormTextarea,
  FormDatePicker,
  SubmitButton,
} from '../../../shared/components';
import {
  createExpenseSchema,
  updateExpenseSchema,
} from '../expenses.domain/expenses.schema';
import type {
  CreateExpenseDto,
  UpdateExpenseDto,
} from '../expenses.domain/expenses.types';
import type { ExpenseWithRelations } from '../expenses.domain/expenses.types';
import { accountsService } from '../../accounts/accounts.data/accounts.service';
import { expenseTypesService } from '../../expense-types/expense-types.data/expense-types.service';
import type { Account } from '../../../shared/types/common.types';
import type { ExpenseType } from '../../../shared/types/common.types';
import type { Resolver } from 'react-hook-form';

interface ExpenseFormProps {
  expense?: ExpenseWithRelations | null;
  onSubmit: (data: CreateExpenseDto | UpdateExpenseDto) => Promise<void>;
  onCancel?: () => void;
  isLoading?: boolean;
}

type ExpenseFormData = {
  amount?: number;
  accountId?: number;
  expenseTypeId?: number;
  description?: string;
  date?: string;
};

function ExpenseForm({
  expense,
  onSubmit,
  onCancel,
  isLoading = false,
}: ExpenseFormProps) {
  const isEditMode = !!expense;
  const schema = isEditMode ? updateExpenseSchema : createExpenseSchema;

  const [accounts, setAccounts] = useState<Account[]>([]);
  const [expenseTypes, setExpenseTypes] = useState<ExpenseType[]>([]);
  const [loadingAccounts, setLoadingAccounts] = useState(true);
  const [loadingExpenseTypes, setLoadingExpenseTypes] = useState(true);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ExpenseFormData>({
    resolver: yupResolver(schema) as Resolver<ExpenseFormData>,
    defaultValues: expense
      ? {
          amount: expense.amount,
          accountId: Number(expense.accountId),
          expenseTypeId: Number(expense.expenseTypeId),
          description: expense.description || '',
          date: expense.date,
        }
      : {
          amount: 0,
          accountId: undefined,
          expenseTypeId: undefined,
          description: '',
          date: new Date().toISOString(),
        },
    mode: 'onChange',
  });

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        setLoadingAccounts(true);
        const response = await accountsService.getAll({ limit: 100 });
        setAccounts(response.data);
      } catch (error) {
        console.error('Error al cargar las cuentas:', error);
      } finally {
        setLoadingAccounts(false);
      }
    };

    const fetchExpenseTypes = async () => {
      try {
        setLoadingExpenseTypes(true);
        const response = await expenseTypesService.getAll({ limit: 100 });
        setExpenseTypes(response.data);
      } catch (error) {
        console.error('Error al cargar los tipos de gasto:', error);
      } finally {
        setLoadingExpenseTypes(false);
      }
    };

    fetchAccounts();
    fetchExpenseTypes();
  }, []);

  const handleFormSubmit = async (data: ExpenseFormData) => {
    const submitData: CreateExpenseDto | UpdateExpenseDto = {
      ...data,
      accountId:
        data.accountId !== undefined
          ? typeof data.accountId === 'string'
            ? Number(data.accountId)
            : data.accountId
          : undefined,
      expenseTypeId:
        data.expenseTypeId !== undefined
          ? typeof data.expenseTypeId === 'string'
            ? Number(data.expenseTypeId)
            : data.expenseTypeId
          : undefined,
      amount:
        data.amount !== undefined
          ? typeof data.amount === 'string'
            ? Number(data.amount)
            : data.amount
          : undefined,
    };
    await onSubmit(submitData);
  };

  const accountOptions = accounts.map((account) => ({
    value: String(account.id),
    label: `${account.name} (${account.type})`,
  }));

  const expenseTypeOptions = expenseTypes.map((expenseType) => ({
    value: String(expenseType.id),
    label: `${expenseType.name} (${expenseType.type})`,
  }));

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
      <FormInput<ExpenseFormData>
        name="amount"
        control={control}
        label="Monto"
        placeholder="0.00"
        type="number"
        step="0.01"
        isRequired={!isEditMode}
        isDisabled={isLoading}
        errorMessage={errors.amount?.message}
        description="Monto del gasto en quetzales"
      />

      <FormSelect<ExpenseFormData>
        name="accountId"
        control={control}
        label="Cuenta"
        placeholder={
          loadingAccounts ? 'Cargando cuentas...' : 'Selecciona una cuenta'
        }
        options={accountOptions}
        isRequired={!isEditMode}
        isDisabled={loadingAccounts || isLoading}
        errorMessage={errors.accountId?.message}
        description="Cuenta desde la cual se realizará el gasto"
      />

      <FormSelect<ExpenseFormData>
        name="expenseTypeId"
        control={control}
        label="Tipo de gasto"
        placeholder={
          loadingExpenseTypes
            ? 'Cargando tipos de gasto...'
            : 'Selecciona un tipo de gasto'
        }
        options={expenseTypeOptions}
        isRequired={!isEditMode}
        isDisabled={loadingExpenseTypes || isLoading}
        errorMessage={errors.expenseTypeId?.message}
        description="Categoría del gasto"
      />

      <FormTextarea<ExpenseFormData>
        name="description"
        control={control}
        label="Descripción"
        placeholder="Descripción opcional del gasto..."
        minRows={3}
        errorMessage={errors.description?.message}
      />

      <FormDatePicker<ExpenseFormData>
        name="date"
        control={control}
        label="Fecha del gasto"
        isRequired={!isEditMode}
        isDisabled={isLoading}
        errorMessage={errors.date?.message}
        description="Fecha en que se realizó el gasto"
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
          {isEditMode ? 'Actualizar' : 'Crear'} Gasto
        </SubmitButton>
      </div>
    </form>
  );
}

export default ExpenseForm;

