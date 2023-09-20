import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; // <--- import Router
import { UserRegister } from 'src/app/services/user.service'; // <--- import UserService
import { UserProfileInfoService } from 'src/app/services/user-profile-info.service';
import { FormControl, FormGroup } from '@angular/forms'; // <--- import FormControl, FormGroup
import { usersInfo } from 'src/app/models/users-info';
import { switchMap, tap } from 'rxjs';
import { user } from '@angular/fire/auth';


@Component({
  selector: 'app-main-app',
  templateUrl: './main-app.component.html',
  styleUrls: ['./main-app.component.css']
})
export class MainAppComponent {
  userData: any;
  detalleUser: any;
  prueba: any;
  user$ = this.userInfo.currentUserProfileInfo$;

  homeSelected: boolean = true;
  calculoSelected: boolean = false;
  detalleSelected: boolean = false;
  usuarioSelected: boolean = false;

  // * Constructor userService y Router
  constructor(
    private userInfo: UserProfileInfoService,
    private userService: UserRegister,
    private router: Router,
    
  ) { }


  ngOnInit(): void {
    // Llama al servicio para obtener el userData y asignarlo a la propiedad
    this.userService.getAuthenticatedUserName().then((userData) => {
      this.userData = userData;
    });
    this.userService.getAuthenticateUserCollection().then((detalleUser) => {
      this.detalleUser = detalleUser;
    });

    this.userService.getAllUsersInfo().then((prueba) => {
      this.prueba = prueba;
    });
  }


  // * Método logOut 
  logOut() {
    this.userService.logOut()
      .then(() => {
        this.router.navigate(['/login']);
        sessionStorage.clear();
      })
      .catch((error) => {
        console.log(error);
      })
  }

  clickHome() {
    this.homeSelected = true;
    this.detalleSelected = false;
    this.calculoSelected = false;
    this.usuarioSelected = false;
  }

  clickDetalle() {
    this.homeSelected = false;
    this.detalleSelected = true;
    this.calculoSelected = false;
    this.usuarioSelected = false;
  }
  clickUsuario() {
    this.homeSelected = false;
    this.detalleSelected = false;
    this.calculoSelected = false;
    this.usuarioSelected = true;
  }

  clickSolicitar() {
    this.homeSelected = false;
    this.detalleSelected = false;
    this.calculoSelected = true;
    this.usuarioSelected = false;
  }
}
