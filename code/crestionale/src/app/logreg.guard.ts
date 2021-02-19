import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router'
import { Observable } from 'rxjs';
import { AuthService } from './auth.service'

@Injectable() // perchè voglio injectare un servizio dentro un servizio
export class LogregGuard implements CanActivate {
    
    constructor(private authService: AuthService, private router: Router) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        const isAuth = this.authService.getIsAuth()
        if(isAuth) {
            this.router.navigate(['/home']) // se non siamo autenticati andiamo alla schermata di login
        }
            
        return !isAuth
    }

}