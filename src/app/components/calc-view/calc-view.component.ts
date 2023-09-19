import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { UserRegister } from 'src/app/services/user.service';
import { UserProfileInfoService } from 'src/app/services/user-profile-info.service';
import { Router } from '@angular/router';
import { UserCredential } from 'firebase/auth';

@Component({
  selector: 'app-calc-view',
  templateUrl: './calc-view.component.html',
  styleUrls: ['./calc-view.component.css']
})
export class CalcViewComponent {
  formCalc: FormGroup;
  public errorFire = '';
  titulo: string = 'Calculadora de Intereses';

  constructor(
    private userService: UserRegister,
    private router: Router,
    private userProfileInfo: UserProfileInfoService,
  ) {
    this.formCalc = new FormGroup({
      Capital: new FormControl(),
      Cuotas: new FormControl(),
      Tasa: new FormControl(),
    });
  }

// Funcion que calcula el interes simple
calcular() {
  // Se obtienen los valores del formulario
  const capital = this.formCalc.get('Capital')?.value;
  const cuotas = this.formCalc.get('Cuotas')?.value;
  const tasa = this.formCalc.get('Tasa')?.value;

  // Calculo del interés simple
  const interes = capital*(tasa/ 100)*cuotas;

  // Imprime los valores en la consola
  console.log('Capital:', capital);
  console.log('Cuotas:', cuotas);
  console.log('Tasa de Interés:', tasa);
  console.log('Interés:', interes);
}
}
