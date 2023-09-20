import { Component, OnInit } from '@angular/core';
import { UserRegister } from 'src/app/services/user.service';

@Component({
  selector: 'app-detalles-view',
  templateUrl: './detalles-view.component.html',
  styleUrls: ['./detalles-view.component.css']
})
export class DetallesViewComponent implements OnInit {
  userCollectionData: any[] = [];
  searchQuery: string = ''; // Variable para almacenar la consulta de búsqueda
  currentIndex: number = 0;

  constructor(private userRegister: UserRegister) {}

  ngOnInit(): void {
    this.userRegister.getAuthenticateUserCollection().then((data) => {
      this.userCollectionData = data;
    });
  }
}