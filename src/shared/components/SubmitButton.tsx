import { Button } from '@heroui/react';
import type { ReactNode } from 'react';

interface SubmitButtonProps {
    children: ReactNode;
    isLoading?: boolean;
    isDisabled?: boolean;
    color?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
    size?: 'sm' | 'md' | 'lg';
    type?: 'button' | 'submit' | 'reset';
    className?: string;
    fullWidth?: boolean;
}

function SubmitButton({
    children,
    isLoading = false,
    isDisabled = false,
    color = 'primary',
    size = 'md',
    type = 'submit',
    className = '',
    fullWidth = false,
}: SubmitButtonProps) {
    return (
        <Button
            type={type}
            color={color}
            size={size}
            isLoading={isLoading}
            isDisabled={isDisabled || isLoading}
            className={className}
            fullWidth={fullWidth}
        >
            {children}
        </Button>
    );
}

export default SubmitButton;

