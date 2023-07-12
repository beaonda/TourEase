import { Component, OnInit } from '@angular/core';
import { FireserviceService } from '../../fireservice.service';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.page.html',
  styleUrls: ['./registration.page.scss'],
})
export class RegistrationPage implements OnInit {
  isModalOpen = false;
  estabList:any;
  
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



  setOpen(isOpen: boolean, estab:any) {
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
  }
  constructor(
    public router:Router, 
    public fireService:FireserviceService
  ) { 

  }

  ngOnInit() {
    this.retrieveEstabs();
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

}
