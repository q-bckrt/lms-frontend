import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {environment} from '../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  private baseUrl = environment.BASE_URL + '/courses';

  constructor(
    private http: HttpClient,
  ) {}

  createCourse(course: { title: string}): Observable<any> {

    return this.http.post(`${this.baseUrl}`, course);
  }

  getAllCourses(): Observable<Array<{ id: number; title: string }>> {

    return this.http.get<Array<{ id: number; title: string }>>(`${this.baseUrl}`);
  }

  getOneCourse(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  addModuleToCourse(courseId: number, moduleId: number): Observable<any> {
    console.log('Module adding to course', courseId, moduleId);
    return this.http.put(`${this.baseUrl}/${courseId}/modules/${moduleId}`, {});
  }

  updateCourseTitle(courseId: number, courseInput: { title: string }): Observable<any> {
    return this.http.put(`${this.baseUrl}/${courseId}`, courseInput);
  }

  getProgressPercentageCourse(userName: string, courseId: number): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/${courseId}/course-progress/${userName}`);
  }
}
