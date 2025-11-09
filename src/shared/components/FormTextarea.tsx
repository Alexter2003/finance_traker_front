import { Textarea } from '@heroui/react';
import { useController } from 'react-hook-form';
import type { Control, FieldPath, FieldValues } from 'react-hook-form';

interface FormTextareaProps<T extends FieldValues> {
    name: FieldPath<T>;
    control: Control<T>;
    label?: string;
    placeholder?: string;
    isRequired?: boolean;
    isDisabled?: boolean;
    errorMessage?: string;
    description?: string;
    minRows?: number;
    maxRows?: number;
    className?: string;
}

function FormTextarea<T extends FieldValues>({
    name,
    control,
    label,
    placeholder,
    isRequired = false,
    isDisabled = false,
    errorMessage,
    description,
    minRows = 3,
    maxRows = 8,
    className = '',
}: FormTextareaProps<T>) {
    const {
        field,
        fieldState: { error },
    } = useController({
        name,
        control,
    });

    return (
        <Textarea
            {...field}
            label={label}
            placeholder={placeholder}
            isRequired={isRequired}
            isDisabled={isDisabled}
            isInvalid={!!error || !!errorMessage}
            errorMessage={error?.message || errorMessage}
            description={description}
            minRows={minRows}
            maxRows={maxRows}
            className={className}
        />
    );
}

export default FormTextarea;

