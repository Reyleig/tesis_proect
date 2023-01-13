import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class StatsService {

  urlBase= environment.url
  httpHeader = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(  private http: HttpClient,) { }

  public findTimesByFilters(id_deportista,id_estilos,fecha_registro  ): Observable<any> {
    return this.http.get<any>(environment.url+'/times/getTimes/'+id_deportista+'/'+id_estilos+'/'+fecha_registro, this.httpHeader)
      .pipe(
        catchError(this.handleError<any>('get times'))
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