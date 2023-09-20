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
  
    // Verificar si existen datos en localStorage y cargarlos si es necesario
    const savedInteres = sessionStorage.getItem('interes');
    const savedCuotaM = sessionStorage.getItem('cuotaM');
    const savedTotal = sessionStorage.getItem('total');
  
    if (savedInteres && savedCuotaM && savedTotal) {
      this.interes = parseFloat(savedInteres);
      this.cuotaM = parseFloat(savedCuotaM);
      this.total = parseFloat(savedTotal);
    }
  }

// Funcion que calcula el interes simple
calcular() {
  // Se obtienen los valores del formulario
  const capital = this.formCalc.get('Capital')?.value;
  this.cuotas = this.formCalc.get('Cuotas')?.value;
  const tasa = this.formCalc.get('Tasa')?.value;

  // Calculo del interés mensual es la cantidad inicial OSEA EL CAPITAL 
  //partido la cantidad de cuotas por la tasa de interes dividio 100
  this.interes= capital/this.cuotas*tasa/100;
  //El valor de la cuota mensual es el capital dividido la cantidad de cuotas 
  this.cuotaM= capital/this.cuotas;
  // Calculo del total a pagar es el interes mas el capital
  this.total=this.interes + this.cuotaM;

  // Redondear a dos decimales
  this.interes = Math.round(this.interes * 100) / 100;
  this.total = Math.round(this.total * 100) / 100;
  this.cuotaM = Math.round(this.cuotaM * 100) / 100;

    // Guardar los datos en sessionStorage
    sessionStorage.setItem('interes', this.interes.toString());
    sessionStorage.setItem('cuotaM', this.cuotaM.toString());
    sessionStorage.setItem('total', this.total.toString());
}
}
