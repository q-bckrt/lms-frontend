import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ModuleService {

  constructor(
    private http: HttpClient
  ) { }

  createModule(module: { title: string }): Observable<any> {


    return this.http.post('http://localhost:8080/modules', module);
  }

  getAllModules(): Observable<Array<{ id: number; title: string }>> {
    return this.http.get<Array<{ id: number; title: string }>>('http://localhost:8080/modules');
  }

  getOneModule(id: number): Observable<any> {
    return this.http.get(`http://localhost:8080/modules/${id}`);
  }

  updateModuleTitle(moduleId: number, moduleInput: { title: string }): Observable<any> {
    return this.http.put(`http://localhost:8080/modules/${moduleId}`, moduleInput);
  }

  addSubmoduleToModule(moduleId: number, submoduleId: number): Observable<any> {
    return this.http.put(`http://localhost:8080/modules/${moduleId}/submodules/${submoduleId}`, {});
  }

  getProgressPercentageModule(userName: string, moduleId: number): Observable<number> {
    return this.http.get<number>(`http://localhost:8080/modules/${moduleId}/module-progress/${userName}`);
  }
}
