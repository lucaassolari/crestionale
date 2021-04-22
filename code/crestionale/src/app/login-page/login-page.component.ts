import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  loginUserData: any = {}
  private loginStatusListenerSubs: Subscription
  
  constructor(private _auth: AuthService) { }

  ngOnInit(): void {
  }

  loginUser() {
    this.loginStatusListenerSubs = this._auth.loginUser(this.loginUserData) 
    .subscribe(res => {
      if(res)
        window.alert(res)
        
      this.loginStatusListenerSubs.unsubscribe()
    }) 
  }
}
