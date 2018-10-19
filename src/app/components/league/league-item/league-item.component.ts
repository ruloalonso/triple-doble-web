import { League } from './../../../shared/models/league.model';
import { Component, OnInit , Input, Output, EventEmitter} from '@angular/core';
import { SessionService } from 'src/app/shared/services/session.service';
import { LeagueService } from 'src/app/shared/services/league.service';
import { Router } from '@angular/router';
import { TeamService } from 'src/app/shared/services/team.service';
import { Team } from 'src/app/shared/models/team.model';

@Component({
  selector: 'app-league-item',
  templateUrl: './league-item.component.html',
  styleUrls: ['./league-item.component.css']
})
export class LeagueItemComponent implements OnInit {
  @Input() league: League = new League();
  @Output() writting: EventEmitter<any> = new EventEmitter();
  teamCity: string;
  teamName: string;

  constructor(
    private sessionService: SessionService,
    private leagueService: LeagueService,
    private router: Router,
    private teamService: TeamService
  ) { }

  ngOnInit() {

  }

  joinLeague(): void {
    this.leagueService.join(this.league._id)
      .subscribe((league: League) => {
        this.teamService.create(league._id, this.teamName, this.teamCity)
            .subscribe((team: Team) => {
              this.router.navigate([`/leagues/${league._id}/lobby`]);
            });
      });
  }

  isAdmin(): boolean {
    return this.sessionService.user.id === this.league.admin.id;
  }

  isUser(): boolean {
    return this.league.users.some(user => user.id === this.sessionService.user.id);
  }

  isApplication(): boolean {
    return this.league.status === 'application';
  }

  isDraft(): boolean {
    return this.league.status === 'draft';
  }

  isSeason(): boolean {
    return this.league.status === 'season';
  }

  isTurn(): boolean {
    return this.league.users[this.league.turn - 1].id === this.sessionService.user.id;
  }

  userTurn(): string {
    return this.league.users[this.league.turn - 1].name;
  }

  draftReady(): boolean {
    return this.league.maxUsers === this.league.users.length;
  }

  onWritting(): void {
    this.writting.emit();
  }

}
