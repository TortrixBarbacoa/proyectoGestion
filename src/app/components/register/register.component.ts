import { ParseSourceFile } from '@angular/compiler';
import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms'; // <--- import FormControl, FormGroup
import { UserRegister } from 'src/app/services/user.service'; // <--- import UserService
import { UserProfileInfoService } from 'src/app/services/user-profile-info.service';
import { Router } from '@angular/router'; // <--- import Router
import { switchMap } from 'rxjs/operators';
import { UserCredential } from 'firebase/auth';


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
    private userService: UserRegister, 
    private router: Router,
    private userProfileInfo: UserProfileInfoService,
    
  ) { 
    this.formReg = new FormGroup({
      name: new FormControl(),
      lastName: new FormControl(),
      email: new FormControl(),
      password: new FormControl(),
      confirmPassword: new FormControl(),
      phoneNum: new FormControl(),
    });
  }

  get email (){
    return this.formReg.get('email');
  }

  get password (){
    return this.formReg.get('password');
  }

  get name (){
    return this.formReg.get('name');
  }

  get lastName (){
    return this.formReg.get('lastName');
  }

  get phoneNum (){
    return this.formReg.get('phoneNum');
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

  registerSuccess() {

    const { email, password, name, lastName, phoneNum } = this.formReg.value;
    if (!this.formReg.valid || !name || !password || !email || !lastName || !phoneNum) {
      return;
    }
    let rol = 'Usuario';
    this.userService
    .register({ email, password })
    .then((userCredential: UserCredential) => {
      const { user: { uid } } = userCredential;
      return this.userProfileInfo.addUser({ uid, email, firstName: name, lastName, phone: phoneNum, rol });
    })
    .then(() => {
      this.router.navigate(['/home']);
    })
    .catch((error) => {
    // Handle any errors during registration
    console.error('Registration failed:', error);
  });
}


  
}
