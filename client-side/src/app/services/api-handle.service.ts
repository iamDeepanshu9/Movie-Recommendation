import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BehaviorSubject, combineLatest, map, mapTo, Observable, of} from 'rxjs';


const GetAuthTokens = () => {
  return {
    "content-type": "application/json; charset=utf-8",
  }
}

@Injectable({
  providedIn: 'root',
})
export class ApiHandleService {
  public data$$ = new BehaviorSubject(null);
  constructor(private http: HttpClient) {
  }

  login$(loginBody: any): Observable<any> {
    let reqHeader = new HttpHeaders({'Content-Type': 'application/json'})
    return this.http.post<any>('https://localhost:7272/api/Account/login',loginBody,{headers:reqHeader}) as Observable<any>;
  }

  signUp$(signUpRequestBody: any): Observable<any> {
    let reqHeader = new HttpHeaders({'Content-Type': 'application/json'})
    return this.http.post<any>('https://localhost:7272/api/Account/RegisterUser', signUpRequestBody,{headers:reqHeader}) as Observable<any>;
  }


  setUser$(data: any){
    this.data$$.next(data);
  }

}
