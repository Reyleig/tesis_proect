import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { catchError } from 'rxjs/operators';
import { UserState } from 'src/app/login/store/user.state';
import { Select } from '@ngxs/store';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  @Select(UserState) user$!: Observable<any>;
  urlBase = environment.url;
  token: string='';
  httpHeader ; 

  constructor(private http: HttpClient) {
   this.user$
    .subscribe((data: any) => {
      if (data.token) {
        this.token = data.token;
        return this.token;
      }
    })
    .unsubscribe();
    this.httpHeader  = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.token
      }),
    };
  }
  
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