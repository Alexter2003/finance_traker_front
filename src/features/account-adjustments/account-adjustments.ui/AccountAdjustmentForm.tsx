import { useEffect, useState } from 'react';
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
  createAccountAdjustmentSchema,
  updateAccountAdjustmentSchema,
} from '../account-adjustments.domain/account-adjustments.schema';
import type {
  CreateAccountAdjustmentDto,
  UpdateAccountAdjustmentDto,
} from '../account-adjustments.domain/account-adjustments.types';
import type { AccountAdjustment } from '../account-adjustments.domain/account-adjustments.types';
import { accountsService } from '../../accounts/accounts.data/accounts.service';
import type { Account } from '../../../shared/types/common.types';

interface AccountAdjustmentFormProps {
  adjustment?: AccountAdjustment | null;
  onSubmit: (
    data: CreateAccountAdjustmentDto | UpdateAccountAdjustmentDto
  ) => Promise<void>;
  onCancel?: () => void;
  isLoading?: boolean;
}

type FormData = CreateAccountAdjustmentDto | UpdateAccountAdjustmentDto;

function AccountAdjustmentForm({
  adjustment,
  onSubmit,
  onCancel,
  isLoading = false,
}: AccountAdjustmentFormProps) {
  const isEditMode = !!adjustment;
  const schema = isEditMode
    ? updateAccountAdjustmentSchema
    : createAccountAdjustmentSchema;

  const [accounts, setAccounts] = useState<Account[]>([]);
  const [loadingAccounts, setLoadingAccounts] = useState(true);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: adjustment
      ? {
          accountId: adjustment.accountId,
          amount: adjustment.amount,
          reason: adjustment.reason,
          date: adjustment.date,
        }
      : {
          accountId: undefined,
          amount: 0,
          reason: '',
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
    const submitData: CreateAccountAdjustmentDto | UpdateAccountAdjustmentDto =
      {
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

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
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
        description="Selecciona la cuenta a la que se aplicará el ajuste"
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
        description="Monto del ajuste (positivo para aumentar, negativo para disminuir)"
      />

      <FormTextarea<FormData>
        name="reason"
        control={control}
        label="Razón del ajuste"
        placeholder="Ej: Corrección de diferencia por error de registro"
        isRequired={!isEditMode}
        isDisabled={isLoading}
        errorMessage={errors.reason?.message}
        description="Describe la razón del ajuste (máximo 500 caracteres)"
        minRows={3}
        maxRows={6}
      />

      <FormDatePicker<FormData>
        name="date"
        control={control}
        label="Fecha del ajuste"
        isRequired={!isEditMode}
        isDisabled={isLoading}
        errorMessage={errors.date?.message}
        description="Fecha en que se realizó el ajuste"
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
          {isEditMode ? 'Actualizar' : 'Crear'} Ajuste
        </SubmitButton>
      </div>
    </form>
  );
}

export default AccountAdjustmentForm;

