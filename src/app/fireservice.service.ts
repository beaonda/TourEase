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
  operations:any;
  opItem:any;
  contacts:any;
  contactItem:any;
  resort:any;
  resortItem:any;
  heritage:any;
  heritageItem:any;
  hike:any;
  hikeItem:any;
  photo:any;
  photoItem:any;
  cert:any;
  certItem:any;
  
  
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
    this.operationsCollection = firestore.collection<Op>('operations');
    this.opItems = this.operationsCollection.valueChanges();
    auth.authState.subscribe(op => {
      this.operations = op;
    });
    this.contactsCollection = firestore.collection<Con>('contacts');
    this.contactItems = this.contactsCollection.valueChanges();
    auth.authState.subscribe(con => {
      this.contacts = con;
    });
    this.resortsCollection = firestore.collection<Resort>('resort_info');
    this.resortItems = this.resortsCollection.valueChanges();
    auth.authState.subscribe(res => {
      this.resort = res;
    });
    this.heritageCollection = firestore.collection<Heritage>('heritage_info');
    this.heritageItems = this.heritageCollection.valueChanges();
    auth.authState.subscribe(her => {
      this.heritage = her;
    });
    this.hikeCollection = firestore.collection<Hike>('hike_info');
    this.hikeItems = this.hikeCollection.valueChanges();
    auth.authState.subscribe(hike => {
      this.hike = hike;
    });
    this.photoCollection = firestore.collection<Photo>('photos');
    this.photoItems = this.photoCollection.valueChanges();
    auth.authState.subscribe(photo => {
      this.photo = photo;
    });
    this.certCollection = firestore.collection<Cert>('certificates');
    this.certItems = this.certCollection.valueChanges();
    auth.authState.subscribe(cert => {
      this.cert = cert;
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

  private operationsCollection: AngularFirestoreCollection<Op>;
  opItems: Observable<Op[]>;
  addOperationsItem(opItem: Estab) {
    this.operationsCollection.add(opItem);
  }

  private contactsCollection: AngularFirestoreCollection<Con>;
  contactItems: Observable<Con[]>;
  addContactsItem(conItem: Estab) {
    this.operationsCollection.add(conItem);
  }

  private resortsCollection: AngularFirestoreCollection<Resort>;
  resortItems: Observable<Resort[]>;
  addResortsItem(resItem: Resort) {
    this.resortsCollection.add(resItem);
  }

  private heritageCollection: AngularFirestoreCollection<Heritage>;
  heritageItems: Observable<Heritage[]>;
  addHeritageItem(herItem: Resort) {
    this.heritageCollection.add(herItem);
  }

  private hikeCollection: AngularFirestoreCollection<Hike>;
  hikeItems: Observable<Hike[]>;
  addHikeItem(hikeItem: Resort) {
    this.hikeCollection.add(hikeItem);
  }

  private photoCollection: AngularFirestoreCollection<Photo>;
  photoItems: Observable<Photo[]>;
  addPhotoItem(photoItem: Resort) {
    this.photoCollection.add(photoItem);
  }

  private certCollection: AngularFirestoreCollection<Cert>;
  certItems: Observable<Cert[]>;
  addCertItem(certItem: Resort) {
    this.hikeCollection.add(certItem);
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
  saveHeritageInfo(data:any){
    return this.firestore.collection("heritage_info").doc(data.id).set(data);
  }
  saveHikeInfo(data:any){
    return this.firestore.collection("hike_info").doc(data.id).set(data);
  }
  savePhotos(data:any){
    return this.firestore.collection("photos").doc().set(data);
  }
  saveCerts(data:any){
    return this.firestore.collection("photos").doc().set(data);
  }
  getOperations(){
    return this.operationsCollection;
  }
  getContacts(){
    return this.contactsCollection;
  }
  getResortInfo(){
    return this.resortsCollection;
  }
  getHeritageInfo(){
    return this.heritageCollection;
  }
  getHikeInfo(){
    return this.hikeCollection;
  }
  getPhotos(){
    return this.photoCollection;
  }
  getCertificates(){
    return this.certCollection;
  }
  updateEstab(id: string, data: any): Promise<void> {
    return this.firestore.collection("establishments").doc(id).update(data);
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

export interface Photo {

}

export interface Cert {

}

export interface Estab {

}

export interface Op {

}

export interface Con {

}

export interface Resort {

}

export interface Heritage {

}

export interface Hike {

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



