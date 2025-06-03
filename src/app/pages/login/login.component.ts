import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {NavbarComponent} from '../../components/navbar/navbar.component';
import {ButtonComponent} from '../../components/button/button.component';
import {FooterComponent} from '../../components/footer/footer.component';
import { AuthService } from '../../services/auth-service.service';


@Component({
  selector: 'app-login',
  imports: [NavbarComponent, ButtonComponent, FooterComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
   constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    const loginButton = document.getElementById('loginButton');
    loginButton?.addEventListener('click', () => {
      this.handleLogin();
    });
  }

  handleLogin() {
    const emailInput = (document.getElementById('email') as HTMLInputElement).value;
    const passwordInput = (document.getElementById('password') as HTMLInputElement).value;

    // Here, you'd normally validate credentials with a backend.
    if (emailInput && passwordInput) {
      // Simulate successful login
      this.authService.login(); // This will trigger the navbar to change
      this.router.navigate(['/profile']); // Or redirect anywhere you'd like
    } else {
      alert('Please enter both email and password');
    }
  }
}
