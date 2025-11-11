import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormInput, FormSelect, SubmitButton } from '../../../shared/components';
import { getAccountTypeOptions } from '../accounts.domain/accounts.utils';
import {
  createAccountSchema,
  updateAccountSchema,
} from '../accounts.domain/accounts.schema';
import type { CreateAccountDto, UpdateAccountDto } from '../accounts.domain/accounts.types';
import type { Account, AccountType } from '../../../shared/types/common.types';
import type { Resolver } from 'react-hook-form';

interface AccountFormProps {
  account?: Account | null;
  onSubmit: (data: CreateAccountDto | UpdateAccountDto) => Promise<void>;
  onCancel?: () => void;
  isLoading?: boolean;
}

type AccountFormData = {
  name?: string;
  type?: AccountType | string;
  initialBalance?: number;
};

function AccountForm({ account, onSubmit, onCancel, isLoading = false }: AccountFormProps) {
  const isEditMode = !!account;
  const schema = isEditMode ? updateAccountSchema : createAccountSchema;

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<AccountFormData>({
    resolver: yupResolver(schema) as Resolver<AccountFormData>,
    defaultValues: account
      ? {
          name: account.name,
          type: account.type,
          initialBalance: account.initialBalance,
        }
      : {
          name: '',
          type: undefined,
          initialBalance: 0,
        },
    mode: 'onChange',
  });

  const handleFormSubmit = async (data: AccountFormData) => {
    // Convertir initialBalance a número si existe y type a AccountType
    const submitData: CreateAccountDto | UpdateAccountDto = {
      ...(data.name !== undefined && { name: data.name }),
      ...(data.type !== undefined && { type: data.type as AccountType }),
      ...(data.initialBalance !== undefined && {
        initialBalance:
          typeof data.initialBalance === 'string'
            ? Number(data.initialBalance)
            : data.initialBalance,
      }),
    };
    await onSubmit(submitData);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
      <FormInput<AccountFormData>
        name="name"
        control={control}
        label="Nombre de la cuenta"
        placeholder="Ej: Cuenta Principal"
        isRequired={!isEditMode}
        errorMessage={errors.name?.message}
      />

      <FormSelect<AccountFormData>
        name="type"
        control={control}
        label="Tipo de cuenta"
        placeholder="Selecciona el tipo de cuenta"
        options={getAccountTypeOptions()}
        isRequired={!isEditMode}
        errorMessage={errors.type?.message}
      />

      <FormInput<AccountFormData>
        name="initialBalance"
        control={control}
        label="Balance inicial"
        placeholder="0.00"
        type="number"
        isRequired={!isEditMode}
        errorMessage={errors.initialBalance?.message}
        description="Balance inicial de la cuenta en quetzales"
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
          {isEditMode ? 'Actualizar' : 'Crear'} Cuenta
        </SubmitButton>
      </div>
    </form>
  );
}

export default AccountForm;

