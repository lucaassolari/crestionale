import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  loginUserData: any = {}
  
  constructor(private _auth: AuthService) { }

  ngOnInit(): void {
  }

  loginUser() {
    this._auth.loginUser(this.loginUserData) 
  }
}
