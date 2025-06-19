import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user-service.service';
import { KeycloakServiceService } from '../../services/keycloak/keycloak-service.service';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { ButtonComponent } from '../../components/button/button.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [NavbarComponent, ButtonComponent, FooterComponent, FormsModule],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css'
})
export class EditComponent implements OnInit {
  username = '';
  formData = {
    displayName: '',
    password: '',
    confirmPassword: ''
  };

  constructor(
    private userService: UserService,
    private keycloakService: KeycloakServiceService,
    private router: Router
  ) {}

  ngOnInit() {
    const token = this.keycloakService.getToken();
    if (token) {
      const tokenPayload = JSON.parse(atob(token.split('.')[1]));
      this.username = tokenPayload.preferred_username;
      this.loadUserData(this.username);
    }
  }

  loadUserData(username: string) {
    this.userService.getUserProfile(username).subscribe({
      next: (user) => {
        this.formData.displayName = user.displayName;
      },
      error: (err) => {
        console.error('Failed to load user data:', err);
      }
    });
  }

  handleSave() {
    if (this.formData.password && this.formData.password !== this.formData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    const updatePayload = {
      displayName: this.formData.displayName,
      password: this.formData.password
    };

    this.userService.updateUserProfile(this.username, updatePayload).subscribe({
      next: () => {
        alert('Profile updated successfully!');
        this.router.navigate(['/profile']);
      },
      error: (err) => {
        console.error('Failed to update profile:', err);
        alert('Failed to update profile.');
      }
    });
  }
}
