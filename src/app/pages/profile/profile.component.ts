import {Component, OnInit} from '@angular/core';
import { NavbarComponent } from "../../components/navbar/navbar.component";
import {ButtonComponent} from '../../components/button/button.component';
import {FooterComponent} from '../../components/footer/footer.component';
import {Router} from '@angular/router';
import {UserService} from '../../services/user-service.service';
import {KeycloakServiceService} from '../../services/keycloak/keycloak-service.service';

@Component({
  selector: 'app-profile',
  imports: [NavbarComponent, ButtonComponent, FooterComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {

  username: string = '';
  displayName: string = '';
  email: string = '';
  classes: any[] = [];

  constructor(
    private userService: UserService, 
    private router: Router,
    private keycloakService: KeycloakServiceService
  ) {}

  ngOnInit() {
    // Get the token from session storage
    const token = this.keycloakService.getToken();
    console.log(token);
    if (!token) {
      console.error('No token found');
      this.router.navigate(['/login']);
      return;
    }

    // Decode the JWT token to get user information
    const tokenPayload = JSON.parse(atob(token.split('.')[1]));
    const username = tokenPayload.preferred_username;

    if (!username) {
      console.error('No username found in token');
      return;
    }

    this.userService.getUserProfile(username).subscribe({
      next: (user) => {
        console.log('User response:', user);
        this.username = user.userName;
        this.displayName = user.displayName;
        this.email = user.email;
        this.classes = user.classes;
      },
      error: (err) => {
        console.error('Failed to load user profile:', err);
      }
    });
  }

  goToEdit() {
    this.router.navigate(['/edit']);
  }
}
