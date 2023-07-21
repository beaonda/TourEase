import { Component, OnInit } from '@angular/core';
import { FireserviceService } from '../../fireservice.service';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.page.html',
  styleUrls: ['./registration.page.scss'],
})
export class RegistrationPage implements OnInit {
  isModalOpen = false;
  estabList:any;
  opList:any;
  contactList:any;
  resortList:any;
  heritageList:any;
  hikeList:any;
  photoList:any;
  certList:any;
  selectedCategory:any = {
    name:'',
  }
  photoDoc:any;
  currentId:any;


  async confirmAlert() {
    const alert = await this.alertController.create({
      header:"Are you sure you want to approve this registration?",
      buttons:[
        {
          text:'Yes',
          role:'confirm',
          handler: () => {
            console.log(this.currentId);
            this.fireService.updateEstab(this.currentId, { bus_regStatus: 'Approved'})
            .then(() => {
              this.confirm();
            })
            .catch(err => console.log(err));
          },
        },
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            
          },
        },
      ],
    });

    await alert.present();
  }

  confirm(){
    alert("Status updated successfully");
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header:"Please enter your reason for declining",
      buttons:this.alertButtons,
      inputs:[{
        placeholder: 'Reason',
        name: 'reason',
      },],
    });

    await alert.present();
  }
  public alertButtons = [
    {
      text: 'Cancel',
      role: 'cancel',
      handler: () => {
        
      },
    },
    {
      text: 'OK',
      role: 'confirm',
      handler: (alertData:any) => {
        console.log(this.currentId);
       this.fireService.updateEstab(this.currentId, { bus_regStatus: alertData.reason})
      .then(() => {
       alert("The status was updated successfully!");
      })
      .catch(err => console.log(err));
      },
    },
  ];
  
  user_lname:any;
  user_fname:any;
  user_mname:any;
  user_contact:any;
  user_email:any;
  bus_username:any;
  bus_name:any;
  user_pos:any;
  bus_loc:any;
  bus_exlink:any;
  bus_email:any;
  bus_rates:any;
  bus_desc:any;
  bus_category:any;

  daysOpen:any = "";
  open_from:any = "";
  open_to:any = "";

  con_name:any;
  con_pos:any;
  con_num:any;
  con_mail:any;

  photoLink:any ="";
  certLink:any = "";

  resortForm = {  
    pools: '',
    rooms: '',
    ac: '',
    activities: '',
    rates: ''
  };

  heritageForm = {
    est_id: '',
    categ: '',
    accessibility: '',
    otherInput: '',
    date_heritage: '',
    guidedtours: '',
    photography: '',
    facilities: '',
    rates: ''
  };

  hikesandtrailsForm = {
    est_id: '',
    name_mountain: '',
    difficulty: '',
    length: '',
    route: '',
    suitability: '',
    act: '',
    type_fee: '',
    rates:'',
    description: '',
    elevation: '',
  };
  handleChange(e:any, estab:any) {
    if(e.detail.value == "Approve"){
      this.confirmAlert();
      this.currentId = estab.id;
    }else if(e.detail.value == "Decline"){
      this.presentAlert();
      this.currentId = estab.id;
    }
  }

  setOpen(isOpen: boolean, estab:any) {
    
    this.open_from = "";
    this.open_to = "";
    this.photoLink = "";
    this.certLink = "";
    console.log("estab.id" + " " + estab.id);
    this.daysOpen = this.setOperations(estab.id);
    console.log(this.opList);
    if(estab.bus_category == "HERITAGE"){
      this.setHeritageInfo(estab.id);
    } else if (estab.bus_category == "RESORT"){
      this.setResortInfo(estab.id);
    } else if (estab.bus_category == "HIKES AND TRAILS"){
      this.setHikeInfo(estab.id);
    }
    this.setResortInfo(estab.id);
    this.setContact(estab.id);
    this.isModalOpen = isOpen;
    this.user_lname = estab.user_lname;
    this.user_fname = estab.user_fname;
    this.user_mname = estab.user_mname;
    this.user_contact = estab.user_contact;
    this.user_email = estab.user_email;
    this.bus_username = estab.bus_username;
    this.bus_name = estab.bus_name;
    this.user_pos = estab.user_pos;
    this.bus_loc = estab.bus_add1 + ' ' + estab.bus_add2 + ' ' + estab.bus_brgy + ' ' + estab.bus_city + ' ' + estab.bus_province;
    this.bus_exlink = estab.bus_exlink;
    this.bus_email = estab.bus_email;
    this.bus_rates = estab.bus_rates;
    this.bus_desc = estab.bus_desc;
    this.selectedCategory.name = estab.bus_category;
    this.setPhoto(estab.id);
    this.setCert(estab.id);
    console.log(this.certLink);
  }

  constructor(
    public router:Router, 
    public fireService:FireserviceService,
    private alertController: AlertController,
  ) { 

  }

  ngOnInit() {
    this.retrieveEstabs();
    this.retrieveOperations();
    this.retrieveContacts();
    this.retrieveResorts();
    this.retrieveHeritage();
    this.retrieveHike();
    this.retrievePhotos();
    this.retrieveCerts();
  }


  retrieveEstabs(): void {
    this.fireService.getAllEstabs().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(data => {
      this.estabList = data;
    });
  }

  retrieveContacts(): void {
    this.fireService.getContacts().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(data => {
      this.contactList = data;
    });
  }

  retrieveResorts(): void {
    this.fireService.getResortInfo().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(data => {
      this.resortList = data;
    });
  }

  retrieveHeritage(): void {
    this.fireService.getHeritageInfo().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(data => {
      this.heritageList = data;
    });
  }

  retrieveHike(): void {
    this.fireService.getHikeInfo().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(data => {
      this.hikeList = data;
    });
  }

  retrieveOperations(): void {
    this.fireService.getOperations().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(data => {
      this.opList = data;
    });
  }

  retrievePhotos(): void {
    this.fireService.getPhotos().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(data => {
      this.photoList = data;
    });
  }

  retrieveCerts(): void {
    this.fireService.getCertificates().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(data => {
      this.certList = data;
    });
  }

  setPhoto(est:any){
    for(var key in this.photoList){
      if(this.photoList[key].est_id == est){
        this.photoLink = this.photoList[key].imageUrl;
      }
    }
  }

  setCert(est:any){
    for(var key in this.certList){
      if(this.certList[key].est_id == est){
        this.certLink = this.certList[key].url;
      }
    }
  }


  setContact(est:any){
    for(var key in this.contactList){
      if(this.contactList[key].est_id == est){
        this.con_name = this.contactList[key].contact_name;
        this.con_mail = this.contactList[key].contact_email;
        this.con_pos = this.contactList[key].contact_pos;
        this.con_num = this.contactList[key].contact_number;
      }
    }
  }

  setResortInfo(est:any){
    for(var key in this.resortList){
      if(this.resortList[key].est_id == est){
        this.resortForm.rooms = this.resortList[key].no_of_rooms;
        this.resortForm.ac = this.resortList[key].airconditioned;
        this.resortForm.activities = this.resortList[key].activities;
        this.resortForm.pools = this.resortList[key].no_of_pools;
        this.resortForm.rates = this.resortList[key].rates;
      }
    }
  }

  setHeritageInfo(est:any){
    for(var key in this.heritageList){
      if(this.heritageList[key].est_id == est){
      this.heritageForm.categ = this.heritageList[key].categ;
      this.heritageForm.accessibility = this.heritageList[key].accessibility;
      this.heritageForm.otherInput = this.heritageList[key].otherInput;
      this.heritageForm.date_heritage = this.heritageList[key].date_heritage;
      this.heritageForm.guidedtours = this.heritageList[key].guidedtours;
      this.heritageForm.photography = this.heritageList[key].photography;
      this.heritageForm.facilities = this.heritageList[key].facilities;
      this.heritageForm.rates = this.heritageList[key].rates;
      }
    }
  }

  setHikeInfo(est:any){
    for(var key in this.hikeList){
      if(this.hikeList[key].est_id == est){
        
        this.hikesandtrailsForm.name_mountain = this.hikeList[key].name_mountain;
        this.hikesandtrailsForm.difficulty = this.hikeList[key].difficulty;
        this.hikesandtrailsForm.length = this.hikeList[key].length;
        this.hikesandtrailsForm.route = this.hikeList[key].route;
        this.hikesandtrailsForm.suitability = this.hikeList[key].suitability;
        this.hikesandtrailsForm.act = this.hikeList[key].act;
        this.hikesandtrailsForm.type_fee = this.hikeList[key].type_fee;
        this.hikesandtrailsForm.rates = this.hikeList[key].rates;
        this.hikesandtrailsForm.elevation = this.hikeList[key].elevation;
      }
    }
  }

  setOperations(est:any){
    var daysOpen:any = "";
    for(var key in this.opList){

      if(this.opList[key].est_id == est){
        if(this.opList[key].mon == true){
          daysOpen = daysOpen + " Monday, ";
        }
        if(this.opList[key].tue == true){
          daysOpen = daysOpen + " Tuesday, ";
        }
        if(this.opList[key].wed == true){
          daysOpen = daysOpen + " Wednesday, ";
        }
        if(this.opList[key].thu == true){
          daysOpen = daysOpen + " Thursday, ";
        }
        if(this.opList[key].fri == true){
          daysOpen = daysOpen + " Friday, ";
        }
        if(this.opList[key].sat == true){
          daysOpen = daysOpen + " Saturday, ";
        }
        if(this.opList[key].sun == true){
          daysOpen = daysOpen + " Sunday, ";
        }
        this.open_from = this.opList[key].timeFrom;
        this.open_to = this.opList[key].timeTo;
      }else{

      }
      
    }
    return daysOpen;
  }

}
