import { Component } from '@angular/core';
import { ButtonComponent } from "../button/button.component";
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-navbar',
  imports: [ButtonComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  pageTitle = ''
  constructor(private router: Router) {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        const url = this.router.url
        this.pageTitle = this.getTitleFromUrl(url)
      })
  }

   getTitleFromUrl(url: string): string {
    if (url === '/login') return 'Login';
    if (url === '/register') return 'Register';
    if (url === '/') return 'Home';
    return 'My App';
  }

  goToLogin(): void {
    console.log('Login button clicked');
    this.router.navigate(['/login']);
  }

  goToRegister(): void {
    console.log('Register button clicked');
    this.router.navigate(['/register']);
  }

  goToProfile(): void {
    console.log('Profile button clicked')
    this.router.navigate(['/profile'])
  }
}
