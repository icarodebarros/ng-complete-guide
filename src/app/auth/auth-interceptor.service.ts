import { HttpEvent, HttpHandler, HttpInterceptor, HttpParams, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { exhaustMap, map, take } from 'rxjs/operators';
import { AuthService } from './auth.service';
import * as fromApp from '../ngrx-store/app.reducer';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {

  constructor(private store: Store<fromApp.AppState>) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      return this.store.select('auth')
        .pipe(
          take(1),
          map(authState => authState!.user),
          exhaustMap(user => {
            if (!user || !user.token) return next.handle(req);

            const modifiedReq = req.clone({ params: new HttpParams().set('auth', user.token)})
            return next.handle(modifiedReq);
          })
        );
  }
}
