import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'crestionale';

  constructor(private _auth: AuthService) {}

  ngOnInit() {
    this._auth.autoAuthUser()
  }
}
