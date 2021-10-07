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
  emailIsInvalid = false

  userNotExists = false
  passwordWrong = false
  
  constructor(private _auth: AuthService) { }

  ngOnInit(): void {
  }

  validateEmail(email) {
    var mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-]+$/

    if(email.match(mailformat))
      return true
    else
      return false
  }

  loginUser() {

    this.emailIsInvalid = false
    this.userNotExists = false
    this.passwordWrong = false

    if(!this.validateEmail(this.loginUserData.email)) {
      this.emailIsInvalid = true
    }
    else {
      this.emailIsInvalid = false
      this.loginStatusListenerSubs = this._auth.loginUser(this.loginUserData) 
      .subscribe(res => {
        if(res) {
          if(res == 'User not exists')
            this.userNotExists = true
          else if(res == 'Password wrong')
            this.passwordWrong = true
          else
            window.alert('Ooops! Qualcosa è andato storto')
        }
          
        this.loginStatusListenerSubs.unsubscribe()
      }) 
    }

    
  }
}
