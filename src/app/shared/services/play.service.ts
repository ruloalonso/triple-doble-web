import { Injectable } from '@angular/core';
import { BaseApiService } from './base-api.service';
import { Player } from '../models/player.model';
import { Play } from '../models/play.model';
import { Observable } from 'rxjs';
import { ApiError } from '../models/api-error.model';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { Team } from '../models/team.model';

@Injectable({
  providedIn: 'root'
})
export class PlayService extends BaseApiService {
  private static readonly PLAY_API = `${BaseApiService.BASE_API}/plays`;

  constructor(
    private http: HttpClient
  ) {
    super();
  }

  player(player: Player): Observable<Array<Play> | ApiError> {
    return this.http.get<Array<Play>>(`${PlayService.PLAY_API}/?player=${player._id}`, BaseApiService.defaultOptions)
      .pipe(
        map((plays: Array<Play>) => {
          return plays;
        }),
        catchError(this.handleError)
      );
  }

  team(team: Team): Observable<Array<Play> | ApiError> {
    return this.http.get<Array<Play>>(`${PlayService.PLAY_API}/?team=${team._id}`, BaseApiService.defaultOptions)
      .pipe(
        map((plays: Array<Play>) => {
          return plays;
        }),
        catchError(this.handleError)
      );
  }

}
