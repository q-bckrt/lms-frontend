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
  ) {}

  createCourse(course: { title: string}): Observable<any> {

    return this.http.post('http://localhost:8080/courses', course);
  }

  getAllCourses(): Observable<Array<{ id: number; title: string }>> {

    return this.http.get<Array<{ id: number; title: string }>>('http://localhost:8080/courses');
  }

  getOneCourse(id: number): Observable<any> {
    return this.http.get(`http://localhost:8080/courses/${id}`);
  }

  addModuleToCourse(courseId: number, moduleId: number): Observable<any> {
    return this.http.put(`http://localhost:8080/courses/${courseId}/modules/${moduleId}`, {});
  }

  updateCourseTitle(courseId: number, courseInput: { title: string }): Observable<any> {
    return this.http.put(`http://localhost:8080/courses/${courseId}`, courseInput);
  }
}
