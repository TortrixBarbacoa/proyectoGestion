import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, getAdditionalUserInfo, onAuthStateChanged, User, authState } from '@angular/fire/auth';
import { Observable } from 'rxjs';

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
  constructor(private auth: Auth) {}

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

}