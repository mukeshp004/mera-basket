import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NGXLogger } from 'ngx-logger';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { IUser, User } from '../models/user';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  private currentUserSubject: BehaviorSubject<IUser>;
  public currentUser: Observable<IUser>;

  constructor(private logger: NGXLogger, private router: Router, private api: ApiService) { 
    const userJsonString = localStorage.getItem('currentUser');
    const user = userJsonString !== null ? JSON.parse(userJsonString): null;

    this.currentUserSubject = new BehaviorSubject<IUser>(user);
        this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): IUser {
    return this.currentUserSubject.value;
}

  login(params: any): Observable<any>  {
    return this.api.post(`login`, params)
            .pipe(map(response => {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                
                // localStorage.setItem('token', JSON.stringify(response.token));
                localStorage.setItem('currentUser', JSON.stringify(response.user));
                this.currentUserSubject.next(response.user);
                return response;
            }));
  }


  logout() {
    /**
     * This wilm remove the data from local storage
     */
    localStorage.removeItem('currentUser');
    
    this.router.navigate(['/login']);
  }
}
