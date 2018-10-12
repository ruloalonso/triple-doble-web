import { IsAuthenticatedGuard } from './shared/guards/is-authenticated.guard';
import { CanLeaveDraftLobbyGuard } from './shared/guards/can-leave-draft-lobby.guard';
import { LoginComponent } from './components/misc/login/login.component';
import { LeagueListComponent } from './components/league/league-list/league-list.component';
import { Routes } from '@angular/router';
import { DraftLobbyComponent } from './components/draft/draft-lobby/draft-lobby.component';
import { LeagueHomeComponent } from './components/league/league-home/league-home.component';
import { DraftRoomComponent } from './components/draft/draft-room/draft-room.component';
import { RegisterComponent } from './components/misc/register/register.component';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: RegisterComponent },
  { path: 'leagues', canActivate: [IsAuthenticatedGuard], component: LeagueListComponent },
  { path: 'leagues/:leagueId', canActivate: [IsAuthenticatedGuard], component: LeagueHomeComponent },
  { path: 'leagues/:leagueId/lobby', canActivate: [IsAuthenticatedGuard], canDeactivate: [CanLeaveDraftLobbyGuard], component: DraftLobbyComponent },
  { path: 'leagues/:leagueId/draft', canActivate: [IsAuthenticatedGuard], component: DraftRoomComponent }
];
