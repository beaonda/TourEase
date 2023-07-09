import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { collection } from 'firebase/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})



export class FireserviceService {
  user:any;
  
  constructor(
    public firestore: AngularFirestore, 
    public auth: AngularFireAuth
  ) {
    this.usersCollection = firestore.collection<User>('users');
    this.items = this.usersCollection.valueChanges();
    auth.authState.subscribe(user => {
      this.user = user;
    });
  }

  private usersCollection: AngularFirestoreCollection<User>;
  items: Observable<User[]>;
  addItem(item: User) {
    this.usersCollection.add(item);
  }
  getAuth(){
    return this.auth;
  }
  loginWithEmail(data:any) {
    return this.auth.signInWithEmailAndPassword(data.email, data.password);
  }
  signup(data:any) {
    return this.auth.createUserWithEmailAndPassword(data.email, data.pword);
  }
  saveDetails(data:any) {
    return this.firestore.collection("users").doc(data.uId).set(data);
  }
  getUserDetails(data:any) {
    return this.firestore.collection("users").doc(data.uId).valueChanges();
  }
  getAllUsername(){
    return this.firestore.collection("users").doc().valueChanges();
  }

  
  

 /*  getUserList(): Observable<User[]> {
   /*  return collectionData<User>(collection(this.firestore, 'users'), {
      idField: 'uId',
    });
  } */
  getAllUsers(){
    
       return this.usersCollection;
  }
  getCurrentUser(){
    return this.user;
  }
  verified = false;
  
  /* checkVerify(data:any) {
    this.user = this.auth.currentUser;
    if(this.user.emailVerified){

    }

  } */


}



export interface User {
  'address': string,
  'bday': string,
  'contact' : string,
  'email' : string,
  'fname' : string,
  'gender' : string,
  'lname' : string,
  'mname' : string,
  'uid' : string,
  'uname' : string
}



