

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
  
  export interface RiskAssessment {
    riskLevel: string;
    score: number;
  }
  
  export const assessRisk = (transaction: TransactionDetails): RiskAssessment => {
    let score = 0;
  
  
    if (transaction.amount > 1000) {
      score += 50;
    }
  
    if (transaction.currency !== 'USD') {
      score += 20;
    }
  
    if (transaction.paymentMethod === 'CreditCard') {
      score += 30;
    }
  

  
    let riskLevel: string;
    if (score > 80) {
      riskLevel = 'High';
    } else if (score > 50) {
      riskLevel = 'Medium';
    } else {
      riskLevel = 'Low';
    }
  
    return { riskLevel, score };
  };
  