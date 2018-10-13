import { Component, OnInit } from '@angular/core';
import { League } from 'src/app/shared/models/league.model';
import { ActivatedRoute } from '@angular/router';
import { LeagueService } from 'src/app/shared/services/league.service';
import { SessionService } from 'src/app/shared/services/session.service';
import { Player } from 'src/app/shared/models/player.model';
import { Subscription } from 'rxjs';
import { PlayerService } from 'src/app/shared/services/player.service';

@Component({
  selector: 'app-draft-room',
  templateUrl: './draft-room.component.html',
  styleUrls: ['./draft-room.component.css']
})
export class DraftRoomComponent implements OnInit {
  league: League = new League();
  leagueId: string;
  players: Array<Player> = [];
  onPlayersChanges: Subscription;

  constructor(
    private route: ActivatedRoute,
    private leagueService: LeagueService,
    private sessionService: SessionService,
    private playerService: PlayerService) { }

  ngOnInit() {
    this.route.params.subscribe(params => this.leagueId = params.leagueId);
    console.log(this.leagueId);
    this.leagueService.get(this.leagueId)
      .subscribe((newLeague: League) => {
        this.league = newLeague;
        console.log('League Changed!!!');
      });
    this.playerService.list()
      .subscribe((players: Array<Player>) => {
        this.players = players;
        console.log(this.players);
      });
    this.onPlayersChanges = this.playerService.onPlayersChanges()
      .subscribe((players: Array<Player>) => {
        this.players = players;
        console.log('Players Changed!!!');
      });
  }

  turn() {
    return this.league.users[this.league.turn];
  }

  userTurn() {
    return this.turn() === this.sessionService.user.id;
  }

  getAvailablePlayers() {

  }

}
