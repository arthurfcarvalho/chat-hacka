import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private http: HttpClient) { }

  test(data: any): Observable<any> {
    return this.http.post('http://localhost:5000/analyze', data);
  }
}
