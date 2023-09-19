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
  cuotaM: number = 0;  
  interes: number=0;
  cuotas: number=0;
  total: number=0;
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
  this.cuotas = this.formCalc.get('Cuotas')?.value;
  const tasa = this.formCalc.get('Tasa')?.value;

  // Calculo del interés simple
  this.interes= capital/this.cuotas*tasa/100;

  this.cuotaM= capital/this.cuotas;
  this.total=this.interes + this.cuotaM;

  // Redondear a dos decimales
  this.interes = Math.round(this.interes * 100) / 100;
  this.total = Math.round(this.total * 100) / 100;
  this.cuotaM = Math.round(this.cuotaM * 100) / 100;
}
}
