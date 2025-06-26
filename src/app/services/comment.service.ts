import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import {environment} from '../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private baseUrl = environment.BASE_URL;


  constructor(private http: HttpClient) { }

  postComment(codelabId: string, username: string, comment: string): Observable<any> {
    const url = `${this.baseUrl}/codelabs/${codelabId}/comments/${username}`;
    return this.http.post(url, { comment });
  }
}
