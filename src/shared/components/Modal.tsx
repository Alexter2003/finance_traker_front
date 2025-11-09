import { Modal as HeroUIModal, ModalContent, ModalHeader, ModalBody, ModalFooter } from '@heroui/react';
import type { ReactNode } from 'react';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    children: ReactNode;
    footer?: ReactNode;
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | 'full';
    isDismissable?: boolean;
    isKeyboardDismissDisabled?: boolean;
}

function Modal({
    isOpen,
    onClose,
    title,
    children,
    footer,
    size = 'md',
    isDismissable = true,
    isKeyboardDismissDisabled = false,
}: ModalProps) {
    return (
        <HeroUIModal
            isOpen={isOpen}
            onClose={onClose}
            size={size}
            isDismissable={isDismissable}
            isKeyboardDismissDisabled={isKeyboardDismissDisabled}
        >
            <ModalContent>
                {() => (
                    <>
                        {title && <ModalHeader>{title}</ModalHeader>}
                        <ModalBody>{children}</ModalBody>
                        {footer && <ModalFooter>{footer}</ModalFooter>}
                    </>
                )}
            </ModalContent>
        </HeroUIModal>
    );
}

export default Modal;

