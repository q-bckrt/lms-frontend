import {HttpInterceptorFn} from '@angular/common/http';
import {inject} from '@angular/core';
import {KeycloakServiceService} from './keycloak-service.service';

export const keycloakInterceptor: HttpInterceptorFn = (req, next) => {
  const keycloakService = inject(KeycloakServiceService)
  req = req.clone({
    setHeaders: {
      Authorization: `Bearer ${keycloakService.getToken()}`
    }
  })

  return next(req);
};
