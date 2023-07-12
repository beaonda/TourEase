
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MenuController } from '@ionic/angular';
import Swiper from 'swiper';
import { IonMenu } from '@ionic/angular';


import { FireserviceService } from '../fireservice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  @ViewChild('swiper', { static: false }) swiperRef?: ElementRef<HTMLDivElement>;
  swiper?: Swiper;

  loginType: string ='default';
  e:any;

  constructor(private menuController: MenuController) {}

  ngOnInit() {
    this.initializeSwiper();
  }

  initializeSwiper() {
    if (this.swiperRef) {
      this.swiper = new Swiper(this.swiperRef.nativeElement, {
        loop: true,
        pagination: true,
        virtualTranslate:true,
        speed: 500,
        autoplay: {
          delay: 1000,
        },
        on: {
          init: () => {
            this.swiperReady();
          },
          slideChange: () => {
            this.swiperSlideChanged(this.e);
          },
        },
      });
    }
  }

  swiperSlideChanged(e: any) {
    console.log('changed', e);
  }

  swiperReady() {
    console.log('swiper ready');
  }

  openMenu() {
    this.menuController.open('end');
  }

  navigateTo(page: string) {
    // Handle navigation to different pages
    console.log('Navigating to', page);
  }

}