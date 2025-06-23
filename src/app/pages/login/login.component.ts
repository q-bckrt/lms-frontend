import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {NavbarComponent} from '../../components/navbar/navbar.component';
import {ButtonComponent} from '../../components/button/button.component';
import {FooterComponent} from '../../components/footer/footer.component';
import { KeycloakServiceService } from '../../services/keycloak/keycloak-service.service';
import { RoleService } from '../../services/role-service.service';

@Component({
  selector: 'app-login',
  imports: [NavbarComponent, ButtonComponent, FooterComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent {
   constructor(
    private keycloakService: KeycloakServiceService,
    private router: Router,
    private roleService: RoleService
  ) {}

  handleLogin() {
    const username = (document.getElementById('username') as HTMLInputElement).value.trim();
    const password = (document.getElementById('password') as HTMLInputElement).value.trim();

    const spaceRegex = /\s/;

    if (!username || !password) {
      alert('Please enter both email and password');
      return;
    }

    if (spaceRegex.test(password)) {
      alert('Password must not contain spaces');
      return;
    }

    const loginData = {
      username: username,
      password: password
    };

    this.keycloakService.login(loginData).subscribe({
      next: () => {
        // Refresh the role after successful login
        this.roleService.refreshRole();
        this.router.navigate(['/profile']);
      },
      error: (err) => {
        console.error('Login failed:', err);
        alert('Login failed. Please check your credentials.');
      }
    });
  }
}
