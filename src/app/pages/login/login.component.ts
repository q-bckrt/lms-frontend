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

  ngOnInit() {
    const loginButton = document.getElementById('loginButton');
    loginButton?.addEventListener('click', () => {
      this.handleLogin();
    });
  }

  handleLogin() {
    const emailInput = (document.getElementById('email') as HTMLInputElement).value;
    const passwordInput = (document.getElementById('password') as HTMLInputElement).value;

    if (!emailInput || !passwordInput) {
      alert('Please enter both email and password')
      return
    }

    let role: 'student' | 'coach' = 'student';
    if (emailInput.includes('coach')) {
      role = 'coach'
    }

    const dummyUser = {
      username: emailInput.split('@')[0],
      displayName: role === 'student' ? 'Student User' : 'Coach User',
      email: emailInput,
      role: role
    }

    localStorage.setItem('user', JSON.stringify(dummyUser))
    this.authService.login()
    this.router.navigate(['/profile'])
  }
}
