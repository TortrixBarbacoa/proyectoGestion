import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, User } from '@angular/fire/auth';
import { Observable, from } from 'rxjs';
import { collection, doc, docData, Firestore, getDoc, setDoc, updateDoc } from '@angular/fire/firestore';




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
  constructor(private auth: Auth,private firestore: Firestore) {}

  // * Funciones de Firebase

  // Función register para crear un usuario con email y contraseña
  register({email, password}: any) {
    return createUserWithEmailAndPassword(this.auth, email, password);
  }

  // Función login para iniciar sesión con email y contraseña
  login({email, password}: any) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  // Función logOut para cerrar sesión
  logOut() {
    return signOut(this.auth);
  }


  
  //FUNCION QUE TRAE LA INFORMACIÓN DEL USUARIO LOGGEADO Y OBTIENE EL NOMBRE Y APELLIDO
getAuthenticatedUserName(): Promise<string | null> {
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
          resolve(fullName);
          console.log(fullName)
          
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

}