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
  fullName: any;
  user$ = this.userInfo.currentUserProfileInfo$;

  homeSelected: boolean = true;
  calculoSelected: boolean = false;
  detalleSelected: boolean = false;
  
  // * Constructor userService y Router
  constructor(
    private userInfo: UserProfileInfoService,
    private userService: UserRegister, 
    private router: Router,
    ){} 
  

    ngOnInit(): void {
      // Llama al servicio para obtener el fullName y asignarlo a la propiedad
      this.userService.getAuthenticatedUserName().then((fullName) => {
        this.fullName = fullName;
      });
    }
    
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
