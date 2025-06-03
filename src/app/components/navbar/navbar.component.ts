import { Component } from '@angular/core';
import { ButtonComponent } from "../button/button.component";
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [ButtonComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  constructor(private router: Router) {}

  goToLogin(): void {
    console.log('Login button clicked');
    this.router.navigate(['/login']);
  }

  goToRegister(): void {
    console.log('Register button clicked');
    this.router.navigate(['/register']);
  }
}
