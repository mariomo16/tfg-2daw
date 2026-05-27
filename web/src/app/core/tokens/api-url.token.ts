import { InjectionToken } from '@angular/core';
import { environment } from '../../../environments/environment';

export const API_URL = new InjectionToken<string>('API_URL', {
  providedIn: 'root',
  factory: () => environment.apiUrl,
});

export const STORAGE_URL = new InjectionToken<string>('STORAGE_URL', {
  providedIn: 'root',
  factory: () => environment.storageUrl,
});
