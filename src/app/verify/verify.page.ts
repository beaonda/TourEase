import { Component, OnInit } from '@angular/core';
import { FireserviceService } from '../fireservice.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-verify',
  templateUrl: './verify.page.html',
  styleUrls: ['./verify.page.scss'],
})
export class VerifyPage implements OnInit {
  email:any;
  user:any;
  constructor(
    public router:Router, 
    public fireService:FireserviceService
  ) {

  }

  link:any;
  ngOnInit() {
    this.user = this.fireService.getCurrentUser();
    console.log(this.user);
    this.email = '' + this.user.email;

    if(this.user.emailVerified == false){
      this.user.sendEmailVerification();
    } else {
      this.router.navigate(['home']);
    }

  /*   this.link = document.getElementById("click")?.addEventListener('click', this.clickHere); */
  }

  clickHere(){
    this.user.sendEmailVerification();
    alert("Email Sent");
  }
}
