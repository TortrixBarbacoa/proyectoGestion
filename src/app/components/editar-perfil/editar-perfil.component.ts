import { Component } from '@angular/core';
import { Router } from '@angular/router'; // <--- import Router
import { UserRegister } from 'src/app/services/user.service'; // <--- import UserService
import { UserProfileInfoService } from 'src/app/services/user-profile-info.service';

@Component({
  selector: 'app-editar-perfil',
  templateUrl: './editar-perfil.component.html',
  styleUrls: ['./editar-perfil.component.css']
})
export class EditarPerfilComponent {
  userData: any;

  constructor(
    private userInfo: UserProfileInfoService,
    private userService: UserRegister,
    private router: Router,
    private userRegister: UserRegister
  ) { }

  ngOnInit(): void {
    // Llama al servicio para obtener el userData y asignarlo a la propiedad
    this.userService.getAuthenticatedUserName().then((userData) => {
      this.userData = userData;
    });
  }
  editUserUid(newData:any)
  {
    this.userRegister.editUser(newData.uid, newData)
      .then(() => {
        alert('Usuario actualizado con éxito');

      })
      .catch((error) => {
        alert('Error: '+ error);
      });
  }
  closeComponent(){
    
  }
}
