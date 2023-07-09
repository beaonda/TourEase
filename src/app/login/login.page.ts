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
  user:any;
  login(){
    this.fireService.loginWithEmail({email:this.email, password:this.password}).then((res:any)=>{
      console.log(res);
      this.user = this.fireService.getCurrentUser();
      if(this.user.emailVerified){
        this.router.navigate(['home']);
      }else if (this.user.emailVerified == false){  
        this.router.navigate(['verify']);
      }else{
        alert("User Error");
      }
      if(res.user.uid){
        this.fireService.getUserDetails({uid:res.user.uid}).subscribe((res:any)=>{
          console.log(res);
  
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
