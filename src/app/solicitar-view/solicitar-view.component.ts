import { Component, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserRegister} from '../services/user.service'; // Importa UserService

@Component({
  selector: 'app-solicitar-view',
  templateUrl: './solicitar-view.component.html',
  styleUrls: ['./solicitar-view.component.css']
})
export class SolicitarViewComponent implements AfterViewInit{
  form: FormGroup;
  previousFormValues: any = {}; // Almacena los valores anteriores del formulario
  constructor(
    private fb: FormBuilder,
    private userRegister: UserRegister // Inyecta UserService en el constructor
  ) {
    this.form = this.fb.group({
      alias: [''],
      cantidad: [null],
      interes: [null],
      cuotas: ['default'],
      totalInteres: [''],
      monthly: ['']
    });
  }
  ngAfterViewInit() {
    this.previousFormValues = { ...this.form.value }; // Almacena los valores iniciales del formulario

    // Detecta cambios en el formulario y llama a calculateCuotas() si los valores han cambiado
    this.form.valueChanges.subscribe(() => {
      if (this.formValueChanged()) {
        this.calculateCuotas();
      }
    });
  }


  // Agrega un método para manejar el evento de clic del botón "Solicitar Préstamo"
  async solicitarPrestamo() {
    try {
      const formData = this.form.value;
      // Llama al método guardarDatosEnFirestore de UserService
      await this.userRegister.guardarDatosEnFirestore(formData);
      this.form.reset();
      // Si quieres redirigir al usuario a otra página después de guardar los datos, puedes hacerlo aquí
    } catch (error) {
      // Maneja errores si es necesario
    }
  }
  // Comprueba si los valores del formulario han cambiado
  formValueChanged(): boolean {
    const currentFormValues = this.form.value;
    return JSON.stringify(currentFormValues) !== JSON.stringify(this.previousFormValues);
  }


  calculateCuotas() {
    const cantidad = this.form.get('cantidad')?.value;
    const interes = this.form.get('interes')?.value;
    const cuotas = this.form.get('cuotas')?.value;

    if (cantidad !== null && interes !== null && cuotas !== 'default' && cuotas > 0) {
      const cuotaMensual = cantidad / cuotas;
      const cuotasConInteres = cuotaMensual + (cantidad * (interes / 100) / cuotas);
      this.form.get('monthly')?.setValue(cuotasConInteres.toFixed(2));
      this.form.get('totalInteres')?.setValue((cantidad * (interes / 100)).toFixed(2));
    } else {
      this.form.get('monthly')?.setValue('');
      this.form.get('totalInteres')?.setValue('');
    }

    // Actualiza los valores anteriores del formulario
    this.previousFormValues = { ...this.form.value };
  }

 
}