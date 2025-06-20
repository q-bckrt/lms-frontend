import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { NavbarComponent } from "../../components/navbar/navbar.component";
import { ButtonComponent } from '../../components/button/button.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { UserService } from '../../services/user-service.service';
import { KeycloakServiceService } from '../../services/keycloak/keycloak-service.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    FormsModule,
    NavbarComponent,
    ButtonComponent,
    FooterComponent
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  username: string = '';
  displayName: string = '';
  email: string = '';
  classes: any[] = [];

  availableClasses: any[] = [];
  selectedClassId: number | null = null;

  constructor(
    private userService: UserService,
    private router: Router,
    private keycloakService: KeycloakServiceService
  ) {}

  ngOnInit() {
    const token = this.keycloakService.getToken();
    if (!token) {
      console.error('No token found');
      this.router.navigate(['/login']);
      return;
    }

    const tokenPayload = JSON.parse(atob(token.split('.')[1]));
    const username = tokenPayload.preferred_username;
    if (!username) {
      console.error('No username found in token');
      return;
    }

    this.username = username;

    this.userService.getUserProfile(username).subscribe({
      next: (user) => {
        this.username = user.userName;
        this.displayName = user.displayName;
        this.email = user.email;
        this.classes = user.classes;

        this.selectedClassId = user.classes?.[0]?.id || null;
      },
      error: (err) => {
        console.error('Failed to load user profile:', err);
      }
    });

    this.userService.getAllClasses().subscribe({
      next: (classes) => {
        console.log('Fetched classes:', classes);
        this.availableClasses = classes;
      },
      error: (err) => {
        console.error('Failed to load class list:', err);
      }
    });
  }

  onSaveClassAssignment() {
    if (this.selectedClassId !== null) {
      this.userService.assignClassToUser(this.username, this.selectedClassId).subscribe({
        next: (res) => {
          console.log('Class assigned:', res);
          this.classes = res.classes;
        },
        error: (err) => {
          console.error('Failed to assign class:', err);
        }
      });
    }
  }

  goToEdit() {
    this.router.navigate(['/edit']);
  }
}
