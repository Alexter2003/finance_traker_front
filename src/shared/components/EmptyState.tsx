import type { ReactNode } from 'react';
import { Button } from '@heroui/react';

interface EmptyStateProps {
  title: string;
  description?: string;
  icon?: ReactNode;
  action?: {
    label: string;
    onClick: () => void;
  };
  className?: string;
}

function EmptyState({ title, description, icon, action, className = '' }: EmptyStateProps) {
  return (
    <div className={`flex flex-col items-center justify-center py-12 px-4 ${className}`}>
      {icon && <div className="mb-4 text-gray-400">{icon}</div>}
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{title}</h3>
      {description && (
        <p className="text-sm text-gray-600 dark:text-gray-400 text-center mb-6 max-w-md">
          {description}
        </p>
      )}
      {action && (
        <Button color="primary" onPress={action.onClick}>
          {action.label}
        </Button>
      )}
    </div>
  );
}

export default EmptyState;

