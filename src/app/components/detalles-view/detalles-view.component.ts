import { Component, OnInit } from '@angular/core';
import { UserRegister } from 'src/app/services/user.service';

@Component({
  selector: 'app-detalles-view',
  templateUrl: './detalles-view.component.html',
  styleUrls: ['./detalles-view.component.css']
})
export class DetallesViewComponent implements OnInit {
  userCollectionData: any[] = []; // Aquí almacenarás los datos de la colección "Calculos"
  currentIndex: number = 0; // Variable para el índice actual
  constructor(private userRegister: UserRegister) {}

  ngOnInit(): void {
    // Llama al servicio para obtener los datos de la colección "Calculos"
    this.userRegister.getAuthenticateUserCollection().then((data) => {
      this.userCollectionData = data;
    });
  }
}
