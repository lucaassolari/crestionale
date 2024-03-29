import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CreateEventService {

  private _createEventUrl = "http://localhost:3000/api/createevent"

  constructor(private http: HttpClient) { }

  createEvent(event) {
    this.http.post<any>(this._createEventUrl, event)
      .subscribe(response => {
        window.alert(response.message)
      })
  }
}
