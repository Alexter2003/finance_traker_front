/**
 * Valida si un string es un email válido
 * @param email - Email a validar
 * @returns true si es válido, false en caso contrario
 */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Valida si un string es una URL válida
 * @param url - URL a validar
 * @returns true si es válido, false en caso contrario
 */
export const isValidUrl = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

/**
 * Valida si un número está dentro de un rango
 * @param value - Valor a validar
 * @param min - Valor mínimo
 * @param max - Valor máximo
 * @returns true si está en el rango, false en caso contrario
 */
export const isInRange = (value: number, min: number, max: number): boolean => {
  return value >= min && value <= max;
};

/**
 * Valida si una fecha es válida
 * @param date - Fecha a validar
 * @returns true si es válida, false en caso contrario
 */
export const isValidDate = (date: Date | string | number): boolean => {
  const dateObj = typeof date === 'string' || typeof date === 'number' 
    ? new Date(date) 
    : date;
  
  return !isNaN(dateObj.getTime());
};

/**
 * Valida si una fecha está en el futuro
 * @param date - Fecha a validar
 * @returns true si está en el futuro, false en caso contrario
 */
export const isFutureDate = (date: Date | string | number): boolean => {
  const dateObj = typeof date === 'string' || typeof date === 'number' 
    ? new Date(date) 
    : date;
  
  return dateObj > new Date();
};

/**
 * Valida si una fecha está en el pasado
 * @param date - Fecha a validar
 * @returns true si está en el pasado, false en caso contrario
 */
export const isPastDate = (date: Date | string | number): boolean => {
  const dateObj = typeof date === 'string' || typeof date === 'number' 
    ? new Date(date) 
    : date;
  
  return dateObj < new Date();
};

/**
 * Valida si un string no está vacío (después de trim)
 * @param value - String a validar
 * @returns true si no está vacío, false en caso contrario
 */
export const isNotEmpty = (value: string): boolean => {
  return value.trim().length > 0;
};

/**
 * Valida si un número es positivo
 * @param value - Número a validar
 * @returns true si es positivo, false en caso contrario
 */
export const isPositive = (value: number): boolean => {
  return value > 0;
};

/**
 * Valida si un número es negativo
 * @param value - Número a validar
 * @returns true si es negativo, false en caso contrario
 */
export const isNegative = (value: number): boolean => {
  return value < 0;
};

/**
 * Valida si dos fechas no se superponen
 * @param start1 - Inicio del primer período
 * @param end1 - Fin del primer período
 * @param start2 - Inicio del segundo período
 * @param end2 - Fin del segundo período
 * @returns true si no se superponen, false en caso contrario
 */
export const datesDoNotOverlap = (
  start1: Date | string,
  end1: Date | string,
  start2: Date | string,
  end2: Date | string
): boolean => {
  const s1 = typeof start1 === 'string' ? new Date(start1) : start1;
  const e1 = typeof end1 === 'string' ? new Date(end1) : end1;
  const s2 = typeof start2 === 'string' ? new Date(start2) : start2;
  const e2 = typeof end2 === 'string' ? new Date(end2) : end2;
  
  return e1 < s2 || e2 < s1;
};

