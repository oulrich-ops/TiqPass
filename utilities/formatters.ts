/**
 * Utility functions for formatting values in the application
 */

/**
 * Format a number as currency (EUR by default)
 * @param value - Number to format as currency
 * @param locale - Locale to use for formatting (default: 'fr-FR')
 * @param currency - Currency code (default: 'EUR')
 * @returns Formatted currency string
 */
export const formatCurrency = (
    value: number,
    locale: string = 'fr-FR',
    currency: string = 'EUR'
  ): string => {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };
  
  /**
   * Format a date according to the specified locale and options
   * @param date - Date to format (Date object or ISO string)
   * @param locale - Locale to use for formatting (default: 'fr-FR')
   * @param options - Intl.DateTimeFormatOptions object
   * @returns Formatted date string
   */
  export const formatDate = (
    date: Date | string,
    locale: string = 'fr-FR',
    options: Intl.DateTimeFormatOptions = {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    }
  ): string => {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    return new Intl.DateTimeFormat(locale, options).format(dateObj);
  };
  
  /**
   * Format a date and time according to the specified locale
   * @param date - Date to format (Date object or ISO string)
   * @param locale - Locale to use for formatting (default: 'fr-FR')
   * @returns Formatted date and time string
   */
  export const formatDateTime = (
    date: Date | string,
    locale: string = 'fr-FR'
  ): string => {
    const options: Intl.DateTimeFormatOptions = {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    };
    
    return formatDate(date, locale, options);
  };
  
  /**
   * Format a time from a date according to the specified locale
   * @param date - Date to extract time from (Date object or ISO string)
   * @param locale - Locale to use for formatting (default: 'fr-FR')
   * @returns Formatted time string
   */
  export const formatTime = (
    date: Date | string,
    locale: string = 'fr-FR'
  ): string => {
    const options: Intl.DateTimeFormatOptions = {
      hour: '2-digit',
      minute: '2-digit',
    };
    
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    return new Intl.DateTimeFormat(locale, options).format(dateObj);
  };
  
  /**
   * Truncate a string to a specific length and add ellipsis if needed
   * @param str - String to truncate
   * @param maxLength - Maximum length before truncation (default: 100)
   * @returns Truncated string with ellipsis if needed
   */
  export const truncateString = (str: string, maxLength: number = 100): string => {
    if (!str) return '';
    if (str.length <= maxLength) return str;
    
    return `${str.substring(0, maxLength - 3)}...`;
  };
  
  /**
   * Format a number with thousand separators
   * @param value - Number to format
   * @param locale - Locale to use for formatting (default: 'fr-FR')
   * @returns Formatted number string
   */
  export const formatNumber = (
    value: number,
    locale: string = 'fr-FR'
  ): string => {
    return new Intl.NumberFormat(locale).format(value);
  };