import { Component } from '@angular/core';
import { Router } from '@angular/router'; // <--- import Router
import { UserService } from 'src/app/services/user.service'; // <--- import UserService

@Component({
  selector: 'app-main-app',
  templateUrl: './main-app.component.html',
  styleUrls: ['./main-app.component.css']
})
export class MainAppComponent {

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
}
