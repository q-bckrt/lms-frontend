import {HttpInterceptorFn} from '@angular/common/http';
import {inject} from '@angular/core';
import {KeycloakServiceService} from './keycloak-service.service';
import {environment} from '../../../environment/environment';

export const keycloakInterceptor: HttpInterceptorFn = (req, next) => {

  const baseUrl = environment.BASE_URL;

  // Skip interceptor for Keycloak login endpoint
  if (req.url.includes('keycloak.switchfully.com/realms/java-2025-03/protocol/openid-connect/token')) {
    return next(req);
  }

  // Skip interceptor for registration endpoint (POST to /users)
  if (req.url.includes(`${baseUrl}` + '/users') && req.method === 'POST') {
    return next(req);
  }

  const keycloakService = inject(KeycloakServiceService)
  req = req.clone({
    setHeaders: {
      Authorization: `Bearer ${keycloakService.getToken()}`
    }
  })
  console.log(keycloakService.getToken());
  return next(req);
};
