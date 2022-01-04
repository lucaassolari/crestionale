import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class FetchEventsService {

  private _fetchEventsUrl = "http://localhost:3000/api/fetchevents"

  constructor(private http: HttpClient) { }

  fetchEvents(email: string): any {
    return this.http.post(this._fetchEventsUrl, {email: email})
  }
}
