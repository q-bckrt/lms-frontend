import { Injectable } from '@angular/core';
import { KeycloakServiceService } from './keycloak/keycloak-service.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  private userRole = new BehaviorSubject<string>('');
  userRole$ = this.userRole.asObservable();

  constructor(private keycloakService: KeycloakServiceService) {
    this.initializeRole();
  }

  private initializeRole() {
    this.userRole.next(''); // Clear any existing role

    const token = this.keycloakService.getToken();
    if (token) {
      try {
        const tokenData = JSON.parse(atob(token.split('.')[1]));
        if (tokenData.resource_access?.lms?.roles?.includes('COACH')) {
          console.log('Setting role to coach');
          this.userRole.next('coach');
        } else if (tokenData.resource_access?.lms?.roles?.includes('STUDENT')) {
          console.log('Setting role to student');
          this.userRole.next('student');
        } else {
          console.warn('No recognized role found in token');
          this.userRole.next('');
        }
      } catch (error) {
        console.error('Error parsing token:', error);
        this.userRole.next('');
      }
    } else {
      console.warn('No token found');
      this.userRole.next('');
    }
  }

  // Call this method when user logs in or out
  refreshRole() {
    this.initializeRole();
  }

  isCoach(): boolean {
    return this.userRole.value === 'coach';
  }

  isStudent(): boolean {
    return this.userRole.value === 'student';
  }

  getCurrentRole(): string {
    return this.userRole.value;
  }

  hasRole(role: string): boolean {
    return this.userRole.value === role;
  }
}
