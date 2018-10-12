import { User } from '../models/user.model';
import { ApiError } from '../models/api-error.model';
import { BaseApiService } from './base-api.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService extends BaseApiService {
  private static readonly USER_API = `${BaseApiService.BASE_API}/users`;

  private users: Array<User> = [];
  private usersSubject: Subject<Array<User>> = new Subject();

  constructor(private http: HttpClient) {
    super();
  }

  create(user: User): Observable<User | ApiError> {
    return this.http.post<User>(UserService.USER_API, user, BaseApiService.defaultOptions)
      .pipe(
        map((user: User) => Object.assign(new User(), user)),
        catchError(this.handleError));
  }

}
