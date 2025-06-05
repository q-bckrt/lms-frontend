import {inject, Injectable} from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {KeycloakServiceService} from './keycloak/keycloak-service.service';

@Injectable({ providedIn: 'root' })
export class AuthService {
  keyCloakService = inject(KeycloakServiceService)
  private isLoggedInSubject = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this.isLoggedInSubject.asObservable();

  login() {

    //Or
    // return this.keyCloakService.login(JSON.parse(<string>localStorage.getItem('user')));
    this.keyCloakService.login(JSON.parse(<string>localStorage.getItem('user'))).subscribe({
      next : () => {
        this.isLoggedInSubject.next(true);
      },
      error : (err) =>{
        console.log(err)
      }
    })
  }

  logout() {
    this.isLoggedInSubject.next(false);
  }

  isLoggedIn(): boolean {
    return this.isLoggedInSubject.value;
  }

  restoreLoginState() {
    const stored = localStorage.getItem('loggedIn');
    this.isLoggedInSubject.next(stored === 'true');
  }
}
