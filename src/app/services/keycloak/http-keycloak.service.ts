import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {KeycloakTokenResponse} from './keycloak-token-response';
import {environment} from '../../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpKeycloakService {

  httpClient = inject(HttpClient)
  private httpOptions = {
    headers: new HttpHeaders({'Content-Type':'application/x-www-form-urlencoded'})
  };

  private jsonHttpOptions = {
    headers: new HttpHeaders({'Content-Type':'application/json'})
  };

  login(loginData:any){
    const body = new URLSearchParams();
    body.set('username',loginData.username);
    body.set('password',loginData.password);
    body.set('client_id','lms');
    body.set('client_secret','pkuA7PVvcC6QlAIsSOu8SRMLBmEZz49N')
    body.set('grant_type','password');
    return this.httpClient.post<KeycloakTokenResponse>("https://keycloak.switchfully.com/realms/java-2025-03/protocol/openid-connect/token",body,this.httpOptions);
  }

  register(registerData: any) {
    return this.httpClient.post(`${environment.BASE_URL}/users`, registerData, this.jsonHttpOptions);
  }
}
