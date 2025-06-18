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
    // Clear any existing role
    this.userRole.next('');

    const token = this.keycloakService.getToken();
    if (token) {
      try {
        const tokenData = JSON.parse(atob(token.split('.')[1]));
        if (tokenData.resource_access?.lms?.roles?.includes('COACH')) {
          console.log('Setting role to coach');
          this.userRole.next('coach');
        } else {
          console.log('Setting role to student');
          this.userRole.next('student');
        }
      } catch (error) {
        console.error('Error parsing token:', error);
        this.userRole.next('student');
      }
    } else {
      console.log('No token found'); // Debug log
      this.userRole.next('student');
    }
  }

  // Call this method when user logs in or out
  refreshRole() {
    this.initializeRole();
  }

  isCoach(): boolean {
    const isCoach = this.userRole.value === 'coach';
    console.log('isCoach check:', isCoach, 'Current role:', this.userRole.value); // Debug log
    return isCoach;
  }

  isStudent(): boolean {
    const isStudent = this.userRole.value === 'student';
    console.log('isStudent check:', isStudent, 'Current role:', this.userRole.value); // Debug log
    return isStudent;
  }

  getCurrentRole(): string {
    return this.userRole.value;
  }

  hasRole(role: string): boolean {
    return this.userRole.value === role;
  }
}
