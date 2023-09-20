import { Component, OnInit } from '@angular/core';
import { UserProfileInfoService } from 'src/app/services/user-profile-info.service';
import { UserRegister } from 'src/app/services/user.service';

@Component({
  selector: 'app-detalles-view',
  templateUrl: './detalles-view.component.html',
  styleUrls: ['./detalles-view.component.css']
})
export class DetallesViewComponent implements OnInit {
  userCollectionData: any[] = [];
  searchQuery: string = ''; // Variable para almacenar la consulta de búsqueda
  currentIndex: number = 0;
  userData: any;
  detalleUser: any;
  prueba: any;
  user$ = this.userInfo.currentUserProfileInfo$;

  constructor(private userRegister: UserRegister,
    private userInfo: UserProfileInfoService,
    private userService: UserRegister,) {}

  ngOnInit(): void {
    this.userRegister.getAuthenticateUserCollection().then((data) => {
      this.userCollectionData = data;      
    });
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
}