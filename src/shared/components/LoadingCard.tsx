import { Card, CardBody, Skeleton } from '@heroui/react';

interface LoadingCardProps {
  lines?: number;
  className?: string;
}

function LoadingCard({ lines = 3, className = '' }: LoadingCardProps) {
  return (
    <Card className={className}>
      <CardBody className="gap-2">
        <Skeleton className="rounded-lg">
          <div className="h-4 w-3/4 rounded-lg bg-default-200"></div>
        </Skeleton>
        {Array.from({ length: lines }).map((_, index) => (
          <Skeleton key={index} className="rounded-lg">
            <div className="h-3 w-full rounded-lg bg-default-200"></div>
          </Skeleton>
        ))}
      </CardBody>
    </Card>
  );
}

export default LoadingCard;

