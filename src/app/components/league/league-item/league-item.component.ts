import { League } from './../../../shared/models/league.model';
import { Component, OnInit , Input} from '@angular/core';
import { SessionService } from 'src/app/shared/services/session.service';

@Component({
  selector: 'app-league-item',
  templateUrl: './league-item.component.html',
  styleUrls: ['./league-item.component.css']
})
export class LeagueItemComponent implements OnInit {
  @Input() league: League = new League();

  constructor(private sessionService: SessionService) { }

  ngOnInit() {
    // console.log(this.league);
    // console.log(this.sessionService.user)
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

}
