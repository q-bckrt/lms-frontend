import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { KeycloakServiceService} from './keycloak/keycloak-service.service';


@Injectable({
  providedIn: 'root'
})
export class CourseService {

  constructor(
    private http: HttpClient,
    private keycloakService: KeycloakServiceService
  ) {}

  createCourse(course: { title: string}): Observable<any> {
    console.log("ENTERING COURSE CREATION SERVICE");
    const token = this.keycloakService.getToken();
    console.log("TOKEN: ", token);
    if (!token) {
      throw new Error('User is not authenticated or session has expired');
    }

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    return this.http.post('http://localhost:8080/courses', course, { headers });
  }
}
