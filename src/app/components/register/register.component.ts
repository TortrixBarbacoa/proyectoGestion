import { ParseSourceFile } from '@angular/compiler';
import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {


  formReg: FormGroup;
  public errorFire = '';


  constructor(
    private userService: UserService, 
    private router: Router
  ) { 
    this.formReg = new FormGroup({
      email: new FormControl(),
      password: new FormControl()
    });
  }

  

  ngOnInit(): void {
  }

  onSubmit() {
    if (this.formReg.value.password === this.formReg.value.confirmPassword) {
      this.registerSuccess();
    } else if (this.formReg.value.password !== this.formReg.value.confirmPassword) {
      this.errorFire = 'Las contraseñas no coinciden';
      this.formReg.reset();
    }
  }

  registerSuccess() {
    this.userService.register(this.formReg.value)
      .then(response => {  
        console.log(response);
        this.formReg.reset();
        this.router.navigate(['/login']);
      })

      .catch( (error) => {
        this.errorFire = error.message;
        this.formReg.reset();
      } )
  }
}
