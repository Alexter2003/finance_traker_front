import { IncomeFrequency } from '../../../shared/types/common.types';

/**
 * Obtiene el nombre legible de la frecuencia de ingreso
 * @param frequency - Frecuencia del ingreso
 * @returns Nombre legible en español
 */
export const getIncomeFrequencyLabel = (frequency: string): string => {
  const labels: Record<string, string> = {
    ONE_TIME: 'Una vez',
    RECURRENT_MONTHLY: 'Recurrente mensual',
    RECURRENT_BIWEEKLY: 'Recurrente quincenal',
  };

  return labels[frequency] || frequency;
};

/**
 * Obtiene las opciones de frecuencia para un select
 * @returns Array de opciones con value y label
 */
export const getIncomeFrequencyOptions = () => {
  return [
    { value: IncomeFrequency.ONE_TIME, label: 'Una vez' },
    { value: IncomeFrequency.RECURRENT_MONTHLY, label: 'Recurrente mensual' },
    { value: IncomeFrequency.RECURRENT_BIWEEKLY, label: 'Recurrente quincenal' },
  ];
};

