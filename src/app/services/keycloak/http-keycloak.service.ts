import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {KeycloakTokenResponse} from './keycloak-token-response';

@Injectable({
  providedIn: 'root'
})
export class HttpKeycloakService {

  httpClient = inject(HttpClient)
  private httpOptions = {
    headers: new HttpHeaders({'Content-Type':'application/x-www-form-urlencoded'})
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

}
