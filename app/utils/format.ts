/**
 * Formats a number with IDR currency style and Indonesian locale (dots as thousand separators).
 */
export const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0
  }).format(amount);
};

/**
 * Formats a number with Indonesian thousand separators (dots) for inputs.
 */
export const formatNumber = (value: string | number) => {
  if (value === null || value === undefined || value === '') return '';
  const num = typeof value === 'string' ? value.replace(/[^0-9]/g, '') : value.toString();
  return num.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

/**
 * Parses a string with dots back into a number.
 */
export const parseNumber = (value: string) => {
  return parseFloat(value.replace(/\./g, '')) || 0;
};
