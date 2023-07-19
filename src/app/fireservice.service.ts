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
  estab:any;
  estabItem:any;
  
  
  constructor(
    public firestore: AngularFirestore, 
    public auth: AngularFireAuth
  ) {
    this.usersCollection = firestore.collection<User>('users');
    this.items = this.usersCollection.valueChanges();
    auth.authState.subscribe(user => {
      this.user = user;
    });
    this.estabCollection = firestore.collection<Estab>('establishments');
    this.estabItems = this.estabCollection.valueChanges();
    auth.authState.subscribe(estab => {
      this.estab = estab;
    });
  }

  private usersCollection: AngularFirestoreCollection<User>;
  items: Observable<User[]>;
  addUserItem(item: User) {
    this.usersCollection.add(item);
  }

  private estabCollection: AngularFirestoreCollection<Estab>;
  estabItems: Observable<Estab[]>;
  addEstabItem(estabItem: Estab) {
    this.estabCollection.add(estabItem);
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
  saveEstDetails(data:any){
    return this.firestore.collection("establishments").doc(data.id).set(data);
  }
  saveOperations(data:any){
    return this.firestore.collection("operations").doc(data.id).set(data);
  }
  saveContacts(data:any){
    return this.firestore.collection("contacts").doc(data.id).set(data);
  }
  saveResortInfo(data:any){
    return this.firestore.collection("resort_info").doc(data.id).set(data);
  }
  

  

  
  

 /*  getUserList(): Observable<User[]> {
   /*  return collectionData<User>(collection(this.firestore, 'users'), {
      idField: 'uId',
    });
  } */
  getAllUsers(){
       return this.usersCollection;
  }
  getAllEstabs(){
    return this.estabCollection;
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

export interface Estab {

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



