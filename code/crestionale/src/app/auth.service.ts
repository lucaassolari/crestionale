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

  // getters
  getIsAuth() {
    return this.isAuthenticated
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable()
  }

  getToken() {
    return this.token
  }

  getEmail(): string {
    const email = localStorage.getItem('email')

    if(!email)
      return
    return email
  }

  private getAuthData() {
    const token = localStorage.getItem('token')
    const expirationDate = localStorage.getItem('expirationDate')

    if(!token || !expirationDate) // se non esiste uno dei due
      return
    return { // se esistono entrambi, ritorno un js object che li contiene
      token: token,
      expirationDate: new Date(expirationDate)
    }
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

  logoutUser() {
    // pulisco il token e mando l'info a chiunque è interessato
    this.token = null
    this.isAuthenticated = false
    this.authStatusListener.next(false)
    clearTimeout(this.tokenTimer)
    this.clearAuthData()
    this.router.navigate(['/'])
  }

  // metodo per salvare i dati che verrà chiamato nel login. Usiamo la data così non è relativa al momento di login
  private saveAuthData(token: string, expirationDate: Date, email: string) {
    localStorage.setItem('token', token) // chiave + argomento
    localStorage.setItem('expirationDate', expirationDate.toISOString())
    localStorage.setItem('email', email)
  }

  // metodo per pulire i dati salvati che sarà chiamato al logout
  private clearAuthData() {
    localStorage.removeItem('token')
    localStorage.removeItem('expirationDate')
    localStorage.removeItem('email')
  }

  private setAuthTimer(duration: number) {
    this.tokenTimer = window.setTimeout(() => { // funzione che viene eseguita quando scade il timer
      this.logoutUser()
    }, duration * 1000) // moltiplico per 1000 pechè funziona coi millisecondi
  }

  // metodo che mi tiene sempre loggato finchè non scade il token, chiamato nell'AppComponent.ts
  autoAuthUser() {
    const authInfo = this.getAuthData()

    // se non sono ancora loggato ed entro per la prima volta, getauthdata non mi torna nulla quindi in questo caso
    // faccio un semplice return senza fare nulla
    if(!authInfo) 
      return

    // ora dobbiamo checckare se il token è valido da un punto di vista di scadenze di tempo
    // nb. la validazione del token effettiva può essere fatta solo dal server
    const now = new Date()
    const expiresIn = authInfo.expirationDate.getTime() - now.getTime() 

    if(expiresIn > 0) {
      // faccio gli stessi passaggi che faccio nel login
      this.token = authInfo.token
      this.isAuthenticated = true
      this.authStatusListener.next(true)
      this.setAuthTimer(expiresIn / 1000) // divido per 1000 perchè avevo i millisecondi
    }

  }
}

/*
* Service che contiene i metodi relativi al login e alla registrazione.
* Prima di tutto viene importato il modulo HttpClientModule e injectato nel costruttore, per permettere la
* comunicazione tramite protocollo http tra il client e il serve su mongodb.
*/
