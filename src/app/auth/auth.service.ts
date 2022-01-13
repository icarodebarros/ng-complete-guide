import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  loggedUser = new BehaviorSubject<User | null>(null);

  private readonly apiKey = environment.apiKey;
  private readonly baseURL = 'https://identitytoolkit.googleapis.com/v1/accounts';

  constructor(private http: HttpClient,
    private router: Router) { }

  private getURL(functionality: 'signUp' | 'signInWithPassword') {
    return `${this.baseURL}:${functionality}?key=${this.apiKey}`;
  }

  signup(email: string, password: string): Observable<AuthResponseData> {
    return this.http.post<AuthResponseData>(this.getURL('signUp'), {
      email,
      password,
      returnSecureToken: true
    }).pipe(
      catchError(this.handleError),
      tap(resData => this.handleAuthentication(resData))
    );
  }

  login(email: string, password: string): Observable<LoginResponseData> {
    return this.http.post<LoginResponseData>(this.getURL('signInWithPassword'), {
      email,
      password,
      returnSecureToken: true
    }).pipe(
      catchError(this.handleError),
      tap(resData => this.handleAuthentication(resData))
    );
  }

  logout() {
    this.loggedUser.next(null);
    this.router.navigate(['/auth']);
  }

  private handleAuthentication(resData: AuthResponseData | LoginResponseData) {
    const expDate = new Date(new Date().getTime() + (+resData.expiresIn * 1000));
    const user = new User(resData.email, resData.localId, resData.idToken, expDate);

    this.loggedUser.next(user);
  }

  private handleError(errorResponse: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    if (errorResponse.error && errorResponse.error.error) {
      switch (errorResponse.error.error.message) {
        case 'EMAIL_EXISTS': 
          errorMessage = 'This email exists already'; break;
        case 'EMAIL_NOT_FOUND': 
        case 'INVALID_PASSWORD': 
          errorMessage = 'Please check your username or password'; break;
      }
    }
    return throwError(errorMessage);
  }

}

export interface AuthResponseData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  kind: string;
}

interface LoginResponseData extends AuthResponseData {
  registered?: boolean;
}