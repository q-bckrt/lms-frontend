import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {NavbarComponent} from '../../components/navbar/navbar.component';
import {ButtonComponent} from '../../components/button/button.component';
import {FooterComponent} from '../../components/footer/footer.component';
import { KeycloakServiceService } from '../../services/keycloak/keycloak-service.service';

@Component({
  selector: 'app-login',
  imports: [NavbarComponent, ButtonComponent, FooterComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent {
   constructor(
    private keycloakService: KeycloakServiceService,
    private router: Router
  ) {}

  handleLogin() {
    const email = (document.getElementById('email') as HTMLInputElement).value.trim();
    const password = (document.getElementById('password') as HTMLInputElement).value.trim();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const spaceRegex = /\s/;

    if (!email || !password) {
      alert('Please enter both email and password');
      return;
    }

    // if (!emailRegex.test(email)) {
    //   alert('Invalid email format');
    //   return;
    // }

    if (spaceRegex.test(password)) {
      alert('Password must not contain spaces');
      return;
    }

    const loginData = {
      username: email,
      password: password
    };

    this.keycloakService.login(loginData).subscribe({
      next: () => {
        this.router.navigate(['/profile']);
      },
      error: (err) => {
        console.error('Login failed:', err);
        alert('Login failed. Please check your credentials.');
      }
    });
  }
}
