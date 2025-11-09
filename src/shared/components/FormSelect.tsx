import { Select, SelectItem } from '@heroui/react';
import { useController } from 'react-hook-form';
import type { Control, FieldPath, FieldValues } from 'react-hook-form';

interface SelectOption {
    value: string | number;
    label: string;
}

interface FormSelectProps<T extends FieldValues> {
    name: FieldPath<T>;
    control: Control<T>;
    label?: string;
    placeholder?: string;
    options: SelectOption[];
    isRequired?: boolean;
    isDisabled?: boolean;
    errorMessage?: string;
    description?: string;
    className?: string;
}

function FormSelect<T extends FieldValues>({
    name,
    control,
    label,
    placeholder = 'Selecciona una opción',
    options,
    isRequired = false,
    isDisabled = false,
    errorMessage,
    description,
    className = '',
}: FormSelectProps<T>) {
    const {
        field,
        fieldState: { error },
    } = useController({
        name,
        control,
    });

    return (
        <Select
            {...field}
            label={label}
            placeholder={placeholder}
            isRequired={isRequired}
            isDisabled={isDisabled}
            isInvalid={!!error || !!errorMessage}
            errorMessage={error?.message || errorMessage}
            description={description}
            className={className}
            selectedKeys={field.value ? [String(field.value)] : []}
            onSelectionChange={(keys) => {
                const selectedValue = Array.from(keys)[0];
                field.onChange(selectedValue || '');
            }}
        >
            {options.map((option) => (
                <SelectItem key={String(option.value)}>
                    {option.label}
                </SelectItem>
            ))}
        </Select>
    );
}

export default FormSelect;

