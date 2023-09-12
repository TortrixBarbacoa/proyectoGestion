import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { MainAppComponent } from './components/main-app/main-app.component';
import { canActivate, redirectUnauthorizedTo, redirectLoggedInTo } from '@angular/fire/auth-guard'

const routes: Routes = [

  {path: '', pathMatch: 'full', redirectTo: '/home'},
  {path: 'home', component: MainAppComponent, ...canActivate(() => redirectUnauthorizedTo(['/login']))},
  {path: 'login', component: LoginComponent, ...canActivate(() => redirectLoggedInTo(["/home"]))},
  {path: 'register', component: RegisterComponent, ...canActivate(() => redirectLoggedInTo(["/home"])) },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
