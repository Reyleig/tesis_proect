import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class TasksService {

  urlBase= environment.url
  httpHeader = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(  private http: HttpClient,) { }
  
  findTasks(token:string ): Observable<any> {
    return this.http.get<any>(environment.url+'/task/'+token, this.httpHeader)
      .pipe(
        catchError(this.handleError<any>('get tasks'))
      );
  }

  createTask(data ): Observable<any> {
    return this.http.post<any>(environment.url+'/task/createTask',data, this.httpHeader)
      .pipe(
        catchError(this.handleError<any>('create tasks'))
      );
  }

  updateTask(data): Observable<any> {
    return this.http.patch<any>(environment.url+'/task',data, this.httpHeader)
      .pipe(
        catchError(this.handleError<any>('update tasks'))
      );
  }
  
  deleteTask(token:string,id:number): Observable<any> {
    return this.http.delete<any>(environment.url+'/task/'+token+'/'+id, this.httpHeader)
      .pipe(
        catchError(this.handleError<any>('delete tasks'))
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