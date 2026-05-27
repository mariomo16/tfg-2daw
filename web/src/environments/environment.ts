import type { Environment } from './environment.model';

export const environment: Environment = {
  production: true,
  apiUrl: 'https://tfg-api-m1mc.onrender.com/api/v1',
  storageUrl: 'https://tfg-api-m1mc.onrender.com/storage',
} as const;
