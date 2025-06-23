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


    return this.http.post('http://localhost:8080/modules', module);
  }

  getAllModules(): Observable<Array<{ id: number; title: string }>> {
    return this.http.get<Array<{ id: number; title: string }>>('http://localhost:8080/modules');
  }

  getOneModule(id: number): Observable<any> {
    return this.http.get(`http://localhost:8080/modules/${id}`);
  }

  updateModuleTitle(moduleId: number, moduleInput: { title: string }): Observable<any> {
    return this.http.put(`http://localhost:8080/modules/${moduleId}`, moduleInput);
  }
}
