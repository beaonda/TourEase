import { Component, ElementRef, ViewChild } from '@angular/core';
import { Swiper } from 'swiper';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  @ViewChild ('swiper')
  swiperRef: ElementRef | undefined;
  swiper?: Swiper;
  
 
  constructor() {}

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