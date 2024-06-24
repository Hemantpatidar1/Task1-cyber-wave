import { APIGatewayProxyHandler } from 'aws-lambda';
import { validateData } from '../utils/validateData';
import { anonymizeData, AnonymizedData } from './anonymizeData';
import { encryptData, EncryptedData } from './encryptData'; 
import { assessRisk, RiskAssessment } from './assessRisk'; 
import { enrichData } from './enrichData';
import { storeResult } from './storeResult';

export const handler: APIGatewayProxyHandler = async (event) => {
  try {
    
    if (!event.body) {
      throw new Error('Request body is empty');
    }

    
    const data: { [key: string]: any } = JSON.parse(event.body);

   
    validateData(data);

    
    const anonymizedData: AnonymizedData = anonymizeData(data);

    
    const encryptedData: EncryptedData = encryptData(anonymizedData);

    
    const enrichedData: EncryptedData = await enrichData(encryptedData);

    
    const riskAssessment: RiskAssessment = assessRisk(enrichedData);

    
    await storeResult(riskAssessment);

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Transaction processed successfully' }),
    };
  } catch (error) {
    console.error('Error processing transaction:', error);

    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
