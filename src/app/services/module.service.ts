import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { KeycloakServiceService} from './keycloak/keycloak-service.service';


@Injectable({
  providedIn: 'root'
})
export class ModuleService {

  constructor(
    private http: HttpClient,
    private keycloakService: KeycloakServiceService
  ) { }

  // Later we should make sure it's added to a course immediately after creation
  createModule(module: { title: string }): Observable<any> {

    console.log("Creating module with title:", module.title);

    return this.http.post('http://localhost:8080/modules', module);
  }
}
