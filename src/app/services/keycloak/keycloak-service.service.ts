import {inject, Injectable} from '@angular/core';
import {HttpKeycloakService} from './http-keycloak.service';
import {KeycloakTokenResponse} from './keycloak-token-response';
import {Observable, tap} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class KeycloakServiceService {
  httpKeyCloakService = inject(HttpKeycloakService)
  readonly TOKEN_KEY_NAME : string = 'TOKEN_KEY_NAME'
  private setToken(accessToken:string):void{
    sessionStorage.setItem(this.TOKEN_KEY_NAME,accessToken)
  }

  login(loginData:any):Observable<KeycloakTokenResponse>{
    return this.httpKeyCloakService.login(loginData).pipe(
      tap(response => this.setToken(response.access_token))
    );
  }

  register(registerData: any): Observable<any> {
    return this.httpKeyCloakService.register(registerData);
  }

  getToken(){
    return sessionStorage.getItem(this.TOKEN_KEY_NAME);
  }

  getTokenUserName(): string{
    const token = sessionStorage.getItem(this.TOKEN_KEY_NAME)
    if (!token) {
      throw new Error('User not logged in');
    }

    const tokenPayload = JSON.parse(atob(token.split('.')[1]));
    return tokenPayload.preferred_username
  }
}
