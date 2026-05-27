import type { Environment } from './environment.model';

export const environment: Environment = {
  production: false,
  apiUrl: 'http://localhost:8000/api/v1',
  storageUrl: 'http://localhost:8000/storage',
} as const;
