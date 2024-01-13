import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { NotificationService } from '../services/notification.service';

@Injectable({
  providedIn: 'root',
})
export class ErrorInterceptorService implements HttpInterceptor {
  constructor(
    private auth: AuthService,
    private notification: NotificationService
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<any> {
    return next.handle(request).pipe(
      catchError((err) => {
        const error = err.error || err.statusText;

        if (err.status === 401) {
          // auto logout if 401 response returned from api
          this.auth.logout();
          location.reload();
        }

        if ([404, 503].includes(err.status)) {
          this.notification.error(`${err.statusText} - ${err.status}`, err.message);
        }
        return throwError(() => error);
      })
    );
  }
}
