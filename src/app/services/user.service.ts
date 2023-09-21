import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, User } from '@angular/fire/auth';
import { Observable, from } from 'rxjs';
import { collection, doc, docData, Firestore, getDoc, setDoc, updateDoc, getDocs,deleteDoc, addDoc } from '@angular/fire/firestore';
import { ResolveEnd } from '@angular/router';




// * El servicio funciona para implementar las funciones del login con Firebase

@Injectable({
  providedIn: 'root'
})
export class UserRegister {

 


  

  // * Constructor de la clase Auth (Firebase)
  constructor(private auth: Auth, private firestore: Firestore) { }

  // * Funciones de Firebase

  // Función register para crear un usuario con email y contraseña
  register({ email, password }: any) {
    return createUserWithEmailAndPassword(this.auth, email, password);
  }

  // Función login para iniciar sesión con email y contraseña
  login({ email, password }: any) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  // Función logOut para cerrar sesión
  logOut() {
    console.clear(); // Limpia la consola
    sessionStorage.clear();
    return signOut(this.auth);
  }



  //FUNCION QUE TRAE LA INFORMACIÓN DEL USUARIO LOGGEADO Y OBTIENE EL NOMBRE Y APELLIDO
  getAuthenticatedUserName(): Promise<any | null> {
    return new Promise(async (resolve, reject) => {
      const user = this.auth.currentUser;

      if (user) {
        try {
          const userId = user.uid;

          // Accede directamente al documento del usuario por su ID
          const userDocRef = doc(this.firestore, 'users', userId);

          // Obtén los datos del documento usando from para convertir la llamada en un observable
          const docSnap = await getDoc(userDocRef);

          if (docSnap.exists()) {
            const userData = docSnap.data() as any;
            const fullName = `${userData.firstName} ${userData.lastName}`;
            const rol = userData.rol;
            const id = userData.uid;
            const user = {
              "id": id,
              "fullName": fullName,
              "firstName" : userData.firstName,
              "lastName" : userData.lastName,
              "email" : userData.email,
              "phone" : userData.phone,
              
              "rol": rol
            }
            resolve(user);

          } else {

            resolve(null);
          }
        } catch (error) {
          console.error('Error al obtener datos de Firestore', error);
          resolve(null);
        }
      } else {
        resolve(null);
      }
    });
  }

  /**
   * Esta funcion es unicamente para obtener los calculos del usuario con sesion iniciada.
   * 
   * IMPORTANTE - Llamar a esta funcion en el lugar indicado. ¿Por qué? Esta funcion se debe ejecutar cuando 
   * se realice un nuevo registro para que esté en sintonía con la base de datos
   * 
   * @returns 
   */
  getAuthenticateUserCollection(): Promise<any | null> {
    return new Promise(async (resolve, reject) => {
      const user = this.auth.currentUser;
  
      if (user) {
        try {
          const userId = user.uid;
  
          const userDocRef = doc(this.firestore, 'users', userId);
  
          const docSnap = await getDoc(userDocRef);
  
          if (docSnap.exists()) {
            // Referencia a la colección de Calculos por medio del uid
            const collectionCalcRef = collection(this.firestore, 'users', userId, 'mis_prestamos');
            const arrayCalcDocsUser = await getDocs(collectionCalcRef);
            let arrayCalcDocs: any[] = [];
            // Obtiene la información de cada documento junto con su ID
            arrayCalcDocsUser.forEach((calcDoc) => {
              if (calcDoc.exists()) {
                const docData = calcDoc.data();
                const docId = calcDoc.id; // Aquí obtienes el ID del documento
                arrayCalcDocs.push({ id: docId, ...docData }); // Agrega el ID al objeto
              }
            });
            resolve(arrayCalcDocs);
            console.log(arrayCalcDocs);
          }
        } catch (error) {
          reject(error);
        }
      }
    });
  }
  
