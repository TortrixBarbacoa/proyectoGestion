import { Component } from '@angular/core';
import { Router } from '@angular/router'; // <--- import Router
import { UserRegister } from 'src/app/services/user.service'; // <--- import UserService
import { UserProfileInfoService } from 'src/app/services/user-profile-info.service';
import { MainAppComponent } from '../main-app/main-app.component';

@Component({
  selector: 'app-editar-perfil',
  templateUrl: './editar-perfil.component.html',
  styleUrls: ['./editar-perfil.component.css']
})
export class EditarPerfilComponent {
  userData: any;
  homeSelected: boolean = true;
  calculoSelected: boolean = false;
  detalleSelected: boolean = false;
  usuarioSelected: boolean = false;
  editUserSelected: boolean = false;

  constructor(
    private userInfo: UserProfileInfoService,
    private userService: UserRegister,
    private router: Router,
    private userRegister: UserRegister,
    public mainApp: MainAppComponent
  ) { }

  ngOnInit(): void {
    // Llama al servicio para obtener el userData y asignarlo a la propiedad
    this.userService.getAuthenticatedUserName().then((userData) => {
      this.userData = userData;
    });
  }
  editUserUid(newData:any)
  {
    console.log(newData);
    this.userRegister.editUser(newData.id, newData)
      .then(() => {
        alert('Usuario actualizado con éxito');

      })
      .catch((error) => {
        alert('Error: '+ error);
      });
  }
  closeComponent() {
    this.mainApp.editUserSelected = false;
    this.mainApp.homeSelected = true;
  }
  
}
