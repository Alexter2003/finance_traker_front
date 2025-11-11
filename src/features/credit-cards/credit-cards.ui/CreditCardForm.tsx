import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormInput, SubmitButton } from '../../../shared/components';
import {
  createCreditCardSchema,
  updateCreditCardSchema,
} from '../credit-cards.domain/credit-cards.schema';
import type { CreateCreditCardDto, UpdateCreditCardDto } from '../credit-cards.domain/credit-cards.types';
import type { CreditCard } from '../../../shared/types/common.types';
import type { Resolver } from 'react-hook-form';

interface CreditCardFormProps {
  creditCard?: CreditCard | null;
  onSubmit: (data: CreateCreditCardDto | UpdateCreditCardDto) => Promise<void>;
  onCancel?: () => void;
  isLoading?: boolean;
}

type CreditCardFormData = {
  name?: string;
  initialBalance?: number;
};

function CreditCardForm({ creditCard, onSubmit, onCancel, isLoading = false }: CreditCardFormProps) {
  const isEditMode = !!creditCard;
  const schema = isEditMode ? updateCreditCardSchema : createCreditCardSchema;

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CreditCardFormData>({
    resolver: yupResolver(schema) as Resolver<CreditCardFormData>,
    defaultValues: creditCard
      ? {
          name: creditCard.name,
          initialBalance: creditCard.initialBalance,
        }
      : {
          name: '',
          initialBalance: 0,
        },
    mode: 'onChange',
  });

  const handleFormSubmit = async (data: CreditCardFormData) => {
    // Convertir initialBalance a número si existe
    const submitData: CreateCreditCardDto | UpdateCreditCardDto = {
      ...(data.name !== undefined && { name: data.name }),
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
      <FormInput<CreditCardFormData>
        name="name"
        control={control}
        label="Nombre de la tarjeta"
        placeholder="Ej: Visa Principal"
        isRequired={!isEditMode}
        errorMessage={errors.name?.message}
      />

      <FormInput<CreditCardFormData>
        name="initialBalance"
        control={control}
        label="Balance inicial"
        placeholder="0.00"
        type="number"
        isRequired={!isEditMode}
        errorMessage={errors.initialBalance?.message}
        description="Balance inicial de la tarjeta (generalmente 0 o el límite de crédito)"
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
          {isEditMode ? 'Actualizar' : 'Crear'} Tarjeta
        </SubmitButton>
      </div>
    </form>
  );
}

export default CreditCardForm;

