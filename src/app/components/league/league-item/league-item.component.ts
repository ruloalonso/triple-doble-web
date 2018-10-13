import { League } from './../../../shared/models/league.model';
import { Component, OnInit , Input} from '@angular/core';
import { SessionService } from 'src/app/shared/services/session.service';
import { LeagueService } from 'src/app/shared/services/league.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-league-item',
  templateUrl: './league-item.component.html',
  styleUrls: ['./league-item.component.css']
})
export class LeagueItemComponent implements OnInit {
  @Input() league: League = new League();

  constructor(
    private sessionService: SessionService,
    private leagueService: LeagueService,
    private router: Router
  ) { }

  ngOnInit() {
    // console.log(this.league);
    // console.log(this.sessionService.user)
  }

  joinLeague(): void {
    this.leagueService.join(this.league._id)
      .subscribe(league => {
        this.router.navigate([`/leagues/${this.league._id}/lobby`]);
      });
  }

  isAdmin(): boolean {
    return this.sessionService.user.id === this.league.admin;
  }

  isUser(): boolean {
    return this.league.users.includes(this.sessionService.user.id);
  }

  isApplication(): boolean {
    return this.league.status === 'application'
  }

  isDraft(): boolean {
    return this.league.status === 'draft'
  }

  isSeason(): boolean {
    return this.league.status === 'season'
  }

  isTurn(): boolean {
    return this.league.users[this.league.turn - 1] === this.sessionService.user.id;
  }

  userTurn(): string {
    return this.league.users[this.league.turn - 1];
  }

  draftReady(): boolean {
    return this.league.maxUsers === this.league.users.length;
  }

}
