

export interface TransactionDetails {
    amount: number;
    currency: string;
    transactionDate: string;
    paymentMethod: string;
    merchantDetails: {
      merchantId: string;
      name: string;
      category: string;
      countryCode: string;
    };
  }
  
  export interface EnrichedTransactionDetails extends TransactionDetails {
    currencyConversionRate?: number;
    regionalEconomicIndicator?: string;
  }
  
  export const enrichData = (transaction: TransactionDetails): EnrichedTransactionDetails => {
  
    const currencyConversionRate = getCurrencyConversionRate(transaction.currency);
    const regionalEconomicIndicator = getRegionalEconomicIndicator(transaction.merchantDetails.countryCode);
  
    return {
      ...transaction,
      currencyConversionRate,
      regionalEconomicIndicator,
    };
  };
  
  const getCurrencyConversionRate = (currency: string): number => {
  
    const rates: { [key: string]: number } = { USD: 1, EUR: 0.85, GBP: 0.75 };
    return rates[currency] || 1;
  };
  
  const getRegionalEconomicIndicator = (countryCode: string): string => {
  
    const indicators: { [key: string]: string } = { US: 'Strong', EU: 'Moderate', GB: 'Weak' };
    return indicators[countryCode] || 'Unknown';
  };
  