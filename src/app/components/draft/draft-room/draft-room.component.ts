import { Component, OnInit } from '@angular/core';
import { League } from 'src/app/shared/models/league.model';
import { ActivatedRoute } from '@angular/router';
import { LeagueService } from 'src/app/shared/services/league.service';
import { SessionService } from 'src/app/shared/services/session.service';

@Component({
  selector: 'app-draft-room',
  templateUrl: './draft-room.component.html',
  styleUrls: ['./draft-room.component.css']
})
export class DraftRoomComponent implements OnInit {
  league: League = new League();
  leagueId: string;

  constructor(
    private route: ActivatedRoute,
    private leagueService: LeagueService,
    private sessionService: SessionService) { }

  ngOnInit() {
    this.route.params.subscribe(params => this.leagueId = params.leagueId);
    console.log(this.leagueId);
    this.leagueService.get(this.leagueId)
    .subscribe((newLeague: League) => this.league = newLeague);
  }

  turn() {
    console.log(this.league.users[this.league.turn]);
    return this.league.users[this.league.turn];
  }

  userTurn() {
    return this.turn() === this.sessionService.user.id;
  }

}
