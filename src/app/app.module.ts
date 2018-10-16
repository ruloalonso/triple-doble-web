import { GlobalErrorHandlerService } from './shared/handlers/global-error-handler.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/misc/header/header.component';
import { LoginComponent } from './components/misc/login/login.component';

import { routes } from './app.routes';
import { LeagueListComponent } from './components/league/league-list/league-list.component';
import { LeagueItemComponent } from './components/league/league-item/league-item.component';
import { DraftLobbyComponent } from './components/draft/draft-lobby/draft-lobby.component';
import { LeagueHomeComponent } from './components/league/league-home/league-home.component';
import { DraftRoomComponent } from './components/draft/draft-room/draft-room.component';
import { RegisterComponent } from './components/misc/register/register.component';
import { LeagueCreateComponent } from './components/league/league-create/league-create.component';
import { TeamItemComponent } from './components/team/team-item/team-item.component';
import { PlayerListComponent } from './components/player/player-list/player-list.component';
import { PlayerItemComponent } from './components/player/player-item/player-item.component';
import { TeamLineupComponent } from './components/team/team-lineup/team-lineup.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    LeagueListComponent,
    LeagueItemComponent,
    DraftLobbyComponent,
    LeagueHomeComponent,
    DraftRoomComponent,
    RegisterComponent,
    LeagueCreateComponent,
    TeamItemComponent,
    PlayerListComponent,
    PlayerItemComponent,
    TeamLineupComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [
    {
      provide: ErrorHandler,
      useClass: GlobalErrorHandlerService
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
