import { GlobalErrorHandlerService } from './shared/handlers/global-error-handler.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { LeagueRankingComponent } from './components/league/league-ranking/league-ranking.component';
import { LeagueMarketplaceComponent } from './components/league/league-marketplace/league-marketplace.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { FormExampleComponent } from './form-example/form-example.component';
import { MatInputModule, MatButtonModule, MatSelectModule, MatRadioModule, MatCardModule, MatToolbarModule, MatSidenavModule, MatIconModule, MatListModule } from '@angular/material';
import { NavExampleComponent } from './nav-example/nav-example.component';
import { LayoutModule } from '@angular/cdk/layout';


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
    LeagueRankingComponent,
    LeagueMarketplaceComponent,
    FormExampleComponent,
    NavExampleComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatRadioModule,
    MatCardModule,
    ReactiveFormsModule,
    LayoutModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule
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
