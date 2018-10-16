import { Team } from './../models/team.model';
import { ApiError } from '../models/api-error.model';
import { BaseApiService } from './base-api.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { SessionService } from './session.service';

@Injectable({
  providedIn: 'root'
})
export class TeamService extends BaseApiService {
  private static readonly LEAGUE_API = `${BaseApiService.BASE_API}/leagues`;
  private static readonly TEAM_API = `${BaseApiService.BASE_API}/teams`;

  team: Team = new Team();
  teamSubject: Subject<Team> = new Subject();

  teams: Array<Team> = [];

  constructor(
    private http: HttpClient,
    private sessionService: SessionService
  ) {
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

  // get(id: string): Observable<Team | ApiError> {
  //   return this.http.get<Team>(`${TeamService.TEAM_API}/${id}`, BaseApiService.defaultOptions)
  //     .pipe(
  //       map((team: Team) => {
  //         this.league = league;
  //         this.notifyLeagueChanges();
  //         return Object.assign(new League(), league);
  //       }),
  //       catchError(this.handleError)
  //     );
  // }

  list(leagueId: String): Observable<Array<Team> | ApiError> {
    return this.http.get<Array<Team>>(`${TeamService.LEAGUE_API}/${leagueId}/teams`, BaseApiService.defaultOptions)
      .pipe(
        map((teams: Array<Team>) => {
          this.teams = teams;
          //console.log(this.teams);
          this.team = teams.filter(team => team.owner === this.sessionService.user.id)[0];
          this.notifyTeamChanges();
          //console.log(this.team);
          return teams;
        }),
        catchError(this.handleError)
      );
  }

  private notifyTeamChanges(): void {
    this.teamSubject.next(this.team);
  }

  onTeamChanges(): Observable<Team> {
    return this.teamSubject.asObservable();
  }

}
