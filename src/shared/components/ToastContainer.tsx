import { useEffect } from 'react';
import Toast from './Toast';
import type { Toast as ToastType } from './Toast';

interface ToastContainerProps {
    toasts: ToastType[];
    onRemove: (id: string) => void;
}

function ToastContainer({ toasts, onRemove }: ToastContainerProps) {
    useEffect(() => {
        toasts.forEach((toast) => {
            if (toast.duration && toast.duration > 0) {
                const timer = setTimeout(() => {
                    onRemove(toast.id);
                }, toast.duration);

                return () => clearTimeout(timer);
            }
        });
    }, [toasts, onRemove]);

    if (toasts.length === 0) return null;

    return (
        <div className="fixed top-4 right-4 z-50 flex flex-col gap-2 max-w-md">
            {toasts.map((toast) => (
                <Toast key={toast.id} toast={toast} onClose={onRemove} />
            ))}
        </div>
    );
}

export default ToastContainer;

