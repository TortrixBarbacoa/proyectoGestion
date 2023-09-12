import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {

  formReg: FormGroup;
  public errorFire = '';


  constructor(
    private userService: UserService, 
    private router: Router
  ) { 
    this.formReg = new FormGroup({
      email: new FormControl(),
      password: new FormControl(),
      confirmPassword: new FormControl()
    });
  }

  onSubmit() {
    this.userService.login(this.formReg.value)
      .then(response => {  
        console.log(response);
        this.formReg.reset();
        this.router.navigate(['/home']);
      })

      .catch( (error) => {
        this.errorFire = error.message;
        this.formReg.reset();
      } )
  }

}
