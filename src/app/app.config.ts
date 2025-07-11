import {ApplicationConfig, importProvidersFrom, provideZoneChangeDetection} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';

import {provideHttpClient, withInterceptors} from '@angular/common/http';
import {keycloakInterceptor} from './services/keycloak/keycloak.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes),provideHttpClient(withInterceptors([keycloakInterceptor]))]
};

