import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { FireserviceService } from '../fireservice.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})

export class RegisterPage {
  mname:any;
  fname:any;
  lname:any;
  btnSubmit:any;
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
  RegisterForm: any;
  

  constructor( 
    public router:Router, 
    private alertController: AlertController, 
    public fireService: FireserviceService) 
    {
     
      
    }
 group: any;
 
    ngOnInit(){
      /* this.RegisterForm = new FormGroup({
        fname : new FormControl('',[Validators.required]),
        lname : new FormControl('',[Validators.required]),
        mname : new FormControl('',[Validators.required]),
        bdaylbl : new FormControl('',[Validators.required]),
        gender : new FormControl('',[Validators.required]),
        contact : new FormControl('',[Validators.required]),
        email : new FormControl('',[Validators.required]),
        address : new FormControl('',[Validators.required]),
        uname : new FormControl('',[Validators.required]),
        pword : new FormControl('',[Validators.required]),
        pword2 : new FormControl('',[Validators.required]),
      }); */
      
      }
    
    

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
 /* 
  onSubmit(){
    this.fireService.signup({email:this.email, pword:this.pword}).then(
      res=>{
        if(res.user?.uid){
          res.user.sendEmailVerification();
          let data = {
            uname: this.uname,
            uid: res.user?.uid,
            lname: this.group.lname,
            fname: this.group.fname,
            mname: this.group.mname,
            bday: this.bday,
            gender: this.gender,
            contact: this.contact,
            email: this.email,
            address: this.address,
          }
          this.fireService.saveDetails(data).then(
            res=>{
              alert("Account Created");
              this.router.navigate(['verify']);
            },   
            err=>{
              console.log(err);}
          );
        }
      }, err=>{
        alert(err.message);
        console.log(err);
      }
    );
  
  }
 */

  onSubmit(){
    
  }

}

