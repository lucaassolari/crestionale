import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { FetchEventsService } from '../fetch-events.service'


@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  userEmail: string
  events = []
  eventsFetched = false

  constructor(private _authService: AuthService, private _fetchEvents: FetchEventsService) { }

  ngOnInit(): void {
    this.userEmail = this._authService.getEmail()
    this.updateEvents()
  }

  updateEvents() {
    this._fetchEvents.fetchEvents(this.userEmail)
      .subscribe(res => {
        this.events = res.result
        this.eventsFetched = true
      })
  }

}
