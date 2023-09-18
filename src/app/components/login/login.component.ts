import { Component } from '@angular/core';
import { Router } from '@angular/router'; // <--- import Router
import { FormControl, FormGroup } from '@angular/forms'; // <--- import FormControl, FormGroup
import { UserRegister } from 'src/app/services/user.service'; // <--- import UserService

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {

  // * Declaración de variables
  formReg: FormGroup;
  public errorFire = ''; // Usada para mostrar mensaje de error en la vista

  // * Constructor userService y Router
  constructor(
    private userService: UserRegister, 
    private router: Router
  ) { 
    this.formReg = new FormGroup({
      email: new FormControl(),
      password: new FormControl(),
      confirmPassword: new FormControl()
    });
  }

  // * Método onSubmit para iniciar sesión
  onSubmit() {
    this.userService.login(this.formReg.value)
      .then(response => {  
        console.log(response);
        this.formReg.reset();
        this.router.navigate(['/home']);
      }) // Si el usuario se loguea correctamente, se resetea el formulario y se redirige a la página de home

      .catch( (error) => {
        this.errorFire = error.message;
        this.formReg.reset();
      } ) // Si el usuario no se loguea correctamente, se resetea el formulario y se muestra un mensaje de error en la vista
  }

}
