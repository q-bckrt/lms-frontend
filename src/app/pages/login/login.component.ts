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

  handleLogin() {
    const email = (document.getElementById('email') as HTMLInputElement).value.trim();
    const password = (document.getElementById('password') as HTMLInputElement).value.trim();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const spaceRegex = /\s/;

    if (!email || !password) {
      alert('Please enter both email and password');
      return;
    }

    if (!emailRegex.test(email)) {
      alert('Invalid email format');
      return;
    }

    if (spaceRegex.test(password)) {
      alert('Password must not contain spaces');
      return;
    }

    // Determine role from email
    let role: 'student' | 'coach' = email.includes('coach') ? 'coach' : 'student';

    const dummyUser = {
      username: email.split('@')[0],
      displayName: role === 'student' ? 'Student User' : 'Coach User',
      password : password,
      email,
      role
    };

    localStorage.setItem('user', JSON.stringify(dummyUser));
    this.authService.login();
    this.router.navigate(['/dashboard']);
  }
}
