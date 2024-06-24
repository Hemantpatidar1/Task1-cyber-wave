

import { randomBytes, createCipheriv, createDecipheriv } from 'crypto';

const algorithm = 'aes-256-ctr';
const secretKey = randomBytes(32);
const iv = randomBytes(16);

export interface EncryptedData {
  iv: string;
  content: string;
}

export const encryptData = (text: string): EncryptedData => {
  const cipher = createCipheriv(algorithm, secretKey, iv);
  const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);
  
  return {
    iv: iv.toString('hex'),
    content: encrypted.toString('hex')
  };
};

export const decryptData = (hash: EncryptedData): string => {
  const decipher = createDecipheriv(algorithm, secretKey, Buffer.from(hash.iv, 'hex'));
  const decrypted = Buffer.concat([decipher.update(Buffer.from(hash.content, 'hex')), decipher.final()]);
  
  return decrypted.toString();
};
