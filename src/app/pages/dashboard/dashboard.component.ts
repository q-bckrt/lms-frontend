import { Component } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { ButtonComponent } from '../../components/button/button.component';
import { NgFor, NgIf } from '@angular/common';
import { KeycloakServiceService } from '../../services/keycloak/keycloak-service.service';
import { UserService } from '../../services/user-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  imports: [NavbarComponent, FooterComponent, ButtonComponent, NgIf, NgFor],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  userRole = '';
  username = '';

  constructor(
    private keycloakService: KeycloakServiceService,
    private userService: UserService,
    private router: Router
  ) {
    this.initializeUserData();
  }

  private initializeUserData() {
    const token = this.keycloakService.getToken();
    if (token) {
      try {
        const tokenData = JSON.parse(atob(token.split('.')[1]));
        this.username = tokenData.preferred_username;
        
        // Check if user has COACH role in lms resource
        if (tokenData.resource_access?.lms?.roles?.includes('COACH')) {
          this.userRole = 'coach';
        } else {
          this.userRole = 'student';
        }
      } catch (error) {
        console.error('Error parsing token:', error);
      }
    }
  }

  goTo(path: string) {
    console.log('Button clicked');
    this.router.navigate([path]);
  }
}
