import { ApiError } from './../models/api-error.model';
import { catchError } from 'rxjs/operators';
import { LeagueService } from './../services/league.service';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { League } from '../models/league.model';

@Injectable({
  providedIn: 'root'
})
export class LeagueResolverGuard implements Resolve<League | ApiError> {

  constructor(private leagueService: LeagueService, private router: Router) {}

  resolve(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<League | ApiError> {
      return this.leagueService.get(next.params.leagueId).pipe(
        catchError((error: ApiError) => {
          this.router.navigate(['/leagues']);
          return throwError(error);
        })
      );
  }
}
