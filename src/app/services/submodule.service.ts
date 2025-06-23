import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { KeycloakServiceService} from './keycloak/keycloak-service.service';

@Injectable({
  providedIn: 'root'
})
export class SubmoduleService {

  constructor(
    private http: HttpClient,
    private keycloakService: KeycloakServiceService
  ) { }

  // Later we should make sure it's added to a course immediately after creation
  createModule(module: { title: string }): Observable<any> {
    return this.http.post('http://localhost:8080/submodules', module);
  }

  getAllSubmodules(): Observable<Array<{ id: number; title: string }>> {
    return this.http.get<Array<{ id: number; title: string }>>('http://localhost:8080/submodules');
  }

}