  /**
   * Con esta funcion obtenemos la informacion necesaria para pintar las dos tablas para la vista del admin
   * 1. Tabla para ver todos los usuarios registrados a la App
   * 2. Tabla para ver todos los calculos realizados agregar un campo de nombre de usuario para identificar el registro
   * 
   * 
   * IMPORTANTE - Llamar a esta funcion en el lugar indicado. ¿Por qué? Esta funcion se debe ejecutar cuando 
   * se realice un nuevo registro para que esté en sintonía con la base de datos
   * 
   * 
   * @returns 
   */
  getAllUsersInfo(): Promise<any | null> {
    return new Promise(async (resolve, reject) => {
      const user = this.auth.currentUser;

      if (user) {
        try {
          const usersCollectionRef = collection(this.firestore, 'users');

          let arrayUsers = await getDocs(usersCollectionRef);

          let objectAllinfoUsers: any = {};
          //recorremos los documentos de los usuarios para obtener el uid
          for (const doc of arrayUsers.docs) {
            const userData = doc.data();
            const userId = doc.id;

            const CalculosCollectionRef = collection(this.firestore, 'users', userId, 'mis_prestamos');

            const calculosArrayUsers = await getDocs(CalculosCollectionRef);

            let arrayCalcDocs: any[] = [];

            //Obtiene la informacion de cada Calculo realizado por el usuario
            calculosArrayUsers.forEach((calcDoc) => {
              if (calcDoc.exists()) {
                arrayCalcDocs.push(calcDoc.data());
              }
            });

            // Objeto final, la clave es el uid de cada usuario. El objeto fue creado de esta forma para que sea más facil acceder a la info
            objectAllinfoUsers[userId] = {
              userData,
              arrayCalcDocs,
            };
          }
          console.log(Object.values(objectAllinfoUsers))
          resolve(Object.values(objectAllinfoUsers));

        } catch (error) {
          reject(error);
        }
      }
    });
  }


  deleteUser(userUid: string): Promise<void> {
    return new Promise(async (resolve, reject) => {
        try {
          const docRef = doc(this.firestore, 'users', userUid);

          await deleteDoc(docRef);

          resolve();
        } catch (error) {
          reject(error);
        }
    });
  }

  deletePrestamo(Prestamoid: string): Promise<void> {
    return new Promise(async (resolve, reject) => {
        try {
          const docRef = doc(this.firestore, 'mis_prestamos', Prestamoid);

          await deleteDoc(docRef);

          resolve();
        } catch (error) {
          reject(error);
        }
    });
  }

  editUser(userUid:string, newData:any): Promise<void>{
    return new Promise(async (resolve, reject) => {
        try {
          console.log(newData.email);
          const docRef = doc(this.firestore, 'users', userUid);
          const prueba = collection(this.firestore, 'users');

          await updateDoc(docRef, newData);
          
          resolve();
        } catch (error) {
          reject(error);
        }
    });
  }

  async guardarDatosEnFirestore(formData: any): Promise<void> {
    try {
      const user = this.auth.currentUser;
      if (user) {
        const userId = user.uid;
        await addDoc(collection(this.firestore, `users/${userId}/mis_prestamos`), formData);
        alert('La solicitud de su Prestamo ha sido recibida');
      } else {
        throw new Error('El usuario no está autenticado');
      }
    } catch (error) {
      console.error('Error al guardar datos en Firestore:', error);
      throw error;
    }
  }

async updateCalculation(userId: string, calculationId: string, updatedCalculation: any): Promise<void> {
  try {

    console.log('userId:', userId);
    console.log('calculationId:', calculationId);
    console.log('updatedCalculation:', updatedCalculation);
    // Crear una referencia al documento de cálculo existente
    const calcRef = doc(this.firestore, 'users', userId, 'mis_prestamos', calculationId);

    // Actualiza el documento existente con los nuevos datos
    await updateDoc(calcRef, updatedCalculation);
    

    // La actualización se realizó con éxito
  } catch (error) {
  
    console.error('Error al actualizar el cálculo:', error);
    throw error;
  }
}

currentUser$ = new Observable<User | null>((observer) => {
  const unsubscribe = onAuthStateChanged(this.auth, (user) => {
    observer.next(user);
  });
  return unsubscribe;
});



async deleteCalculationById(userId: string, calculationId: string): Promise<void> {
  try {
    const calcRef = doc(this.firestore, 'users', userId, 'mis_prestamos', calculationId);
    await deleteDoc(calcRef);
    // La eliminación se realizó con éxito
  } catch (error) {
    console.error('Error al eliminar el cálculo por ID:', error);
    throw error;
  }
}


}