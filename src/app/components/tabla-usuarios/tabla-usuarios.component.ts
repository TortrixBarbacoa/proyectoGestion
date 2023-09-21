import { Component, OnInit } from '@angular/core';
import { UserRegister } from 'src/app/services/user.service';

@Component({
  selector: 'app-tabla-usuarios',
  templateUrl: './tabla-usuarios.component.html',
  styleUrls: ['./tabla-usuarios.component.css']
})


export class TablaUsuariosComponent implements OnInit {
  collecionAllUsers: any[] = [];
  firstname: string = '';
  lastname: string = '';
  rol: string = '';
  email: string = '';
  phone: number = 0;
  uid: string ='';
  isOpen: boolean= false;

  constructor(private userRegister: UserRegister) { }

  ngOnInit(): void {
    this.userRegister.getAllUsersInfo().then((collecionAllUsers) => {
      this.collecionAllUsers = collecionAllUsers;
    });
  }

  deleteUserUid(userId: string) {
    this.userRegister.deleteUser(userId)
      .then(() => {
        alert('Succesfully');

        this.collecionAllUsers = this.collecionAllUsers.filter(item => item.userData.uid !== userId);
        console.log(this.collecionAllUsers);
      })
      .catch((error) => {

        alert('Error: ' + error);
      });
  }

  getDataUser(userId: string) {
    if(!this.isOpen){
      let editUser = this.collecionAllUsers.filter(item => item.userData.uid === userId);
    console.log('--------------', editUser);
    this.firstname = editUser[0].userData.firstName;
    this.uid = editUser[0].userData.uid;
    this.lastname = editUser[0].userData.lastName;
    this.rol = editUser[0].userData.rol;
    this.email = editUser[0].userData.email;
    this.phone = editUser[0].userData.phone;
    this.isOpen =true;
    } 
  } 

  editUserUid(userId:any, user_firstname:any,user_lastname:any, user_rol:any, user_phone:any,user_email:any){
    
    let newData = {
      "firstName" : user_firstname,
      "lastName" : user_lastname,
      "rol" : user_rol,
      "phone" : user_phone,
      "email" : user_email,
      "uid" : userId
    }

    this.userRegister.editUser(userId, newData)
      .then(() => {
        alert('Usuario actualizado con éxito');

      })
      .catch((error) => {
        alert('Error: '+ error);
      });

      

      this.firstname = '';
      this.lastname = '';
      this.rol = '';
      this.email = '';
      this.uid = '';
      this.phone = 0; 
  }
}
