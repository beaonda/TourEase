import { Component, OnInit } from '@angular/core';
import { FireserviceService } from '../fireservice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginType: string = 'user';
  public email:any;
  public password:any;


  constructor(
    public router:Router, 
    public fireService:FireserviceService
    ) { 
    

  }

  ngOnInit() {
  }

  login(){
    this.fireService.loginWithEmail({email:this.email, password:this.password}).then((res:any)=>{
      console.log(res);
      if(res.user.uid){
        this.fireService.getDetails({uid:res.user.uid}).subscribe((res:any)=>{
          console.log(res);
          alert("Welcome " + res['name']);
        }, (err:any)=>{
          console.log(err);
        });
      }
    }, (err:any)=>{
      alert(err.message);
      console.log(err)
    });
  }

}
