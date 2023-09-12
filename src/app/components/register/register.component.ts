import { ParseSourceFile } from '@angular/compiler';
import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms'; // <--- import FormControl, FormGroup
import { UserService } from 'src/app/services/user.service'; // <--- import UserService
import { Router } from '@angular/router'; // <--- import Router


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  // * Declaración de variables
  formReg: FormGroup;
  public errorFire = ''; // Usada para mostrar mensaje de error en la vista


  // * Constructor userService y Router
  constructor(
    private userService: UserService, 
    private router: Router
  ) { 
    this.formReg = new FormGroup({
      email: new FormControl(),
      password: new FormControl()
    });
  }

  // * Método onSubmit para validar si las contraseñas coinciden
  onSubmit() {
    if (this.formReg.value.password === this.formReg.value.confirmPassword) {
      this.registerSuccess(); // Si las contraseñas coinciden, se ejecuta el método registerSuccess
    } else if (this.formReg.value.password !== this.formReg.value.confirmPassword) {
      this.errorFire = 'Las contraseñas no coinciden';
      this.formReg.reset(); // Si las contraseñas no coinciden, se resetea el formulario y se muestra un mensaje de error en la vista
    }
  }

  // * Método registerSuccess para registrar usuario (Se ejecuta si las contraseñas coinciden)
  registerSuccess() {
    this.userService.register(this.formReg.value)
      .then(response => {  
        console.log(response);
        this.formReg.reset();
        this.router.navigate(['/login']);
      }) // Si el usuario se registra correctamente, se resetea el formulario y se redirige a la página de login

      .catch( (error) => {
        this.errorFire = error.message;
        this.formReg.reset();
      } ) // Si el usuario no se registra correctamente, se resetea el formulario y se muestra un mensaje de error en la vista
  }
}
