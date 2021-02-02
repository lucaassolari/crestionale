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

  getIsAuth() {
    return this.isAuthenticated
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable()
  }

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

  loginUser(user) {
    this.http.post<{token: string, email: string, expiresIn: number}>(this._loginUrl, user)
      .subscribe(response => {
        const token = response.token
        const email = user.email
        this.token = token
        this.email = email

        // informiamo tutti gli interessati (iscritti all'observable) che siamo autenticati
        if(token) { // se viene ritornato un token, se esiste
          const expiresInDuration = response.expiresIn
          this.setAuthTimer(expiresInDuration)
          this.isAuthenticated = true
          this.authStatusListener.next(true)
          const now = new Date()
          const expirationDate = new Date(now.getTime() + expiresInDuration * 1000)
          this.saveAuthData(token, expirationDate, email)
          this.router.navigate(['/welcome'])
        }
      },
      error => {
        console.log(error)
      })
  }

  // metodo per salvare i dati che verrà chiamato nel login. Usiamo la data così non è relativa al momento di login
  private saveAuthData(token: string, expirationDate: Date, email: string) {
    localStorage.setItem('token', token) // chiave + argomento
    localStorage.setItem('expirationDate', expirationDate.toISOString())
    localStorage.setItem('email', email)
  }

  private setAuthTimer(duration: number) {
    this.tokenTimer = window.setTimeout(() => { // funzione che viene eseguita quando scade il timer
      this.logoutUser()
    }, duration * 1000) // moltiplico per 1000 pechè funziona coi millisecondi
  }

  private logoutUser() {}
  
}
