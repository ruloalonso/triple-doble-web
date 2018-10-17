import { Component, OnInit } from '@angular/core';
import { Team } from 'src/app/shared/models/team.model';
import { TeamService } from 'src/app/shared/services/team.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-team-item',
  templateUrl: './team-item.component.html',
  styleUrls: ['./team-item.component.css']
})
export class TeamItemComponent implements OnInit {
  team: Team;

  constructor(
    private teamService: TeamService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.teamService.get(params.teamId)
        .subscribe((team: Team) => {
          this.team = team;
        });
    });
  }

}
