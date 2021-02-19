import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router'

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {

  userIsAuthenticated = false
  private authListenerSubs: Subscription

  constructor(private _auth: AuthService, private router: Router) { }

  ngOnInit(): void {
    /*
    * Per switchare la pagina tra landing e home page non posso usare solo il listener perchè quando creo il componente
    * ovvero dopo essermi loggato ed essere entrato nella home, non ho più nessuna novità riguardo il mio
    * observable perchè la nuova info sul boolean di userIsAuthenticated viene mandata solo quando clicco sul login
    * button. Quindi va bene tenere l'observable per futuri sviluppi, ma quando creo il componente deve andare 
    * a prendersi il valore da solo tramite il metodo getIsAuth()
    */
    this.userIsAuthenticated = this._auth.getIsAuth()
    this.authListenerSubs = this._auth.getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated
      })

    if(this.userIsAuthenticated)
      this.router.navigate(['/home'])
  }

  ngOnDestroy() {
    this.authListenerSubs.unsubscribe()
  }

}
