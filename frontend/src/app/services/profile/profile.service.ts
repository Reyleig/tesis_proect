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
export class ProfileService {
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


  getCoach(token): Observable<any> {
    return this.http.get<any>(environment.url+'/usuarios/getcoach/'+token, this.httpHeader)
        .pipe(
            catchError(this.handleError<any>('get coachs'))
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
