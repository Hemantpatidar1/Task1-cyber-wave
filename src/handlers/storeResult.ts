

import { writeFile } from 'fs';
import { promisify } from 'util';

const writeFileAsync = promisify(writeFile);

export interface ResultData {
  transactionId: string;
  riskLevel: string;
  score: number;
  timestamp: string;
}

export const storeResult = async (result: ResultData): Promise<void> => {
  const filePath = `./data/${result.transactionId}.json`;
  const data = JSON.stringify(result, null, 2);
  
  try {
    await writeFileAsync(filePath, data, 'utf8');
    console.log(`Successfully stored result for transaction ${result.transactionId}`);
  } catch (error) {
    console.error(`Error storing result for transaction ${result.transactionId}:`, error);
  }
};
