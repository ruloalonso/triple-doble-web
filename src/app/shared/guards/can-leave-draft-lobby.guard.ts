import { DraftLobbyComponent } from 'src/app/components/draft/draft-lobby/draft-lobby.component';
import { Injectable } from '@angular/core';
import { CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CanLeaveDraftLobbyGuard implements CanDeactivate<DraftLobbyComponent> {

  canDeactivate(
    component: DraftLobbyComponent,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    return component.canDeactivate();
  }
}
