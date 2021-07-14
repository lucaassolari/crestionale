import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-registration-page',
  templateUrl: './registration-page.component.html',
  styleUrls: ['./registration-page.component.css']
})
export class RegistrationPageComponent implements OnInit {

  registerUserData : any = {}
  private registrationStatusListenerSubs: Subscription
  emailIsInvalid = false
  userAlreadyExists = false
  
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

  registerUser() {

    this.emailIsInvalid = false
    this.userAlreadyExists = false

    if(!this.validateEmail(this.registerUserData.email)) {
      this.emailIsInvalid = true
    }
    else {
      this.emailIsInvalid = false
      this.registrationStatusListenerSubs = this._auth.registerUser(this.registerUserData)
        .subscribe(res => {
          if(!res) {
            this.userAlreadyExists = true
            this.registrationStatusListenerSubs.unsubscribe()
          }
            
          else {
            this.userAlreadyExists = false
            this.registrationStatusListenerSubs.unsubscribe() 
          }  
        })
    }
  }

}
