import { Component, OnInit } from '@angular/core';
import { League } from 'src/app/shared/models/league.model';
import { ActivatedRoute } from '@angular/router';
import { LeagueService } from 'src/app/shared/services/league.service';
import { ApiError } from 'src/app/shared/models/api-error.model';

@Component({
  selector: 'app-draft-room',
  templateUrl: './draft-room.component.html',
  styleUrls: ['./draft-room.component.css']
})
export class DraftRoomComponent implements OnInit {
  league: League  | ApiError;
  leagueId: string;

  constructor(
    private route: ActivatedRoute,
    private leagueService: LeagueService) { }

  ngOnInit() {
    this.route.params.subscribe(params => this.leagueId = params.leagueId);
    console.log(this.leagueId);
    this.leagueService.get(this.leagueId).subscribe(league => {
      this.league = league;
      console.log(this.league);
    })
  }

}
