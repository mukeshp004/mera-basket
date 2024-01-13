import {
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class JwtInterceptorService implements HttpInterceptor {
  constructor(private auth: AuthService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<any> {
    // add authorization header with jwt token if available
    let currentUser = this.auth.currentUserValue;
    if (currentUser && currentUser.token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${currentUser.token}`,
          // 'Content-Type': 'multipart/form-data',
        },
      });
    }

    return next.handle(request);
  }
}
