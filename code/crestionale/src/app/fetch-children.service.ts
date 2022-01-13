import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class FetchChildrenService {

  private _fetchChildrenUrl = "http://localhost:3000/api/fetchchildren"
  
  constructor(private http: HttpClient) { }

  fetchChildren(email: string): any {
    return this.http.post(this._fetchChildrenUrl, {email: email})
  }
}
