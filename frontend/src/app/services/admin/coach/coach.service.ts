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
export class CoachService {
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
  getAllCoach(estado:string): Observable<any> {
    
    return this.http.get<any>(environment.url+'/usuarios/getallcoach/'+estado, this.httpHeader)
  }
  resetPassword(data:any): Observable<any> {
    return this.http.post<any>(environment.url+'/usuarios/resetpassword',data, this.httpHeader)
  }

}