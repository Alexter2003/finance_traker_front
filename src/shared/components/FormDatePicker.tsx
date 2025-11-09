import { Input } from '@heroui/react';
import { useController } from 'react-hook-form';
import type { Control, FieldPath, FieldValues } from 'react-hook-form';

interface FormDatePickerProps<T extends FieldValues> {
    name: FieldPath<T>;
    control: Control<T>;
    label?: string;
    placeholder?: string;
    isRequired?: boolean;
    isDisabled?: boolean;
    errorMessage?: string;
    description?: string;
    className?: string;
}

function FormDatePicker<T extends FieldValues>({
    name,
    control,
    label,
    placeholder = 'Selecciona una fecha',
    isRequired = false,
    isDisabled = false,
    errorMessage,
    description,
    className = '',
}: FormDatePickerProps<T>) {
    const {
        field,
        fieldState: { error },
    } = useController({
        name,
        control,
    });

    // Convertir el valor a formato YYYY-MM-DD para el input type="date"
    const formatDateForInput = (value: string | Date | undefined): string => {
        if (!value) return '';
        const date = typeof value === 'string' ? new Date(value) : value;
        return date.toISOString().split('T')[0];
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        // Convertir de YYYY-MM-DD a Date object o string ISO
        if (value) {
            field.onChange(new Date(value).toISOString());
        } else {
            field.onChange('');
        }
    };

    return (
        <Input
            type="date"
            label={label}
            placeholder={placeholder}
            value={formatDateForInput(field.value)}
            onChange={handleChange}
            onBlur={field.onBlur}
            isRequired={isRequired}
            isDisabled={isDisabled}
            isInvalid={!!error || !!errorMessage}
            errorMessage={error?.message || errorMessage}
            description={description}
            className={className}
        />
    );
}

export default FormDatePicker;

