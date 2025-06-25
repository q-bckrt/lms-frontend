import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubmoduleService {

  constructor(
    private http: HttpClient
  ) { }

  // Later we should make sure it's added to a course immediately after creation
  createSubmodule(module: { title: string }): Observable<any> {
    return this.http.post('http://localhost:8080/submodules', module);
  }

  getAllSubmodules(): Observable<Array<{ id: number; title: string }>> {
    return this.http.get<Array<{ id: number; title: string }>>('http://localhost:8080/submodules');
  }

  getSubmodule(id: number): Observable<any> {
    return this.http.get(`http://localhost:8080/submodules/${id}`);
  }

  updateSubmoduleTitle(submoduleId: number, submoduleInput: { title: string }): Observable<any> {
    return this.http.put(`http://localhost:8080/submodules/${submoduleId}`, submoduleInput);
  }

}
