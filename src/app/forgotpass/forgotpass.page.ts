import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-forgotpass',
  templateUrl: './forgotpass.page.html',
  styleUrls: ['./forgotpass.page.scss'],
})
export class ForgotpassPage implements OnInit {
  isOpen = false;
  link:any;
  setOpen() {
    this.isOpen = true;
  }
  constructor() { }

  ngOnInit() {
  }

}
