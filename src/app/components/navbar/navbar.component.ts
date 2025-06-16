import { Component } from '@angular/core';
import { ButtonComponent } from "../button/button.component";
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { KeycloakServiceService } from '../../services/keycloak/keycloak-service.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-navbar',
  imports: [ButtonComponent, NgIf],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  pageTitle = ''
  constructor(
    public keycloakService: KeycloakServiceService,
    private router: Router
  ) {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        const url = this.router.url
        this.pageTitle = this.getTitleFromUrl(url)
      })
  }

   getTitleFromUrl(url: string): string {
    if (url === '/overview') return 'Overview';
    if (url === '/class') return 'Class';
    if (url === '/dashboard') return 'Dashboard';
    if (url === '/edit') return 'Edit Profile';
    if (url === '/profile') return 'Profile';
    if (url === '/login') return 'Login';
    if (url === '/register') return 'Register';
    if (url === '/') return 'Home';
    return 'LMS App';
  }

  goToLogin(): void {
    console.log('Login button clicked');
    this.router.navigate(['/login']);
  }

  goToRegister(): void {
    console.log('Register button clicked');
    this.router.navigate(['/register']);
  }

  goToProfile(): void {
    console.log('Profile button clicked')
    this.router.navigate(['/profile'])
  }

  goToDashboard(): void {
    console.log('Dashboard button clicked')
    this.router.navigate(['/dashboard'])
  }

  goToOverview(): void {
    console.log('Overview button clicked');
    this.router.navigate(['/overview']);
  }

  goToClass(): void {
    console.log('Class button clicked');
    this.router.navigate(['/class']);
  }

  logout() {
    sessionStorage.removeItem('TOKEN_KEY_NAME');
    this.router.navigate(['/']);
  }

  isLoggedIn(): boolean {
    return !!this.keycloakService.getToken();
  }
}
