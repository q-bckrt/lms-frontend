import {Component, inject, OnInit} from '@angular/core';
import {UserService} from '../../services/user-service.service';
import {KeycloakServiceService} from '../../services/keycloak/keycloak-service.service';
import {ActivatedRoute} from '@angular/router';
import {FooterComponent} from '../../components/footer/footer.component';
import {NavbarComponent} from '../../components/navbar/navbar.component';
import {NgForOf, NgIf} from '@angular/common';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-view-profile',
  imports: [
    FooterComponent,
    NavbarComponent,
    NgForOf,
    FormsModule,
    NgIf
  ],
  templateUrl: './view-profile.component.html',
  styleUrl: './view-profile.component.css'
})
export class ViewProfileComponent implements OnInit{
  userService = inject(UserService);
  private route = inject(ActivatedRoute);

  username: string = '';
  displayName: string = '';
  email: string = '';
  classes: any[] = [];


  keycloakService = inject(KeycloakServiceService)

  ngOnInit() {
    const userName = this.route.snapshot.paramMap.get('userName')!;
    this.userService.getUserProfile(userName).subscribe({
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


}
