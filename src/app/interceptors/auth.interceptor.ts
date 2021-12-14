import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpHeaders
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService, private router: Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const authReq = request.clone({
      headers: new HttpHeaders().set('Authorization', `Bearer ${ localStorage.getItem('token') || '' }`)
    });

    return next.handle(authReq).pipe(
      tap(
        (event: any) => {
          if (event instanceof HttpResponse && this.router.url === '/auth'){
            this.router.navigate(['dashboard']).then();
          }
        },
        (err) => {
          if (err.status === 404) {
            this.router.navigate(['notfound']).then();
          }
          if (err.status === 403) {
            alert('Session is over, please authorize');
            localStorage.setItem('token', '');
            this.router.navigate(['auth']).then();
          }
        }
      )
    );
  }
}
