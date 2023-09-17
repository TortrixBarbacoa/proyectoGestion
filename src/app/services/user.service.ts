import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from '@angular/fire/auth';
import { Firestore, doc, setDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private auth: Auth, private firestore: Firestore) { }

  // Función register para crear un usuario con email y contraseña
  async register({ email, password }: any) {
    try {
      const userCredential = await createUserWithEmailAndPassword(this.auth, email, password);
      const name = email.split('@')[0];
      const uid = userCredential.user.uid;
      const userDocRef = doc(this.firestore, 'users', uid);

      // Datos del usuario a almacenar en Firestore
      const userData = {
        name: name,
        email: email,
        // Agrega otros datos del usuario aquí si es necesario
      };

      await setDoc(userDocRef, userData);
      return userCredential; // Devuelve el objeto de usuario si es necesario
    } catch (error) {
      console.error('Error al registrar el usuario:', error);
      throw error; // Puedes manejar el error de otra manera si es necesario
    }
  }

  // Función login para iniciar sesión con email y contraseña
  login({ email, password }: any) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  // Función logOut para cerrar sesión
  logOut() {
    return signOut(this.auth);
  }
}
