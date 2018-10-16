import { Team } from './../models/team.model';
import { ApiError } from '../models/api-error.model';
import { BaseApiService } from './base-api.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TeamService extends BaseApiService {
  private static readonly LEAGUE_API = `${BaseApiService.BASE_API}/leagues`;

  private teams: Array<Team> = [];

  constructor(private http: HttpClient) {
    super();
  }

  create(leagueId: String): Observable<Team | ApiError> {
    return this.http.post<Team>(`${TeamService.LEAGUE_API}/${leagueId}/team`, BaseApiService.defaultOptions, { withCredentials: true })
      .pipe(
        map((team: Team) => {
          this.teams.push(team);
          return team;
        }),
        catchError(this.handleError)
      );
  }

}
