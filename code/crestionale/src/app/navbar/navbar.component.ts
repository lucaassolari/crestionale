import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  userIsAuthenticated = false;
  private authListenerSubs: Subscription

  constructor(private _auth: AuthService) { }

  ngOnInit(): void {
    // chiamo esplicitamente questo metodo perchè può capitare che il componente venga caricato dopo che avviene
    // l'autoauthentication, quindi non si aggiornerebbe
    this.userIsAuthenticated = this._auth.getIsAuth()

    this.authListenerSubs = this._auth.getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated
      })
  }

  @ViewChild('navBurger') navBurger: ElementRef
  @ViewChild('navMenu') navMenu: ElementRef

  toggleNavbar() {
    this.navBurger.nativeElement.classList.toggle('is-active');
    this.navMenu.nativeElement.classList.toggle('is-active');
  }

  resetRollCall() {
    localStorage.setItem('morningDone', '0')
    localStorage.setItem('lunchDone', '0')
    localStorage.setItem('afternoonDone', '0')
    location.reload()
  }

  // devo disiscrivermi dall'observable quando il componente viene distrutto
  ngOnDestroy() {
    this.authListenerSubs.unsubscribe()
  }

  onLogout() {
    this._auth.logoutUser()
  }

}
