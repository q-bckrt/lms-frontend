import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {ButtonComponent} from "../../components/button/button.component";
import {FooterComponent} from "../../components/footer/footer.component";
import {NavbarComponent} from "../../components/navbar/navbar.component";
import { AuthService } from '../../services/auth-service.service';

@Component({
  selector: 'app-register',
    imports: [
        ButtonComponent,
        FooterComponent,
        NavbarComponent
    ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  handleRegister() {
    const email = (document.getElementById('email') as HTMLInputElement).value.trim();
    const username = (document.getElementById('username') as HTMLInputElement).value.trim();
    const password = (document.getElementById('password') as HTMLInputElement).value.trim();
    const confirmPassword = (document.getElementById('confirmPassword') as HTMLInputElement).value.trim();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const spaceRegex = /\s/;

    // Check required
    if (!email || !username || !password || !confirmPassword) {
      alert('All fields are required');
      return;
    }

    // Check email format
    if (!emailRegex.test(email)) {
      alert('Invalid email format');
      return;
    }

    // Check for spaces
    if (spaceRegex.test(username)) {
      alert('Username must not contain spaces');
      return;
    }

    if (spaceRegex.test(password)) {
      alert('Password must not contain spaces');
      return;
    }

    // Check password match
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    // Optional: check for duplicate emails
    const existingUser = JSON.parse(localStorage.getItem('user') || '{}');
    if (existingUser.email === email) {
      alert('Email already registered');
      return;
    }

    const newUser = {
      username,
      displayName: username,
      email,
      role: 'student'
    };

    localStorage.setItem('user', JSON.stringify(newUser));
    this.authService.login();
    this.router.navigate(['/dashboard']);
  }
}
