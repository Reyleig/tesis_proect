import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class SwimmerService {
  urlBase = environment.url;
  httpHeader = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      //  'Authorization': 'Bearer '+
    }),
  };

  constructor(private http: HttpClient) {}

  getSwimmers(token: string): Observable<any> {
    return this.http
      .get<any>(environment.url + '/usuarios/getswimmers/'+token, this.httpHeader)
      .pipe(catchError(this.handleError<any>('Add Student')));
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
