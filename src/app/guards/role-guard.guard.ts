import { CanActivateFn, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { inject } from '@angular/core';
import { RoleService } from '../services/role-service.service';

export const roleGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const roleService = inject(RoleService);
  const router = inject(Router);

  const requiredRole = route.data['role'] as string;
  const userRole = roleService.getCurrentRole();

  if (userRole === requiredRole) {
    return true;
  }

  // Redirect to home or a forbidden page
  router.navigate(['/']);
  return false;
};
