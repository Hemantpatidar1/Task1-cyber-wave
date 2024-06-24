

export interface TransactionData {
    transactionId: string;
    userId: string;
    transactionDetails: {
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
    };
    userDetails: {
      firstName: string;
      lastName: string;
      email: string;
      phone: string;
      billingAddress: {
        street: string;
        city: string;
        state: string;
        postalCode: string;
        country: string;
      };
    };
    additionalInfo: {
      deviceIp: string;
      userAgent: string;
    };
  }
  

export const validateData = (data: any): boolean => {
    
    return typeof data.userName === 'string' && data.userName.trim().length > 0;
  };
  