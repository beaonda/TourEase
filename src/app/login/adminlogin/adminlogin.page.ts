import { Component, OnInit } from '@angular/core';
import { FireserviceService } from '../../fireservice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-adminlogin',
  templateUrl: './adminlogin.page.html',
  styleUrls: ['./adminlogin.page.scss'],
})
export class AdminloginPage implements OnInit {

  constructor(
    public router:Router, 
  ) { }

  ngOnInit() {
  }

  adLog(){
    this.router.navigate(['dashboard']);
  }

}
