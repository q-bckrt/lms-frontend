import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private isLoggedInSubject = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this.isLoggedInSubject.asObservable();

  login(user: any) {
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('loggedIn', 'true');
    this.isLoggedInSubject.next(true);
  }

  logout() {
    localStorage.removeItem('user');
    localStorage.removeItem('loggedIn');
    this.isLoggedInSubject.next(false);
  }

  isLoggedIn(): boolean {
    return this.isLoggedInSubject.value;
  }

  restoreLoginState() {
    const stored = localStorage.getItem('loggedIn');
    this.isLoggedInSubject.next(stored === 'true');
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user') || '{}');
  }

  getUserRole(): 'student' | 'coach' {
    return this.getCurrentUser().role || 'student';
  }

  getUserName(): string {
    return this.getCurrentUser().username || '';
  }

  getDisplayName(): string {
    return this.getCurrentUser().displayName || '';
  }
}
