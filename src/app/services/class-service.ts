import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {classListModel} from '../models/classModel';
import {KeycloakServiceService} from './keycloak/keycloak-service.service';

@Injectable({
  providedIn: 'root'
})
export class ClassService {

  private apiUrl = 'http://localhost:8080/classes';

  constructor(
    private http: HttpClient) {}

  createClass(classTitle: string, coachUserName: string): Observable<any> {
    const body = {title: classTitle}
    return this.http.post(`${this.apiUrl}/${coachUserName}`,body)
  }

  getClassOverView(userName: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${userName}/class-overview`)
  }

  linkCourseToClass(classId: number, courseId: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/linkCourseClass/${classId}/${courseId}`,{})
  }

  findClassById(classId: number): Observable<classListModel> {
    return this.http.get<classListModel>(`${this.apiUrl}/${classId}`);
  }

  findAllClasses(): Observable<classListModel[]> {
    return this.http.get<classListModel[]>(`${this.apiUrl}`);
  }
}
