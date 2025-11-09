import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@heroui/react';
import {
    LoadingSpinner,
    LoadingCard,
    FormInput,
    FormSelect,
    FormTextarea,
    FormDatePicker,
    SubmitButton,
    Card,
    Modal,
    ConfirmDialog,
    EmptyState,
    DataTable,
    PageHeader,
    ToastContainer,
} from '../../../shared/components';
import { useToast, useConfirm } from '../../../shared/hooks';

interface FormData {
    name: string;
    email: string;
    category: string;
    description: string;
    date: string;
}

function HeroUIKitPage() {
    const { control, handleSubmit } = useForm<FormData>();
    const { toasts, success, error, warning, info, removeToast } = useToast();
    const { confirm, confirmState } = useConfirm();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const tableData = [
        { id: 1, name: 'Juan Pérez', email: 'juan@example.com', role: 'Admin' },
        { id: 2, name: 'María García', email: 'maria@example.com', role: 'User' },
        { id: 3, name: 'Carlos López', email: 'carlos@example.com', role: 'User' },
    ];

    const tableColumns = [
        { key: 'name', label: 'Nombre' },
        { key: 'email', label: 'Email' },
        { key: 'role', label: 'Rol' },
    ];

    const selectOptions = [
        { value: '1', label: 'Opción 1' },
        { value: '2', label: 'Opción 2' },
        { value: '3', label: 'Opción 3' },
    ];

    const onSubmit = (data: FormData) => {
        console.log('Form data:', data);
        success('Formulario enviado correctamente');
    };

    const handleConfirmClick = async () => {
        const result = await confirm({
            title: 'Confirmar acción',
            message: '¿Estás seguro de que quieres realizar esta acción?',
            confirmLabel: 'Sí, confirmar',
            cancelLabel: 'Cancelar',
            confirmColor: 'danger',
        });
        if (result) {
            success('Acción confirmada');
        } else {
            info('Acción cancelada');
        }
    };

    return (
        <div className="p-6 max-w-7xl mx-auto">
            <PageHeader
                title="HeroUI Component Kit"
                description="Visualización de todos los componentes compartidos del proyecto"
            />

            <ToastContainer toasts={toasts} onRemove={removeToast} />

            {/* Loading Components */}
            <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4">Loading Components</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card title="Loading Spinner">
                        <div className="space-y-4">
                            <LoadingSpinner size="sm" label="Cargando..." />
                            <LoadingSpinner size="md" color="primary" label="Procesando..." />
                            <LoadingSpinner size="lg" color="success" label="Completado" />
                        </div>
                    </Card>
                    <Card title="Loading Card">
                        <LoadingCard lines={4} />
                    </Card>
                </div>
            </section>

            {/* Form Components */}
            <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4">Form Components</h2>
                <Card title="Formulario de Ejemplo">
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <FormInput
                            name="name"
                            control={control}
                            label="Nombre"
                            placeholder="Ingresa tu nombre"
                            isRequired
                        />
                        <FormInput
                            name="email"
                            control={control}
                            label="Email"
                            type="email"
                            placeholder="correo@example.com"
                            isRequired
                        />
                        <FormSelect
                            name="category"
                            control={control}
                            label="Categoría"
                            options={selectOptions}
                            isRequired
                        />
                        <FormDatePicker
                            name="date"
                            control={control}
                            label="Fecha"
                            isRequired
                        />
                        <FormTextarea
                            name="description"
                            control={control}
                            label="Descripción"
                            placeholder="Escribe una descripción..."
                            minRows={4}
                        />
                        <SubmitButton isLoading={false}>Enviar Formulario</SubmitButton>
                    </form>
                </Card>
            </section>

            {/* Button Variants */}
            <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4">Buttons</h2>
                <Card title="Diferentes Variantes de Botones">
                    <div className="space-y-6">
                        <div>
                            <h3 className="text-lg font-semibold mb-3">Colores</h3>
                            <div className="flex flex-wrap gap-3">
                                <Button color="default">Default</Button>
                                <Button color="primary">Primary</Button>
                                <Button color="secondary">Secondary</Button>
                                <Button color="success">Success</Button>
                                <Button color="warning">Warning</Button>
                                <Button color="danger">Danger</Button>
                            </div>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold mb-3">Variantes</h3>
                            <div className="flex flex-wrap gap-3">
                                <Button variant="solid" color="primary">Solid</Button>
                                <Button variant="bordered" color="primary">Bordered</Button>
                                <Button variant="light" color="primary">Light</Button>
                                <Button variant="flat" color="primary">Flat</Button>
                                <Button variant="faded" color="primary">Faded</Button>
                                <Button variant="shadow" color="primary">Shadow</Button>
                            </div>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold mb-3">Tamaños</h3>
                            <div className="flex flex-wrap items-center gap-3">
                                <Button size="sm" color="primary">Small</Button>
                                <Button size="md" color="primary">Medium</Button>
                                <Button size="lg" color="primary">Large</Button>
                            </div>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold mb-3">Estados</h3>
                            <div className="flex flex-wrap gap-3">
                                <Button color="primary" isLoading>Loading</Button>
                                <Button color="primary" isDisabled>Disabled</Button>
                                <Button color="primary" fullWidth className="max-w-xs">Full Width</Button>
                            </div>
                        </div>
                    </div>
                </Card>
            </section>

            {/* Toast Examples */}
            <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4">Toast Notifications</h2>
                <Card title="Mostrar Notificaciones">
                    <p className="text-sm text-gray-600 mb-4">
                        Haz clic en los botones para ver las notificaciones toast en la esquina superior derecha.
                    </p>
                    <div className="flex flex-wrap gap-3">
                        <Button
                            color="success"
                            variant="flat"
                            onPress={() => success('Operación exitosa', 3000)}
                        >
                            Success Toast
                        </Button>
                        <Button
                            color="danger"
                            variant="flat"
                            onPress={() => error('Error en la operación', 3000)}
                        >
                            Error Toast
                        </Button>
                        <Button
                            color="warning"
                            variant="flat"
                            onPress={() => warning('Advertencia importante', 3000)}
                        >
                            Warning Toast
                        </Button>
                        <Button
                            color="primary"
                            variant="flat"
                            onPress={() => info('Información útil', 3000)}
                        >
                            Info Toast
                        </Button>
                    </div>
                </Card>
            </section>

            {/* Modal */}
            <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4">Modal</h2>
                <Card title="Modal Dialog">
                    <Button color="primary" onPress={() => setIsModalOpen(true)}>
                        Abrir Modal
                    </Button>
                    <Modal
                        isOpen={isModalOpen}
                        onClose={() => setIsModalOpen(false)}
                        title="Modal de Ejemplo"
                        size="md"
                        footer={
                            <div className="flex gap-2 justify-end">
                                <Button variant="light" onPress={() => setIsModalOpen(false)}>
                                    Cancelar
                                </Button>
                                <Button color="primary" onPress={() => {
                                    setIsModalOpen(false);
                                    success('Modal confirmado');
                                }}>
                                    Confirmar
                                </Button>
                            </div>
                        }
                    >
                        <p>Este es un ejemplo de modal. Puedes agregar cualquier contenido aquí.</p>
                    </Modal>
                </Card>
            </section>

            {/* Confirm Dialog */}
            <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4">Confirm Dialog</h2>
                <Card title="Diálogo de Confirmación">
                    <Button color="danger" onPress={handleConfirmClick}>
                        Mostrar Confirmación
                    </Button>
                    {confirmState && (
                        <ConfirmDialog
                            isOpen={confirmState.isOpen}
                            onClose={confirmState.onCancel}
                            onConfirm={confirmState.onConfirm}
                            title={confirmState.title}
                            message={confirmState.message}
                            confirmLabel={confirmState.confirmLabel}
                            cancelLabel={confirmState.cancelLabel}
                            confirmColor={confirmState.confirmColor}
                        />
                    )}
                </Card>
            </section>

            {/* Data Table */}
            <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4">Data Table</h2>
                <Card title="Tabla de Datos">
                    <DataTable
                        data={tableData}
                        columns={tableColumns}
                        emptyMessage="No hay datos disponibles"
                        onRowClick={(item) => info(`Clickeaste en: ${item.name}`)}
                    />
                </Card>
            </section>

            {/* Empty State */}
            <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4">Empty State</h2>
                <Card>
                    <EmptyState
                        title="No hay elementos"
                        description="No se encontraron elementos para mostrar. Intenta agregar algunos datos."
                        action={{
                            label: 'Agregar Elemento',
                            onClick: () => info('Acción de agregar elemento'),
                        }}
                    />
                </Card>
            </section>

            {/* Card Variants */}
            <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4">Cards</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card title="Card con Título" shadow="sm">
                        <p>Este es un card con sombra pequeña.</p>
                    </Card>
                    <Card title="Card con Acciones" shadow="md" headerActions={<Button size="sm">Acción</Button>}>
                        <p>Este card tiene acciones en el header.</p>
                    </Card>
                    <Card shadow="lg">
                        <p>Este card tiene sombra grande y sin título.</p>
                    </Card>
                </div>
            </section>
        </div>
    );
}

export default HeroUIKitPage;

