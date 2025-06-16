import {HttpInterceptorFn} from '@angular/common/http';
import {inject} from '@angular/core';
import {KeycloakServiceService} from './keycloak-service.service';

export const keycloakInterceptor: HttpInterceptorFn = (req, next) => {
  // Skip interceptor for Keycloak login endpoint
  if (req.url.includes('keycloak.switchfully.com/realms/java-2025-03/protocol/openid-connect/token')) {
    return next(req);
  }

  // Skip interceptor for registration endpoint (POST to /users)
  if (req.url.includes('http://localhost:8080/users') && req.method === 'POST') {
    return next(req);
  }

  const keycloakService = inject(KeycloakServiceService)
  req = req.clone({
    setHeaders: {
      Authorization: `Bearer ${keycloakService.getToken()}`
    }
  })

  return next(req);
};
