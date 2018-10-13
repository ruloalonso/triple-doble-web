import { ApiError } from '../models/api-error.model';
import { Injectable } from '@angular/core';
import { BaseApiService } from './base-api.service';
import { HttpClient } from '@angular/common/http';
import { League } from '../models/league.model';
import { Observable, Subject} from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { SessionService } from './session.service';

@Injectable({
  providedIn: 'root'
})
export class LeagueService extends BaseApiService {
  private static readonly LEAGUE_API = `${BaseApiService.BASE_API}/leagues`;

  leagues: Array<League> = [];
  leaguesSubject: Subject<Array<League>> = new Subject();

  constructor(
    private http: HttpClient,
    private sessionService: SessionService) {
    super();
  }

  list(): Observable<Array<League> | ApiError> {
    return this.http.get<Array<League>>(LeagueService.LEAGUE_API, BaseApiService.defaultOptions)
      .pipe(
        map((leagues: Array<League>) => {
          leagues = leagues.map(league => Object.assign(new League(), league));
          this.leagues = leagues;
          this.notifyLeaguesChanges();
          return leagues;
        }),
        catchError(this.handleError)
      );
  }

  get(id: string): Observable<League | ApiError> {
    return this.http.get<League>(`${LeagueService.LEAGUE_API}/${id}`, BaseApiService.defaultOptions)
      .pipe(
        map((league: League) => Object.assign(new League(), league)),
        catchError(this.handleError));
  }

  join(id: string): Observable<League | ApiError> {
    return this.http.post<League>(`${LeagueService.LEAGUE_API}/${id}/join`, BaseApiService.defaultOptions, { withCredentials: true })
      .pipe(
        map((league: League) => {
          console.log('joining league!!');
          console.log(league);
          this.leagues.map(league => {
            if (league._id === id) {
              league.users.push(this.sessionService.user.id);
            }
            return league;
          });
          this.notifyLeaguesChanges();
          return league;
        }),
        catchError(this.handleError)
      );
  }

  create(): Observable<League | ApiError> {
    return this.http.post<League>(LeagueService.LEAGUE_API, BaseApiService.defaultOptions, { withCredentials: true })
      .pipe(
        map((league: League) => {
          console.log('pushing league');
          console.log(league);
          this.leagues.push(league);
          this.notifyLeaguesChanges();
          return league;
        }),
        catchError(this.handleError)
      );
  }

  private notifyLeaguesChanges(): void {
    this.leaguesSubject.next(this.leagues);
  }

  onLeaguesChanges(): Observable<Array<League>> {
    console.log('onLeagueChanges(): Observable');
    return this.leaguesSubject.asObservable();
  }
}
