import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { FireserviceService } from '../fireservice.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})

export class RegisterPage {
  public lname:any;
  public fname:any;
  public mname:any;
  public bday:any;
  public age:any;
  public gender:any;
  public contact:any;
  public email:any;
  public address:any;
  public uname:any;
  public pword:any;
  public pword2:any;
  public bdaylbl:any;
  constructor(private alertController: AlertController, public fireService: FireserviceService) {}

  openDatePicker() {
    // Open the date picker logic here
    // You can use Ionic's DatePicker component or a custom implementation
    // Example: You can show an alert with the date picker options
    this.alertController.create({
      header: 'Select Date',
      inputs: [
        {
          name: 'date',
          type: 'date',
          label: 'Date',
          value: '',
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Canceled');
          },
        },
        {
          text: 'OK',
          handler: (data) => {
            this.bday = data.date;
            console.log('Selected Date:', data.date);
            this.bdaylbl = this.bday;
          },
        },
      ],
    }).then((alert) => {
      alert.present();
    });
  }

  ngOnInit(){

  }

  onSubmit(){
    this.fireService.signup({email:this.email, pword:this.pword}).then(
      res=>{
        if(res.user?.uid){
          let data = {
            uname: this.uname,
            uid: res.user?.uid,
            lname: this.lname,
            fname: this.fname,
            mname: this.mname,
            bday: this.bday,
            gender: this.gender,
            contact: this.contact,
            email: this.email,
            address: this.address,
            pword: this.pword
          }
          this.fireService.saveDetails(data).then(
            res=>{
              alert("Account Created");}, 
            err=>{
              console.log(err);}
          );
        }
      }, err=>{
        alert(err.message);
        console.log(err);
      }
    )
  }

}

