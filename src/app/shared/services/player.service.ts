import { ApiError } from '../models/api-error.model';
import { Injectable } from '@angular/core';
import { BaseApiService } from './base-api.service';
import { HttpClient } from '@angular/common/http';
import { League } from '../models/league.model';
import { Observable, Subject} from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { SessionService } from './session.service';
import { Player } from '../models/player.model';

@Injectable({
  providedIn: 'root'
})
export class PlayerService extends BaseApiService {
  private static readonly PLAYER_API = `${BaseApiService.BASE_API}/players`;

  players: Array<Player> = [];
  playersSubject: Subject<Array<Player>> = new Subject();

  constructor(
    private http: HttpClient,
    private sessionService: SessionService) {
    super();
  }

  list(): Observable<Array<Player> | ApiError> {
    return this.http.get<Array<Player>>(PlayerService.PLAYER_API, BaseApiService.defaultOptions)
      .pipe(
        map((players: Array<Player>) => {
          players = players.map(league => Object.assign(new Player(), league));
          this.players = players;
          this.notifyPlayersChanges();
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

  sign(id: string): Observable<Player | ApiError> {
    return this.http.post<Player>(`${PlayerService.PLAYER_API}/${id}/sign`, BaseApiService.defaultOptions, { withCredentials: true })
      .pipe(
        map((player: Player) => {
          this.players.map(newPlayer => {
            if (newPlayer.id === id) {
              newPlayer.owner = this.sessionService.user.id;
            }
            return newPlayer;
          });
          this.notifyPlayersChanges();
          return player;
        }),
        catchError(this.handleError)
      );
  }

  private notifyPlayersChanges(): void {
    this.playersSubject.next(this.players);
  }

  onPlayersChanges(): Observable<Array<Player>> {
    return this.playersSubject.asObservable();
  }
}
