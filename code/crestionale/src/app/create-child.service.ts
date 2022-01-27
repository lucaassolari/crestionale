import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CreateChildService {

  private _createChildUrl = "http://localhost:3000/api/createchild"

  constructor(private http: HttpClient) { }

  createChild(child) {
    this.http.post<any>(this._createChildUrl, child)
      .subscribe(response => {
        window.alert(response.message)
      })
  }
}
