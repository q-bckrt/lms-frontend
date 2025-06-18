import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {classListModel} from '../models/classModel';
import {KeycloakServiceService} from './keycloak/keycloak-service.service';

@Injectable({
  providedIn: 'root'
})
export class ClassService {

  private apiUrl = 'http://localhost:8080/classes';

  constructor(
    private http: HttpClient,
    private keycloakService: KeycloakServiceService ) {}

  createClass(classTitle: string, coachUserName: string): Observable<any> {
    const headers = this.getHeaders()

    const body = {title: classTitle}

    const url = `${this.apiUrl}/${coachUserName}`
    console.log(url)

    return this.http.post(`${this.apiUrl}/${coachUserName}`,body, {headers})
  }

  linkCourseToClass(classId: number, courseId: number): Observable<any> {
    const headers = this.getHeaders()
    return this.http.put(`${this.apiUrl}/linkCourseClass/${classId}/${courseId}`,{},{headers})
  }

  findClassById(classId: number): Observable<classListModel> {
    return this.http.get<classListModel>(`${this.apiUrl}/${classId}`);
  }

  findAllClasses(): Observable<classListModel[]> {
    return this.http.get<classListModel[]>(`${this.apiUrl}`);
  }

  private getHeaders() {
    const token = this.keycloakService.getToken();
    if (!token) {
      throw new Error('User is not authenticated or session has expired');
    }

    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    })
  }

}
