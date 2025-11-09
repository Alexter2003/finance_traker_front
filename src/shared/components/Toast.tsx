// Toast component

export type ToastType = 'success' | 'error' | 'warning' | 'info';

export interface Toast {
    id: string;
    message: string;
    type: ToastType;
    duration?: number;
}

interface ToastProps {
    toast: Toast;
    onClose: (id: string) => void;
}

function Toast({ toast, onClose }: ToastProps) {
    const getColorClasses = () => {
        switch (toast.type) {
            case 'success':
                return 'bg-green-50 border-green-200 text-green-800';
            case 'error':
                return 'bg-red-50 border-red-200 text-red-800';
            case 'warning':
                return 'bg-yellow-50 border-yellow-200 text-yellow-800';
            case 'info':
                return 'bg-blue-50 border-blue-200 text-blue-800';
            default:
                return 'bg-gray-50 border-gray-200 text-gray-800';
        }
    };

    return (
        <div
            className={`border rounded-lg p-4 shadow-lg flex items-center justify-between gap-4 ${getColorClasses()}`}
        >
            <p className="flex-1">{toast.message}</p>
            <button
                onClick={() => onClose(toast.id)}
                className="text-gray-500 hover:text-gray-700"
            >
                ✕
            </button>
        </div>
    );
}

export default Toast;

