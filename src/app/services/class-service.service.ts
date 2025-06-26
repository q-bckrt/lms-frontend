import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {classModel} from '../models/classModel';
import {environment} from '../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class ClassService {

  private apiUrl = environment.BASE_URL + '/classes';

  constructor(
    private http: HttpClient) {}

  createClass(classTitle: string, coachUserName: string): Observable<any> {
    const body = {title: classTitle}
    return this.http.post(`${this.apiUrl}/${coachUserName}`,body)
  }

  linkCourseToClass(classId: number, courseId: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/linkCourseClass/${classId}/${courseId}`,{})
  }

  findClassById(classId: number): Observable<classModel> {
    return this.http.get<classModel>(`${this.apiUrl}/${classId}`);
  }

  findAllClasses(): Observable<classModel[]> {
    return this.http.get<classModel[]>(`${this.apiUrl}`);
  }

  findClassesPerUser(username: string): Observable<classModel[]> {
    return this.http.get<classModel[]>(`${this.apiUrl}/get-classes/${username}`);
  }
}
