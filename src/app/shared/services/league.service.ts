import { ApiError } from '../models/api-error.model';
import { Injectable } from '@angular/core';
import { BaseApiService } from './base-api.service';
import { HttpClient } from '@angular/common/http';
import { League } from '../models/league.model';
import { Observable,} from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LeagueService extends BaseApiService {
  private static readonly SESSIONS_API = `${BaseApiService.BASE_API}/leagues`;

  leagues: Array<League> = [];

  constructor(private http: HttpClient) { 
    super();
  }

  list(): Observable<Array<League> | ApiError> {
    return this.http.get<Array<League>>(LeagueService.SESSIONS_API, BaseApiService.defaultOptions)
      .pipe(
        map((leagues: Array<League>) => {
          return leagues;
        }),
        catchError(this.handleError)
      );
  }

  join(id: string): Observable<Array<League> | ApiError> {
    return this.http.post<Array<League>>(`${LeagueService.SESSIONS_API}/${id}`, BaseApiService.defaultOptions)
      .pipe(
        map((leagues: Array<League>) => {
          return leagues;
        }),
        catchError(this.handleError)
      );
  }
}
