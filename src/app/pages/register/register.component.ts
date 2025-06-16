import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { ButtonComponent } from '../../components/button/button.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { KeycloakServiceService } from '../../services/keycloak/keycloak-service.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  imports: [NavbarComponent, ButtonComponent, FooterComponent, FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  formData = {
    userName: '',
    email: '',
    firstName: '',
    lastName: '',
    password: '',
    confirmPassword: ''
  };

  constructor(
    private keycloakService: KeycloakServiceService,
    private router: Router
  ) {}

  handleRegister() {
    // Validate form data
    if (!this.validateForm()) {
      return;
    }

    const registerData = {
      userName: this.formData.userName,
      firstName: this.formData.firstName,
      lastName: this.formData.lastName,
      email: this.formData.email,
      password: this.formData.password
    };

    this.keycloakService.register(registerData).subscribe({
      next: () => {
        alert('Registration successful! Please login.');
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error('Registration failed:', err);
        alert('Registration failed. Please try again.');
      }
    });
  }

  private validateForm(): boolean {
    // Check if all fields are filled
    if (!this.formData.userName || !this.formData.email || !this.formData.firstName || 
        !this.formData.lastName || !this.formData.password || !this.formData.confirmPassword) {
      alert('Please fill in all fields');
      return false;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.formData.email)) {
      alert('Please enter a valid email address');
      return false;
    }

    // Validate password match
    if (this.formData.password !== this.formData.confirmPassword) {
      alert('Passwords do not match');
      return false;
    }

    // Validate password length
    if (this.formData.password.length < 6) {
      alert('Password must be at least 6 characters long');
      return false;
    }

    // Validate username format (no spaces)
    if (/\s/.test(this.formData.userName)) {
      alert('Username cannot contain spaces');
      return false;
    }

    return true;
  }
}
