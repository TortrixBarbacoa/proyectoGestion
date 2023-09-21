import { Component, OnInit } from '@angular/core';
import { UserProfileInfoService } from 'src/app/services/user-profile-info.service';
import { UserRegister } from 'src/app/services/user.service';

@Component({
  selector: 'app-detalles-view',
  templateUrl: './detalles-view.component.html',
  styleUrls: ['./detalles-view.component.css']
})
export class DetallesViewComponent implements OnInit {
  
  collecionAllUsers: any[] = [];
  editCalculationData: any = null; // Almacena los datos de edición
  editCalculationIndex: number = -1; // Almacena el índice del préstamo que se está editando (-1 para indicar que no se está editando)
  editCalcId : any;
  editCalcAlias : any;
  editCalcMonthly: any;
  editCalcInteres: any;
  editCalcTotalInteres: any;
  totalInteres: any;
  userCollectionData: any[] = [];
  searchQuery: string = ''; // Variable para almacenar la consulta de búsqueda
  currentIndex: number = 0;
  userData: any;
  detalleUser: any;
  prueba: any;
  uid: string ='';
  user$ = this.userInfo.currentUserProfileInfo$;

  constructor(private userRegister: UserRegister,
    private userInfo: UserProfileInfoService,
    private userService: UserRegister,) {}

  ngOnInit(): void {

    
    this.userRegister.getAuthenticateUserCollection().then((data) => {
      this.userCollectionData = data;      
    });
    // Llama al servicio para obtener el userData y asignarlo a la propiedad
    this.userService.getAuthenticatedUserName().then((userData) => {
      this.userData = userData;
      console.log(userData);
    });
    this.userService.getAuthenticateUserCollection().then((detalleUser) => {
      this.detalleUser = detalleUser;
    });

    this.userService.getAllUsersInfo().then((collecionAllUsers) => {
      this.collecionAllUsers = collecionAllUsers;
    });
  }

openEditModal(calculo: any) {
  this.editCalcId= calculo.id; 
  this.editCalcAlias = calculo.alias;
  this.editCalcMonthly = calculo.monthly;
  this.editCalcInteres = calculo.interes;
  this.editCalcTotalInteres = calculo.totalInteres;

}

editCalculation() {
  // Crear un objeto con los datos actualizados
  const updatedCalculation = {
    alias: this.editCalcAlias,
    monthly: this.editCalcMonthly,
    interes: this.editCalcInteres,
    totalInteres: this.editCalcTotalInteres,
    // Otros campos si los tienes
  };

  // Llama a la función de tu servicio que actualiza el préstamo en Firestore
  this.userRegister.updateCalculation(this.userData.id, this.editCalcId, updatedCalculation)
    .then(() => {
     
      alert('Préstamo actualizado con éxito');
      // Cierra el modal (puedes utilizar código para cerrarlo si usas Bootstrap)
      // Actualiza la lista de cálculos después de eliminar uno
      this.refreshUserCollectionData();
    })
    .catch((error) => {
      // Error: Maneja el error apropiadamente, muestra un mensaje de error, etc.
      console.error('Error al actualizar el préstamo:', error);
      // Muestra un mensaje de error al usuario si es necesario
      alert('Error al actualizar el préstamo. Por favor, inténtalo de nuevo.');
    });
}

refreshUserCollectionData() {
  // Vuelve a cargar la colección de cálculos para el usuario actual
  this.userRegister.getAuthenticateUserCollection().then((data) => {
    this.userCollectionData = data;
  });
}

// ...

// Agrega este método para eliminar un cálculo por su ID
deleteCalculationById(userId: string, calculationId: string) {
  this.userRegister.deleteCalculationById(userId, calculationId)
    .then(() => {
      alert('Préstamo eliminado con éxito');
      // Actualiza la lista de cálculos después de eliminar uno
      this.refreshUserCollectionData();
    })
    .catch((error) => {
      console.error('Error al eliminar el préstamo:', error);
      alert('Error al eliminar el préstamo. Por favor, inténtalo de nuevo.');
    });
}

// ...


}