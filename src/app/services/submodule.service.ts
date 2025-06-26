import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {environment} from '../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class SubmoduleService {

  private baseUrl = environment.BASE_URL + '/submodules';

  constructor(
    private http: HttpClient
  ) { }

  // Later we should make sure it's added to a course immediately after creation
  createSubmodule(module: { title: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}`, module);
  }

  getAllSubmodules(): Observable<Array<{ id: number; title: string }>> {
    return this.http.get<Array<{ id: number; title: string }>>(`${this.baseUrl}`);
  }

  getSubmodule(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  updateSubmoduleTitle(submoduleId: number, submoduleInput: { title: string }): Observable<any> {
    return this.http.put(`${this.baseUrl}/${submoduleId}`, submoduleInput);
  }

  getProgressPercentageSubmodule(userName: string, submoduleId: number): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/${submoduleId}/submodule-progress/${userName}`);
  }

}
