import type { AxiosError } from 'axios';

/**
 * Interfaz para la respuesta de error del backend
 */
interface BackendErrorResponse {
  message?: string | string[];
  error?: string;
  statusCode?: number;
}

/**
 * Extrae el mensaje de error de una respuesta de Axios
 * @param error - Error de Axios o Error genérico
 * @param defaultMessage - Mensaje por defecto si no se puede extraer
 * @returns Mensaje de error legible
 */
export const getErrorMessage = (
  error: unknown,
  defaultMessage: string = 'Ha ocurrido un error'
): string => {
  // Si es un error de Axios con respuesta del servidor
  if (isAxiosError(error) && error.response) {
    const data = error.response.data as BackendErrorResponse;
    
    // Si hay un mensaje en la respuesta
    if (data?.message) {
      // Si es un array de mensajes, unirlos
      if (Array.isArray(data.message)) {
        return data.message.join(', ');
      }
      // Si es un string, devolverlo directamente
      return data.message;
    }
    
    // Si no hay mensaje pero hay error, usar el error
    if (data?.error) {
      return data.error;
    }
  }
  
  // Si es un Error genérico con mensaje
  if (error instanceof Error && error.message) {
    return error.message;
  }
  
  // Mensaje por defecto
  return defaultMessage;
};

/**
 * Verifica si un error es un AxiosError
 */
function isAxiosError(error: unknown): error is AxiosError<BackendErrorResponse> {
  return (
    typeof error === 'object' &&
    error !== null &&
    'isAxiosError' in error &&
    (error as AxiosError).isAxiosError === true
  );
}

