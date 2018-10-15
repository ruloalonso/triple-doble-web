import { Component } from '@angular/core';
import { League } from 'src/app/shared/models/league.model';
import { ApiError } from 'src/app/shared/models/api-error.model';
import { Team } from 'src/app/shared/models/team.model';
import { FormGroup } from '@angular/forms';
import { LeagueService } from 'src/app/shared/services/league.service';
import { TeamService } from 'src/app/shared/services/team.service';

@Component({
  selector: 'app-league-create',
  templateUrl: './league-create.component.html',
  styleUrls: ['./league-create.component.css']
})
export class LeagueCreateComponent {
  // league: League = new League();
  // team: Team = new Team();
  // apiError: ApiError;

  // constructor(
  //   private leagueService: LeagueService,
  //   private teamService: TeamService
  // ) { }

  // onSubmitCreateLeague(createLeagueForm: FormGroup): void {
  //   if (createLeagueForm.valid) {
  //     this.leagueService.create()
  //       .subscribe(
  //         () => {
  //           // loginForm.reset();
  //           // this.router.navigate(['/leagues']);
  //         },
  //         (error: ApiError) => this.apiError = error
  //       );
  //   }
  // }

}
