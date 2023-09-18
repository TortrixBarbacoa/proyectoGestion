import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { MainAppComponent } from './components/main-app/main-app.component';
import { canActivate, redirectUnauthorizedTo, redirectLoggedInTo } from '@angular/fire/auth-guard'

const routes: Routes = [

  // * Rutas de la aplicación

  // Ruta por defecto
  {path: '', pathMatch: 'full', redirectTo: '/login'},

  // * El complemento "canActivate - redirectUnauthorizedto" sirve para redirigir a los usuarios que no estén logueados a la página de login y que no puedan acceder a la aplicación
  // * El complemento "canActivate - redirectLoggedInTo" sirve para redirigir a los usuarios que estén logueados a la página de home y que no puedan volver al login 

  // Ruta Home
  {path: 'home', component: MainAppComponent, ...canActivate(() => redirectUnauthorizedTo(['/login']))},

  // Ruta Login
  {path: 'login', component: LoginComponent, ...canActivate(() => redirectLoggedInTo(["/home"]))},

  // Ruta Register
  {path: 'register', component: RegisterComponent, ...canActivate(() => redirectLoggedInTo(["/home"])) },

  // TODO: Crear rutas que se necesiten en este apartado

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
