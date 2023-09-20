import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-solicitar-view',
  templateUrl: './solicitar-view.component.html',
  styleUrls: ['./solicitar-view.component.css']
})
export class SolicitarViewComponent {
  form: FormGroup;

  constructor(private fb: FormBuilder) {
    
    this.form = this.fb.group({
      alias: [''],
      creditor: ['default'],
      cantidad: [null],
      interes: [null],
      cuotas : [null],
      monthly: [null],
    });

    // Escuchar cambios en cantidad e interés para recalcular cuotas
    this.form.get('cantidad')?.valueChanges.subscribe(() => {
      this.calculateCuotas();
    });
    this.form.get('interes')?.valueChanges.subscribe(() => {
      this.calculateCuotas();
    });

    this.form.get('cuotas')?.valueChanges.subscribe(() => {
      this.calculateCuotas();
    });
  }

  calculateCuotas() {
    const cantidad = this.form.get('cantidad')?.value;
    const interes = this.form.get('interes')?.value;
    const cuotas = this.form.get('cuotas')?.value;

    if (cantidad !== null && interes !== null && cuotas !== null && cuotas > 0) {
      const cuotaMensual = cantidad / cuotas;
      const cuotasConInteres = cuotaMensual + (cantidad * (interes / 100));
      this.form.get('monthly')?.setValue(cuotasConInteres.toFixed(2));
    } else {
      this.form.get('monthly')?.setValue('');
    }}
}