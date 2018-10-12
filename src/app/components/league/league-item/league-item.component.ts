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

  isUser(): boolean {
    this.sessionService.isLeagueAdmin(this.league);
    return false;
  }

  isDraft(): boolean {
    return (this.league.status === 'application' || this.league.status === 'draft')
  }

}
