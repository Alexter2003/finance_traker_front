import { Button } from '@heroui/react';
import Modal from './Modal';

interface ConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  confirmColor?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
  isLoading?: boolean;
}

function ConfirmDialog({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmLabel = 'Confirmar',
  cancelLabel = 'Cancelar',
  confirmColor = 'danger',
  isLoading = false,
}: ConfirmDialogProps) {
  const handleConfirm = () => {
    onConfirm();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      size="md"
      footer={
        <div className="flex gap-2 justify-end">
          <Button variant="light" onPress={onClose} isDisabled={isLoading}>
            {cancelLabel}
          </Button>
          <Button color={confirmColor} onPress={handleConfirm} isLoading={isLoading}>
            {confirmLabel}
          </Button>
        </div>
      }
    >
      <p>{message}</p>
    </Modal>
  );
}

export default ConfirmDialog;

