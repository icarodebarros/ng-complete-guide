import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AuthService } from '../auth.service';
import { User } from '../user.model';
import * as AuthActions from './auth.actions';

@Injectable()
export class AuthEffects {

    authSigup = createEffect(
        () => this.actions$.pipe(
            ofType(AuthActions.SIGNUP_START),
            switchMap((signupAction: AuthActions.SignupStart) => {
                return this.http.post<AuthResponseData>(this.getURL('signUp'), {
                    email: signupAction.payload.email,
                    password: signupAction.payload.password,
                    returnSecureToken: true
                  }).pipe(
                    tap(resData => this.authService.setLogoutTimer(+resData.expiresIn * 1000)),
                    map((resData: LoginResponseData) => {
                        return this.handleAuthentication(resData);
                    }),
                    catchError(errorResponse => {
                        return this.handleError(errorResponse);
                    }),
                )
            })
        )
    );
    
    authLogin = createEffect(
        () => this.actions$.pipe(
           ofType(AuthActions.LOGIN_START),
           switchMap((authData: AuthActions.LoginStart) => {
               return this.http.post<LoginResponseData>(this.getURL('signInWithPassword'), {
                   email: authData.payload.email,
                   password: authData.payload.password,
                   returnSecureToken: true
                 }).pipe(
                    tap(resData => this.authService.setLogoutTimer(+resData.expiresIn * 1000)),
                    map((resData: LoginResponseData) => {
                        return this.handleAuthentication(resData);
                    }),
                    catchError(errorResponse => {
                        return this.handleError(errorResponse);
                    }),
                 )
           }),
        )
    );

    authRedirect = createEffect(
        () => this.actions$.pipe(
            ofType(AuthActions.AUTHENTICATE_SUCCESS),
            tap((authSuccessAction: AuthActions.AuthenticateSuccess) => {
                if (authSuccessAction.payload.redirect) {
                    this.router.navigate(['/']);
                }
            })
        ),
        { dispatch: false }
    );

    autoLogin = createEffect(
        () => this.actions$.pipe(
            ofType(AuthActions.AUTO_LOGIN),
            map(() => {
                const userDataStr = localStorage.getItem('userData');
                if (userDataStr) {
                  const userData: {
                    email: string,
                    id: string,
                    _token: string,
                    _tokenExp: string
                  } = JSON.parse(userDataStr);
                  
                  const expDate = new Date(userData._tokenExp);
                  const loadedUser = new User(userData.email, userData.id, userData._token, expDate);
                  if (loadedUser.token) {
                    // this.loggedUser.next(loadedUser);
                    /* Duration remain = token exp time - current time */
                    const RemainingExpDuration = expDate.getTime() - new Date().getTime();
                    this.authService.setLogoutTimer(RemainingExpDuration);
                    return new AuthActions.AuthenticateSuccess({ 
                      email: loadedUser.email, 
                      userId: loadedUser.id, 
                      token: loadedUser.token, 
                      tokenExp: expDate,
                      redirect: false
                    });
                  }
                }
                return { type: 'Action not mapped' };
            })
        )
    );

    authLogout = createEffect(
        () => this.actions$.pipe(
            ofType(AuthActions.LOGOUT),
            tap(() => {
                this.authService.clearLogoutTimer();
                localStorage.removeItem('userData');
                this.router.navigate(['/auth']);
            })
        ),
        { dispatch: false }
    );

    private readonly apiKey = environment.apiKey;
    private readonly baseURL = 'https://identitytoolkit.googleapis.com/v1/accounts';

    constructor(private actions$: Actions,
        private http: HttpClient,
        private router: Router,
        private authService: AuthService) {}

    private getURL(functionality: 'signUp' | 'signInWithPassword') {
        return `${this.baseURL}:${functionality}?key=${this.apiKey}`;
    }

    private handleAuthentication(resData: AuthResponseData | LoginResponseData) {
        const expDate = new Date(new Date().getTime() + (+resData.expiresIn * 1000));
        const user = new User(resData.email, resData.localId, resData.idToken, expDate);
        localStorage.setItem('userData', JSON.stringify(user));
        return new AuthActions.AuthenticateSuccess({
             email: resData.email, 
             userId: resData.localId, 
             token: resData.idToken, 
             tokenExp: expDate,
             redirect: true
        });
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
        return of(new AuthActions.AuthenticateFail(errorMessage));
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
  
export interface LoginResponseData extends AuthResponseData {
registered?: boolean;
}