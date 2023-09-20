import { Component, OnInit } from '@angular/core';
import { UserRegister } from 'src/app/services/user.service';

@Component({
  selector: 'app-tabla-usuarios',
  templateUrl: './tabla-usuarios.component.html',
  styleUrls: ['./tabla-usuarios.component.css']
})
export class TablaUsuariosComponent implements OnInit{
  collecionAllUsers:any[] =[];

  constructor(private userRegister: UserRegister) {}

  ngOnInit():void{
    this.userRegister.getAllUsersInfo().then((collecionAllUsers) => {
      this.collecionAllUsers = collecionAllUsers;
    });
  }
}
