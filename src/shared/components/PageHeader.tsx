import type { ReactNode } from 'react';

interface PageHeaderProps {
    title: string;
    description?: string;
    actions?: ReactNode;
    className?: string;
}

function PageHeader({ title, description, actions, className = '' }: PageHeaderProps) {
    return (
        <div className={`flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 ${className}`}>
            <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{title}</h1>
                {description && (
                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">{description}</p>
                )}
            </div>
            {actions && <div className="flex gap-2">{actions}</div>}
        </div>
    );
}

export default PageHeader;

