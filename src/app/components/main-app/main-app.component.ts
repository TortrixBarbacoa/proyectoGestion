import { Component } from '@angular/core';
import { Router } from '@angular/router'; // <--- import Router
import { UserService } from 'src/app/services/user.service'; // <--- import UserService

@Component({
  selector: 'app-main-app',
  templateUrl: './main-app.component.html',
  styleUrls: ['./main-app.component.css']
})
export class MainAppComponent {

  homeSelected: boolean = false;
  calculoSelected: boolean = false;
  detalleSelected: boolean = true;
  
  // * Constructor userService y Router
  constructor(
    private userService: UserService, 
    private router: Router
    ){} 
  
  // * Método logOut 
  logOut() {
    this.userService.logOut()
      .then(() => {
        this.router.navigate(['/login']);
      })
      .catch((error) => {
        console.log(error);
      })
  }

  clickHome() {
    this.homeSelected = true;
    this.detalleSelected = false;
    this.calculoSelected = false;
  }

  clickDetalle() {
    this.homeSelected = false;
    this.detalleSelected = true;
    this.calculoSelected = false;
  }

  clickSolicitar() {
    this.homeSelected = false;
    this.detalleSelected = false;
    this.calculoSelected = true;
  }
}
