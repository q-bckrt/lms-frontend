import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

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
  private baseUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) {
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
}
