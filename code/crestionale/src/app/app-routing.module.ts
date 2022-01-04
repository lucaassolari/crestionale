import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { RegistrationPageComponent } from './registration-page/registration-page.component';
import { AuthGuard } from './auth.guard';
import { LogregGuard } from './logreg.guard'
import { CreateEventComponent } from './create-event/create-event.component';
import { EventListComponent } from './event-list/event-list.component'

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
  },
  {
    path: 'createevent',
    component: CreateEventComponent
  },
  {
    path: 'eventlist',
    component: EventListComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard, LogregGuard]
})
export class AppRoutingModule { }
