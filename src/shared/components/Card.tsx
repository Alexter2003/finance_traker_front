import { Card as HeroUICard, CardBody, CardHeader } from '@heroui/react';
import type { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  title?: string;
  headerActions?: ReactNode;
  className?: string;
  shadow?: 'sm' | 'md' | 'lg' | 'none';
}

function Card({ children, title, headerActions, className = '', shadow = 'md' }: CardProps) {
  return (
    <HeroUICard className={`bg-gray-800 dark:bg-gray-800 border-gray-700 dark:border-gray-700 ${className}`} shadow={shadow}>
      {(title || headerActions) && (
        <CardHeader className="flex items-center justify-between border-b border-gray-700 dark:border-gray-700">
          {title && <h3 className="text-lg font-semibold text-white dark:text-white">{title}</h3>}
          {headerActions && <div>{headerActions}</div>}
        </CardHeader>
      )}
      <CardBody className="text-gray-100 dark:text-gray-100">{children}</CardBody>
    </HeroUICard>
  );
}

export default Card;

