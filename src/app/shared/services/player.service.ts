import { ApiError } from '../models/api-error.model';
import { Injectable } from '@angular/core';
import { BaseApiService } from './base-api.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, Subject} from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { SessionService } from './session.service';
import { Player } from '../models/player.model';

@Injectable({
  providedIn: 'root'
})
export class PlayerService extends BaseApiService {
  private static readonly PLAYER_API = `${BaseApiService.BASE_API}/players`;

  // players: Array<Player> = [];
  // playersSubject: Subject<Array<Player>> = new Subject();

  availablePlayers: Array<Player> = [];
  availablePlayersSubject: Subject<Array<Player>> = new Subject();

  constructor(
    private http: HttpClient,
    private sessionService: SessionService) {
    super();
  }

  // list(): Observable<Array<Player> | ApiError> {
  //   return this.http.get<Array<Player>>(PlayerService.PLAYER_API, BaseApiService.defaultOptions)
  //     .pipe(
  //       map((players: Array<Player>) => {
  //         players = players.map(league => Object.assign(new Player(), league));
  //         this.players = players;
  //         this.notifyPlayersChanges();
  //         return players;
  //       }),
  //       catchError(this.handleError)
  //     );
  // }

  listAvailable(): Observable<Array<Player> | ApiError> {
    let params = new HttpParams();
    params = params.append('available', 'true');
    return this.http.get<Array<Player>>(`${PlayerService.PLAYER_API}/?available=true`, BaseApiService.defaultOptions)
      .pipe(
        map((players: Array<Player>) => {
          players = players.map(league => Object.assign(new Player(), league));
          this.availablePlayers = players;
          this.notifyAvailablePlayersChanges();
          return players;
        }),
        catchError(this.handleError)
      );
  }

  get(id: string): Observable<Player | ApiError> {
    return this.http.get<Player>(`${PlayerService.PLAYER_API}/${id}`, BaseApiService.defaultOptions)
      .pipe(
        map((player: Player) => Object.assign(new Player(), player)),
        catchError(this.handleError));
  }

  sign(playerId: string, leagueId: string): Observable<Player | ApiError> {
    return this.http.post<Player>(`${PlayerService.PLAYER_API}/${playerId}/sign`, { leagueId: leagueId }, { withCredentials: true })
      .pipe(
        map((player: Player) => {
          this.availablePlayers = this.availablePlayers.filter(newPlayer => newPlayer._id !== player._id);
          this.notifyAvailablePlayersChanges();
          return player;
        }),
        catchError(this.handleError)
      );
  }

  team(id: string): Observable<Array<Player> | ApiError> {
    return this.http.get<Array<Player>>(`${PlayerService.PLAYER_API}/?team=${id}`, BaseApiService.defaultOptions)
      .pipe(
        map((players: Array<Player>) => {
          players = players.map(player => Object.assign(new Player(), player));
          return players;
        }),
        catchError(this.handleError)
      );
  }

  private notifyAvailablePlayersChanges(): void {
    this.availablePlayersSubject.next(this.availablePlayers);
  }

  onAvailablePlayersChanges(): Observable<Array<Player>> {
    return this.availablePlayersSubject.asObservable();
  }
}
