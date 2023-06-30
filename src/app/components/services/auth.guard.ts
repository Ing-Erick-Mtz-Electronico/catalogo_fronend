import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private userService: UserService, private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {                  
      let rols = route.data['rols'];
      return this.checkUser(rols);
  }

  checkUser(roles: string): boolean {
    const isLogged = this.userService.IsLogged();    
    if(isLogged && this.userService.IsRol(roles)){
      return true;
    }
    
    if(isLogged){
      this.userService.RemoveToken(); 
    }

    this.router.navigate(['/login']);
    return false;
    
  }
  
}