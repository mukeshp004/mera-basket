import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NGXLogger } from 'ngx-logger';
import { AbstractApiService } from 'projects/common-lib/src/lib/shared/services/abstract-api.srvice';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { IUser } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService extends AbstractApiService<IUser> {
  private currentUserSubject: BehaviorSubject<IUser>;
  public currentUser: Observable<IUser>;

  constructor(
    protected override http: HttpClient,
    private logger: NGXLogger,
    private router: Router
  ) {
    super(http);

    this.relativeUrl = 'login';
    const userJsonString = localStorage.getItem('currentUser');
    const user = userJsonString !== null ? JSON.parse(userJsonString) : null;

    this.currentUserSubject = new BehaviorSubject<IUser>(user);
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): IUser {
    return this.currentUserSubject.value;
  }

  /**
   * This method makes login call
   * If success the, stores users in local storage and redirects to dashboard page
   *
   * @param params Login params
   * @returns Observable<IUser>
   */
  login(params: any): Observable<IUser> {
    return this.post(params).pipe(
      map((user) => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUserSubject.next(user);
        return user;
      })
    );
  }

  /**
   * Logout from the app and redirects to login page
   */
  logout() {
    /**
     * This will remove the data from local storage
     */
    localStorage.removeItem('currentUser');

    this.router.navigate(['/login']);
  }
}
