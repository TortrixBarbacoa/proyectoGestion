import { Injectable } from '@angular/core';
import { collection, doc, docData, Firestore, getDoc, setDoc, updateDoc } from '@angular/fire/firestore';
import { filter, from, map, Observable, of, switchMap } from 'rxjs';
import { usersInfo } from '../models/users-info';
import { UserRegister } from './user.service';
import { user } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class UserProfileInfoService {

  constructor( private firestore: Firestore, private userService: UserRegister ) { }

  get currentUserProfileInfo$(): Observable<usersInfo | null> {
    return this.userService.currentUser$.pipe(
      switchMap((user) => {
        if (!user?.uid) {
          return of(null)
        }

        const ref = doc(this.firestore, 'users', user?.uid);
        return docData(ref) as Observable<usersInfo>;
      })
    )
  }

  addUser(user: usersInfo): Observable<void> {
    const ref = doc(this.firestore, 'users', user.uid);
    return from(setDoc(ref, user));
  }

  
}
