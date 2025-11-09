import { useForm } from 'react-hook-form';
import type { UseFormReturn, FieldValues } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import type { ObjectSchema } from 'yup';

function useFormValidation<T extends FieldValues>(schema: ObjectSchema<T>): UseFormReturn<T> {
    const form = useForm<T>({
        resolver: yupResolver(schema) as never,
        mode: 'onChange',
    });

    return form as UseFormReturn<T>;
}

export default useFormValidation;

