

export interface UserDetails {
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
  }
  
  export interface AnonymizedData {
    anonymizedId: string;
    anonymizedBillingAddress: string;
  }
  
  export const anonymizeData = (userDetails: UserDetails): AnonymizedData => {
    
    const anonymizedId = `${userDetails.firstName[0]}${userDetails.lastName[0]}-${Math.random().toString(36).substr(2, 9)}`;
    const anonymizedBillingAddress = `${userDetails.billingAddress.street[0]}***** ${userDetails.billingAddress.city}`;
    
    return {
      anonymizedId,
      anonymizedBillingAddress,
    };
  };
  