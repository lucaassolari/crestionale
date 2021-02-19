import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { RegistrationPageComponent } from './registration-page/registration-page.component';
import { AuthGuard } from './auth.guard';
import { LogregGuard } from './logreg.guard'

const routes: Routes = [
  {
    path: '',
    redirectTo: '/welcome',
    pathMatch: 'full'
  },
  {
    path: 'welcome',
    component: LandingPageComponent,
  },
  {
    path: 'register',
    component: RegistrationPageComponent,
    canActivate: [LogregGuard]
  },
  {
    path: 'login',
    component: LoginPageComponent,
    canActivate: [LogregGuard]
  },
  {
    path: 'home',
    component: HomePageComponent,
    canActivate: [AuthGuard] // authguard, così se scrivo /home nella barra indirizzi mi rimanda alla pagina di login
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard, LogregGuard]
})
export class AppRoutingModule { }
