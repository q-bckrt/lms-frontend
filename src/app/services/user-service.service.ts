import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {map, Observable} from 'rxjs';
import {classOverviewModel} from '../models/classOverviewModel';
import {progressUserListModel} from '../models/progressUserListModel';
import {overviewProgressCoach} from '../models/overviewProgressCoach';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = process.env['BASE_URL'] + '/users';

  constructor(private http: HttpClient) {}

  getUserProfile(username: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${username}`);
  }

  updateUserProfile(username: string, updatedData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${username}/edit`, updatedData);
  }

  getClassOverviews(userName: string): Observable<classOverviewModel[]> {
    return this.http.get<any[]>(`${this.apiUrl}/${userName}/class-overview`).pipe(
      map(responseList =>
        responseList.map(response => {
          const coaches = response.users
            .filter((user: any) => user.role === 'COACH')
            .map((user: any) => ({
              userName: user.userName,
              displayName: user.displayName,
              role: user.role
            }));

          const students = response.users
            .filter((user: any) => user.role === 'STUDENT')
            .map((user: any) => ({
              userName: user.userName,
              displayName: user.displayName,
              role: user.role
            }));

          return {
            id: response.id,
            title: response.title,
            courseId: response.course?.id ?? null,
            courseTitle: response.course?.title ?? null,
            coaches,
            students
          };
        })
      )
    );
  }


  assignClassToUser(username: string, classId: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/${username}/edit/class?classId=${classId}`, {});
  }


  getProgressCodelabsPerUser(username: string): Observable<progressUserListModel> {
    return this.http.get<progressUserListModel>(`${this.apiUrl}/${username}/codelabs-progress-overview`);
  }

  getOverviewAllStudentsForCoach(username: string): Observable<overviewProgressCoach> {
    return this.http.get<overviewProgressCoach>(`${this.apiUrl}/${username}/all-students-overview`)
  }

  setCurrentProgressLevel(userName: string, codelabId: number, progressLevel: string): Observable<boolean> {
    const params = new HttpParams().set('progressLevel', progressLevel);
    console.log(params)

    return this.http.put<boolean>(`${this.apiUrl}/${userName}/edit/codelab/${codelabId}`,{},{params})

  }


}
