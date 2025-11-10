import { Input } from '@heroui/react';
import { useController } from 'react-hook-form';
import type { Control, FieldPath, FieldValues } from 'react-hook-form';

interface FormInputProps<T extends FieldValues> {
    name: FieldPath<T>;
    control: Control<T>;
    label?: string;
    placeholder?: string;
    type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url';
    step?: string;
    isRequired?: boolean;
    isDisabled?: boolean;
    errorMessage?: string;
    description?: string;
    className?: string;
}

function FormInput<T extends FieldValues>({
    name,
    control,
    label,
    placeholder,
    type = 'text',
    step,
    isRequired = false,
    isDisabled = false,
    errorMessage,
    description,
    className = '',
}: FormInputProps<T>) {
    const {
        field,
        fieldState: { error },
    } = useController({
        name,
        control,
    });

    return (
        <Input
            {...field}
            label={label}
            placeholder={placeholder}
            type={type}
            step={step}
            isRequired={isRequired}
            isDisabled={isDisabled}
            isInvalid={!!error || !!errorMessage}
            errorMessage={error?.message || errorMessage}
            description={description}
            className={className}
        />
    );
}

export default FormInput;

