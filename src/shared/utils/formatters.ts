/**
 * Formatea un número como moneda en quetzales (Q)
 * @param amount - Cantidad a formatear
 * @param locale - Locale para el formateo (default: 'es-GT')
 * @returns String formateado como moneda con símbolo Q
 */
export const formatCurrency = (
  amount: number,
  locale: string = 'es-GT'
): string => {
  // Formatear el número con separadores de miles y decimales
  const formatted = new Intl.NumberFormat(locale, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
  
  // Agregar el símbolo Q al inicio
  return `Q${formatted}`;
};

/**
 * Formatea una fecha en formato corto
 * @param date - Fecha a formatear (Date, string o number)
 * @param locale - Locale para el formateo (default: 'es-MX')
 * @returns String formateado como fecha corta
 */
export const formatDate = (
  date: Date | string | number,
  locale: string = 'es-MX'
): string => {
  const dateObj = typeof date === 'string' || typeof date === 'number' 
    ? new Date(date) 
    : date;
  
  return new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(dateObj);
};

/**
 * Formatea una fecha con hora
 * @param date - Fecha a formatear (Date, string o number)
 * @param locale - Locale para el formateo (default: 'es-MX')
 * @returns String formateado como fecha y hora
 */
export const formatDateTime = (
  date: Date | string | number,
  locale: string = 'es-MX'
): string => {
  const dateObj = typeof date === 'string' || typeof date === 'number' 
    ? new Date(date) 
    : date;
  
  return new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  }).format(dateObj);
};

/**
 * Formatea un número con separadores de miles
 * @param number - Número a formatear
 * @param locale - Locale para el formateo (default: 'es-MX')
 * @returns String formateado con separadores
 */
export const formatNumber = (
  number: number,
  locale: string = 'es-MX'
): string => {
  return new Intl.NumberFormat(locale).format(number);
};

/**
 * Formatea un número como porcentaje
 * @param value - Valor a formatear (0-1 o 0-100)
 * @param locale - Locale para el formateo (default: 'es-MX')
 * @returns String formateado como porcentaje
 */
export const formatPercentage = (
  value: number,
  locale: string = 'es-MX'
): string => {
  // Si el valor está entre 0 y 1, multiplicar por 100
  const percentage = value <= 1 ? value * 100 : value;
  
  return new Intl.NumberFormat(locale, {
    style: 'percent',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(percentage / 100);
};

/**
 * Formatea una fecha relativa (ej: "hace 2 días")
 * @param date - Fecha a formatear
 * @param locale - Locale para el formateo (default: 'es-MX')
 * @returns String con fecha relativa
 */
export const formatRelativeDate = (
  date: Date | string | number,
  locale: string = 'es-MX'
): string => {
  const dateObj = typeof date === 'string' || typeof date === 'number' 
    ? new Date(date) 
    : date;
  
  const rtf = new Intl.RelativeTimeFormat(locale, { numeric: 'auto' });
  const now = new Date();
  const diffInSeconds = (dateObj.getTime() - now.getTime()) / 1000;
  
  const intervals = [
    { unit: 'year' as const, seconds: 31536000 },
    { unit: 'month' as const, seconds: 2592000 },
    { unit: 'week' as const, seconds: 604800 },
    { unit: 'day' as const, seconds: 86400 },
    { unit: 'hour' as const, seconds: 3600 },
    { unit: 'minute' as const, seconds: 60 },
  ];
  
  for (const { unit, seconds } of intervals) {
    const interval = Math.floor(Math.abs(diffInSeconds) / seconds);
    if (interval >= 1) {
      return rtf.format(Math.sign(diffInSeconds) * interval, unit);
    }
  }
  
  return rtf.format(0, 'second');
};

