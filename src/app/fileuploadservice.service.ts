import { CurrencyPipe } from '@angular/common';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';

import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { FileUpload } from 'src/models/FileUpload';

@Injectable({
  providedIn: 'root'
})
export class FileuploadserviceService {
  private basePath = '/certificates';
  cert:any = {
    url: '',
    name: '',
    est_id: ''
  };
  constructor(private firestore: AngularFirestore, private storage: AngularFireStorage) { }

  pushFileToStorage(fileUpload: FileUpload, data:any): Observable<number | undefined> {
    const currentDate = Date.now();
    const filePath = this.basePath + "/" + currentDate ;
    const storageRef = this.storage.ref(filePath);
    const uploadTask = this.storage.upload(filePath, fileUpload.file);
    

    uploadTask.snapshotChanges().pipe(
      finalize(() => {
        storageRef.getDownloadURL().subscribe(downloadURL => {
          this.cert.url = downloadURL;
          this.cert.name = fileUpload.file.name;
          this.cert.est_id = data.id;
          this.saveCerts(this.cert);
        });
      })
    ).subscribe();

    return uploadTask.percentageChanges();
  }

  saveCerts(data:any){
    return this.firestore.collection("certificates").doc().set(data);
  }
/* 
  getFiles(numberItems: number): AngularFireList<FileUpload> {
    return this.db.list(this.basePath, ref =>
      ref.limitToLast(numberItems));
  } 

  deleteFile(fileUpload: FileUpload): void {
    this.deleteFileDatabase(fileUpload.key)
      .then(() => {
        this.deleteFileStorage(fileUpload.name);
      })
      .catch(error => console.log(error));
  }

  private deleteFileDatabase(key: string): Promise<void> {
    return this.db.list(this.basePath).remove(key);
  }

  private deleteFileStorage(name: string): void {
    const storageRef = this.storage.ref(this.basePath);
    storageRef.child(name).delete();
  }*/
}
