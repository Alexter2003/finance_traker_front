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
  createIncomeSchema,
  updateIncomeSchema,
} from '../incomes.domain/incomes.schema';
import type {
  CreateIncomeDto,
  UpdateIncomeDto,
} from '../incomes.domain/incomes.types';
import type { IncomeWithRelations } from '../incomes.domain/incomes.types';
import { accountsService } from '../../accounts/accounts.data/accounts.service';
import { getIncomeFrequencyOptions } from '../incomes.domain/incomes.utils';
import type { Account } from '../../../shared/types/common.types';

interface IncomeFormProps {
  income?: IncomeWithRelations | null;
  onSubmit: (data: CreateIncomeDto | UpdateIncomeDto) => Promise<void>;
  onCancel?: () => void;
  isLoading?: boolean;
}

type FormData = CreateIncomeDto | UpdateIncomeDto;

function IncomeForm({
  income,
  onSubmit,
  onCancel,
  isLoading = false,
}: IncomeFormProps) {
  const isEditMode = !!income;
  const schema = isEditMode ? updateIncomeSchema : createIncomeSchema;

  const [accounts, setAccounts] = useState<Account[]>([]);
  const [loadingAccounts, setLoadingAccounts] = useState(true);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: income
      ? {
          amount: income.amount,
          accountId: Number(income.accountId),
          frequency: income.frequency,
          description: income.description || '',
          date: income.date,
        }
      : {
          amount: 0,
          accountId: undefined,
          frequency: undefined,
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

    fetchAccounts();
  }, []);

  const handleFormSubmit = async (data: FormData) => {
    const submitData: CreateIncomeDto | UpdateIncomeDto = {
      ...data,
      accountId:
        data.accountId !== undefined
          ? typeof data.accountId === 'string'
            ? Number(data.accountId)
            : data.accountId
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

  const frequencyOptions = getIncomeFrequencyOptions();

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
      <FormInput<FormData>
        name="amount"
        control={control}
        label="Monto"
        placeholder="0.00"
        type="number"
        step="0.01"
        isRequired={!isEditMode}
        isDisabled={isLoading}
        errorMessage={errors.amount?.message}
        description="Monto del ingreso en quetzales"
      />

      <FormSelect<FormData>
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
        description="Cuenta a la cual se registrará el ingreso"
      />

      <FormSelect<FormData>
        name="frequency"
        control={control}
        label="Frecuencia"
        placeholder="Selecciona la frecuencia"
        options={frequencyOptions}
        isRequired={!isEditMode}
        isDisabled={isLoading}
        errorMessage={errors.frequency?.message}
        description="Frecuencia del ingreso"
      />

      <FormTextarea<FormData>
        name="description"
        control={control}
        label="Descripción"
        placeholder="Descripción opcional del ingreso..."
        minRows={3}
        errorMessage={errors.description?.message}
      />

      <FormDatePicker<FormData>
        name="date"
        control={control}
        label="Fecha del ingreso"
        isRequired={!isEditMode}
        isDisabled={isLoading}
        errorMessage={errors.date?.message}
        description="Fecha en que se recibió el ingreso"
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
          {isEditMode ? 'Actualizar' : 'Crear'} Ingreso
        </SubmitButton>
      </div>
    </form>
  );
}

export default IncomeForm;

