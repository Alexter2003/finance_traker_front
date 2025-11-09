import { Spinner } from '@heroui/react';

interface LoadingSpinnerProps {
    size?: 'sm' | 'md' | 'lg';
    color?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
    label?: string;
    className?: string;
}

function LoadingSpinner({
    size = 'md',
    color = 'primary',
    label,
    className = '',
}: LoadingSpinnerProps) {
    return (
        <div className={`flex flex-col items-center justify-center gap-2 ${className}`}>
            <Spinner size={size} color={color} />
            {label && <p className="text-sm text-gray-300 dark:text-gray-300">{label}</p>}
        </div>
    );
}

export default LoadingSpinner;

