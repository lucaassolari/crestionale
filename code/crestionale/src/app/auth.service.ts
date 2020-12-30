import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // proprietà che contiene l'indirizzo url del backend
  private _registerUrl = "http://localhost:3000/api/register"
  private _loginUrl = "http://localhost:3000/api/login"

  private token: string
  private email: string
  // subject per pushare le informazioni sull'atenticazione ai componenti interessati
  private authStatusListener = new Subject<boolean>()
  private registrationStatusListener = new Subject<boolean>()
  private isAuthenticated = false

  // dove immagazzinare il timer, perchè se faccio logout voglio poter pulire il valore
  private tokenTimer: number 

  constructor(private http: HttpClient, private router: Router) { }

  registerUser(user) {
    this.http.post<any>(this._registerUrl, user)
      .subscribe(response => {
        if(response.status) {
          this.registrationStatusListener.next(true)
          this.loginUser(user)
        }
        else {
          this.registrationStatusListener.next(false)   
        }      
      })
    
    return this.registrationStatusListener.asObservable()
  }

  loginUser(user) {}
  
}
