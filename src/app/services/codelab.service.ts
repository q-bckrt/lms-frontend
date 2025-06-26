import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {progressPerUser} from '../models/progressPerUser';
import {environment} from '../../environment/environment';

export interface Codelab {
  id: number;
  title: string;
  details: string | null;
  parentSubmoduleId: number;
}

export interface CodelabComment {
  id: number;
  userDisplayName: string;
  codelabTitle: string;
  comment: string;
  timeStamp: string;
}

@Injectable({
  providedIn: 'root'
})
export class CodelabService {
  private baseUrl = environment.BASE_URL;

  constructor(private http: HttpClient) {
  }

  createCodelab(codelab: Codelab): Observable<Codelab> {
    return this.http.post<Codelab>(`${this.baseUrl}/codelabs`, codelab);
  }

  getAllCodelabs(): Observable<Codelab[]> {
    return this.http.get<Codelab[]>(`${this.baseUrl}/codelabs`);
  }

  getCodelab(id: number): Observable<Codelab> {
    return this.http.get<Codelab>(`${this.baseUrl}/codelabs/${id}`);
  }

  getCodelabComments(codelabId: number): Observable<CodelabComment[]> {
    return this.http.get<CodelabComment[]>(`${this.baseUrl}/codelabs/${codelabId}/comments`);
  }

  updateCodelab(id: number, data: Partial<Codelab>): Observable<Codelab> {
    return this.http.put<Codelab>(`${this.baseUrl}/codelabs/${id}`, data);
  }

  getAllProgressLevels(): Observable<string[]> {
    return this.http.get<string[]>(`${this.baseUrl}/codelabs/progress-levels`);
  }

  getCurrentProgressLevelForUser(codelabId: number, userName: string): Observable<progressPerUser> {
    return this.http.get<progressPerUser>(`${this.baseUrl}/codelabs/${codelabId}/progress-level/${userName}`);
  }
}
