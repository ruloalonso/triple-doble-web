import { IsAuthenticatedGuard } from './shared/guards/is-authenticated.guard';
import { CanLeaveDraftLobbyGuard } from './shared/guards/can-leave-draft-lobby.guard';
import { LoginComponent } from './components/misc/login/login.component';
import { LeagueListComponent } from './components/league/league-list/league-list.component';
import { Routes } from '@angular/router';
import { DraftLobbyComponent } from './components/draft/draft-lobby/draft-lobby.component';
import { LeagueHomeComponent } from './components/league/league-home/league-home.component';


export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'leagues', component: LeagueListComponent },
  { path: 'leagues/:id', canActivate: [IsAuthenticatedGuard], component: LeagueHomeComponent }
  { path: 'leagues/:id/draft', canActivate: [IsAuthenticatedGuard], canDeactivate: [CanLeaveDraftLobbyGuard], component: DraftLobbyComponent },
];
