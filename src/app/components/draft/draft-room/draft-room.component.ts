import { switchMap, map } from 'rxjs/operators';
import { startWith } from 'rxjs/operators';
import { interval } from 'rxjs/internal/observable/interval';
import { Component, OnInit } from '@angular/core';
import { League } from 'src/app/shared/models/league.model';
import { ActivatedRoute } from '@angular/router';
import { LeagueService } from 'src/app/shared/services/league.service';
import { SessionService } from 'src/app/shared/services/session.service';
import { Player } from 'src/app/shared/models/player.model';
import { Subscription, Observable } from 'rxjs';
import { PlayerService } from 'src/app/shared/services/player.service';
import { User } from 'src/app/shared/models/user.model';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-draft-room',
  templateUrl: './draft-room.component.html',
  styleUrls: ['./draft-room.component.css']
})
export class DraftRoomComponent implements OnInit {
  private static readonly POLLING_INTERVAL = 2000;

  league: League = new League();
  leagueId: string;
  players: Array<Player> = [];
  onAvailablePlayersChanges: Subscription;
  onLeagueChanges: Subscription;
  pollingIntervalSubscription: Subscription;
  filteredPlayers: Observable<Player[]>;
  selectedPlayer: any;
  myControl = new FormControl();

  constructor(
    private route: ActivatedRoute,
    private leagueService: LeagueService,
    private sessionService: SessionService,
    private playerService: PlayerService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.leagueId = params.leagueId;
      this.pollingIntervalSubscription = interval(DraftRoomComponent.POLLING_INTERVAL)
      .pipe(
        startWith(0),
        switchMap(() => this.leagueService.get(this.leagueId))
      )
      .subscribe((league: League) => {
        if (this.league.turn !== league.turn) {
          this.playerService.listAvailable()
            .subscribe((players: Array<Player>) => {
              this.players = players;
            });
        }
        this.league = league;
        if (this.isSeason()) {
          this.pollingIntervalSubscription.unsubscribe();
        }
      });
    });
    this.playerService.listAvailable()
      .subscribe((players: Array<Player>) => {
        this.players = players;
      });
    this.onAvailablePlayersChanges = this.playerService.onAvailablePlayersChanges()
      .subscribe((players: Array<Player>) => {
        this.players = players;
      });
    this.onLeagueChanges = this.leagueService.onLeaguesChanges()
      .subscribe((leagues: Array<League>) => {
        leagues.forEach(league => {
          if (league._id === this.leagueId) {
            this.league = league;
          }
        });
      });
    this.filteredPlayers = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
  }

  turn(): User {
    return this.league.users[this.league.turn - 1];
  }

  userTurn(): boolean {
    return this.turn().id === this.sessionService.user.id;
  }

  pickPlayer() {
    console.log(this.myControl.value);
    this.playerService.sign(this.myControl.value._id, this.league._id)
      .subscribe(player => {
        this.passTurn();
        this.myControl.reset();
      });
  }

  passTurn() {
    this.leagueService.passTurn(this.leagueId)
      .subscribe(league => {
      });
  }

  isSeason() {
    return this.league.status === 'season';
  }

  ngOnDestroy(): void {
    this.onAvailablePlayersChanges.unsubscribe();
    this.pollingIntervalSubscription.unsubscribe();
  }

  selectChange(): void {
  }

  private _filter(name: string): Player[] {
    const filterValue = name.toLowerCase();

    return this.players.filter(
      player => player.firstName.toLowerCase().indexOf(filterValue) === 0 || player.lastName.toLowerCase().indexOf(filterValue) === 0
    );
  }

}
