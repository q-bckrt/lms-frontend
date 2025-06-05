import {Component, OnInit} from '@angular/core';
import { NavbarComponent } from "../../components/navbar/navbar.component";
import {ButtonComponent} from '../../components/button/button.component';
import {FooterComponent} from '../../components/footer/footer.component';
import {Router} from '@angular/router';
import {UserService} from '../../services/user-service.service';

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

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit() {
    // You can get the username from localStorage or auth service
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const username = user?.username;

    if (!username) {
      console.error('No username found');
      return;
    }

    this.userService.getUserProfile('jdoe').subscribe({
      next: (user) => {
        console.log('User response:', user);
        this.username = user.userName;           // note: userName, not username
        this.displayName = user.displayName;
        this.classes = user.classes;              // array of classes, if you want to use it
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
