import { Injectable } from '@angular/core';
import { CanLoad, Route, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { skipWhile, take, tap } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad {

  constructor(
    private authService: AuthService,
    private router: Router) { }

  // ? if we use Observable<boolean>, the observable must be marked as complete,
  // ? signedin$ is never marked as complete, nut take will trik the canload by marking the observable complete
  // ? signedin$ = null (means default value, we don't know whether the user is signedin or signed out)
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> {
    return this.authService.signedin$.pipe(
      skipWhile(value => value === null),
      take(1),
      tap((authenticated) => {
        if (!authenticated) {
          this.router.navigateByUrl('/');
        }
      })
    );
  }
}
