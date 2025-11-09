import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from '@heroui/react';
import type { ReactNode } from 'react';

interface Column<T> {
  key: string;
  label: string;
  render?: (item: T) => ReactNode;
}

interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  emptyMessage?: string;
  className?: string;
  onRowClick?: (item: T) => void;
}

function DataTable<T extends { id?: string | number }>({
  data,
  columns,
  emptyMessage = 'No hay datos disponibles',
  className = '',
  onRowClick,
}: DataTableProps<T>) {
  return (
    <Table
      aria-label="Tabla de datos"
      className={className}
      selectionMode="none"
      onRowAction={onRowClick ? (key) => {
        const item = data.find((d) => String(d.id) === String(key));
        if (item) onRowClick(item);
      } : undefined}
    >
      <TableHeader>
        {columns.map((column) => (
          <TableColumn key={column.key}>{column.label}</TableColumn>
        ))}
      </TableHeader>
      <TableBody emptyContent={emptyMessage}>
        {data.map((item, index) => (
          <TableRow key={item.id || index}>
            {columns.map((column) => (
              <TableCell key={column.key}>
                {column.render ? column.render(item) : String((item as Record<string, unknown>)[column.key] || '')}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default DataTable;

