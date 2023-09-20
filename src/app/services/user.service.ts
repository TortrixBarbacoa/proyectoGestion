import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, User } from '@angular/fire/auth';
import { Observable, from } from 'rxjs';
import { collection, doc, docData, Firestore, getDoc, setDoc, updateDoc, getDocs } from '@angular/fire/firestore';
import { ResolveEnd } from '@angular/router';




// * El servicio funciona para implementar las funciones del login con Firebase

@Injectable({
  providedIn: 'root'
})
export class UserRegister {

  currentUser$ = new Observable<User | null>((observer) => {
    const unsubscribe = onAuthStateChanged(this.auth, (user) => {
      observer.next(user);
    });
    return unsubscribe;
  });


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
            const user = {
              "fullName": fullName,
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
            //Referencia a la colección de Calculos por medio del uid
            const collectionCalcRef = collection(this.firestore, 'users', userId, 'Calculos');
            const arrayCalcDocsUser = await getDocs(collectionCalcRef);
            let arrayCalcDocs: any[] = [];
            //Obtiene la informacion de cada documento
            arrayCalcDocsUser.forEach((calcDoc) => {
              if (calcDoc.exists()) {
                arrayCalcDocs.push(calcDoc.data());
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

            const CalculosCollectionRef = collection(this.firestore, 'users', userId, 'Calculos');

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


}