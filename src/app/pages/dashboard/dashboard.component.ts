import { Component } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { ButtonComponent } from '../../components/button/button.component';
import { NgFor, NgIf } from '@angular/common';
import { AuthService } from '../../services/auth-service.service';

@Component({
  selector: 'app-dashboard',
  imports: [NavbarComponent, FooterComponent, ButtonComponent, NgIf, NgFor],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  userRole: 'student' | 'coach' = 'student'; // default
  username = 'JDoe';

  constructor(private authService: AuthService) {
    const userData = JSON.parse(localStorage.getItem('user') || '{}')
    this.userRole = userData.role
    this.username = userData.username
  }

  goTo(path: string) {}
}
