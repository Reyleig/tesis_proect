import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class InicioService {

  urlBase= environment.url
  httpHeader = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(  private http: HttpClient,) { }

  
  cambiarPassword(cambiarPassword:any): Observable<any> {
    return this.http.post<any>(environment.url+'/usuarios/updatepassword',cambiarPassword, this.httpHeader)
      .pipe(
        catchError(this.handleError<any>('cambiar password'))
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
  
}