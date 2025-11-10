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
  createTransactionSchema,
  updateTransactionSchema,
} from '../transactions.domain/transactions.schema';
import type {
  CreateTransactionDto,
  UpdateTransactionDto,
} from '../transactions.domain/transactions.types';
import type { TransactionWithRelations } from '../transactions.domain/transactions.types';
import { accountsService } from '../../accounts/accounts.data/accounts.service';
import type { Account } from '../../../shared/types/common.types';
import * as yup from 'yup';

interface TransactionFormProps {
  transaction?: TransactionWithRelations | null;
  onSubmit: (data: CreateTransactionDto | UpdateTransactionDto) => Promise<void>;
  onCancel?: () => void;
  isLoading?: boolean;
}

type FormData = yup.InferType<typeof createTransactionSchema> | yup.InferType<typeof updateTransactionSchema>;

function TransactionForm({
  transaction,
  onSubmit,
  onCancel,
  isLoading = false,
}: TransactionFormProps) {
  const isEditMode = !!transaction;
  const schema = isEditMode ? updateTransactionSchema : createTransactionSchema;

  const [accounts, setAccounts] = useState<Account[]>([]);
  const [loadingAccounts, setLoadingAccounts] = useState(true);

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: transaction
      ? {
          fromAccountId: Number(transaction.fromAccountId),
          toAccountId: Number(transaction.toAccountId),
          amount: transaction.amount,
          description: transaction.description || '',
          date: transaction.date,
        }
      : {
          fromAccountId: undefined,
          toAccountId: undefined,
          amount: 0,
          description: '',
          date: new Date().toISOString(),
        },
    mode: 'onChange',
  });

  const fromAccountId = watch('fromAccountId');
  const toAccountId = watch('toAccountId');

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
    const submitData: CreateTransactionDto | UpdateTransactionDto = {
      ...data,
      fromAccountId:
        data.fromAccountId !== undefined
          ? typeof data.fromAccountId === 'string'
            ? Number(data.fromAccountId)
            : data.fromAccountId
          : undefined,
      toAccountId:
        data.toAccountId !== undefined
          ? typeof data.toAccountId === 'string'
            ? Number(data.toAccountId)
            : data.toAccountId
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

  // Filtrar opciones para evitar que se seleccione la misma cuenta en origen y destino
  const fromAccountOptions = accountOptions.filter(
    (option) => !toAccountId || option.value !== String(toAccountId)
  );

  const toAccountOptions = accountOptions.filter(
    (option) => !fromAccountId || option.value !== String(fromAccountId)
  );

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
      <FormSelect<FormData>
        name="fromAccountId"
        control={control}
        label="Cuenta de origen"
        placeholder={
          loadingAccounts ? 'Cargando cuentas...' : 'Selecciona la cuenta de origen'
        }
        options={fromAccountOptions}
        isRequired={!isEditMode}
        isDisabled={loadingAccounts || isLoading}
        errorMessage={errors.fromAccountId?.message}
        description="Cuenta desde la cual se transferirá el dinero"
      />

      <FormSelect<FormData>
        name="toAccountId"
        control={control}
        label="Cuenta de destino"
        placeholder={
          loadingAccounts ? 'Cargando cuentas...' : 'Selecciona la cuenta de destino'
        }
        options={toAccountOptions}
        isRequired={!isEditMode}
        isDisabled={loadingAccounts || isLoading}
        errorMessage={errors.toAccountId?.message}
        description="Cuenta hacia la cual se transferirá el dinero"
      />

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
        description="Monto a transferir en quetzales"
      />

      <FormTextarea<FormData>
        name="description"
        control={control}
        label="Descripción"
        placeholder="Descripción opcional de la transacción..."
        minRows={3}
        errorMessage={errors.description?.message}
      />

      <FormDatePicker<FormData>
        name="date"
        control={control}
        label="Fecha de la transacción"
        isRequired={!isEditMode}
        isDisabled={isLoading}
        errorMessage={errors.date?.message}
        description="Fecha en que se realizó la transacción"
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
          {isEditMode ? 'Actualizar' : 'Crear'} Transacción
        </SubmitButton>
      </div>
    </form>
  );
}

export default TransactionForm;

