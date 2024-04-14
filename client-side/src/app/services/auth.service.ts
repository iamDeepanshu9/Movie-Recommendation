import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';
import { AuthGuard } from './auth.guard';

@Injectable()
export class AuthService {
  private _authGuard: any;
  private isAuthenticated = false;
  private apiUrl = 'http://localhost:5200';
  constructor(private http: HttpClient, private injector: Injector) {}

  public LoginStatus$$ = new BehaviorSubject(false);

  get authGuard() {
    if (!this._authGuard) {
      this._authGuard = this.injector.get(AuthGuard);
    }
    return this._authGuard;
  }

  login(requestBody: any) {
    const url = `${this.apiUrl}/login`;

    return this.http
      .post(url, requestBody, {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
        observe: 'response',
      })
      .pipe(
        tap((response: any) => {
          // You can store the token here if the API responds with a token
          if (response.headers.get('Authorization')) {
            this.isAuthenticated = true;
            localStorage.setItem('isAuthenticated', 'true');
            localStorage.setItem(
              'token',
              response.headers.get('Authorization')
            );
          }
        })
      );
  }

  signUp(body: any) {
    const url = `${this.apiUrl}/signup`;
    return this.http.post(url, body, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    });
  }

  logout() {
    this.isAuthenticated = false;
    console.log('log out');
    localStorage.removeItem('isAuthenticated');
  }

  isLoggedIn(): boolean {
    // return this.isAuthenticated;
    this.LoginStatus$$.next(localStorage.getItem('isAuthenticated') === 'true');
    return localStorage.getItem('isAuthenticated') === 'true';
  }
}
