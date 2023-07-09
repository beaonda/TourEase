import { Component, ElementRef, ViewChild } from '@angular/core';
import { Swiper } from 'swiper';
import { FireserviceService } from '../fireservice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  @ViewChild ('swiper')
  swiperRef: ElementRef | undefined;
  swiper?: Swiper;
  
 
  constructor( public fireService:FireserviceService, public router:Router,) {}

  ngOnInit() {

  }

  swiperSlideChanged(e: any) {
    console.log('changed', e);
  }

  swiperReady() {
    this. swiper = this.swiperRef?.nativeElement.swiper;
  }

  goNext(){
    this.swiper?.slideNext();
  }

  goPrev() {
    this.swiper?.slidePrev();
  }
}