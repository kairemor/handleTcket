import { Injectable } from '@angular/core';
import { UserAuth } from '../modals/userAuth';
import { Observable, BehaviorSubject } from 'rxjs';
import { User } from '../modals/user';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { resolve, reject } from 'q';
import { error } from 'util';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  loginUrl = '  http://6430f35f.ngrok.io/login';
  token: string;
  userId: number;
  isAuth = false;

  constructor(private http: HttpClient, private router: Router) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  login(currentUser: User) {
    // tslint:disable-next-line: no-shadowed-variable
    return this.http.post<any>(this.loginUrl, currentUser)
      .pipe(
        map(user => {
          console.log(user);
          if (user && user.token) {
            console.log('Bonjour');
            localStorage.setItem('currentUser', JSON.stringify(user));
            this.currentUserSubject.next(user);
            this.isAuth = true;
          }
          return user;
        }));
  }

  public getToken(): string {
    if (localStorage.getItem('currentUser')) {
      return JSON.parse(localStorage.getItem('currentUser')).token;
    }
  }

  public getProfil(): string {
    if (localStorage.getItem('currentUser')) {
      return JSON.parse(localStorage.getItem('currentUser')).profile;
    }
  }

  public getUsername(): string {
    if (localStorage.getItem('currentUser')) {
      return JSON.parse(localStorage.getItem('currentUser')).username;
    }
  }
  logout() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }
}
