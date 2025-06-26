import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ModuleService {

  private baseUrl = process.env['BASE_URL'] + '/modules';

  constructor(
    private http: HttpClient
  ) { }

  createModule(module: { title: string }): Observable<any> {


    return this.http.post(`${this.baseUrl}`, module);
  }

  getAllModules(): Observable<Array<{ id: number; title: string }>> {
    return this.http.get<Array<{ id: number; title: string }>>(`${this.baseUrl}`);
  }

  getOneModule(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  updateModuleTitle(moduleId: number, moduleInput: { title: string }): Observable<any> {
    return this.http.put(`${this.baseUrl}/${moduleId}`, moduleInput);
  }

  addSubmoduleToModule(moduleId: number, submoduleId: number): Observable<any> {
    return this.http.put(`${this.baseUrl}/${moduleId}/submodules/${submoduleId}`, {});
  }

  getProgressPercentageModule(userName: string, moduleId: number): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/${moduleId}/module-progress/${userName}`);
  }
}
