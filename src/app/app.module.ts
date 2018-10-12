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


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    LeagueListComponent,
    LeagueItemComponent,
    DraftLobbyComponent,
    LeagueHomeComponent,
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
