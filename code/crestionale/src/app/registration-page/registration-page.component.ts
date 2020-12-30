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

  constructor(private _auth: AuthService) { }

  ngOnInit(): void {
  }

  registerUser() {

    // per vedere se il form è invalid metto poi tipo if(userdata.invalid) 
    
    this.registrationStatusListenerSubs = this._auth.registerUser(this.registerUserData)
      .subscribe(res => {
        if(!res)
          console.log("ciao a tutti")
        
        this.registrationStatusListenerSubs.unsubscribe()
          
      })
  }

}
