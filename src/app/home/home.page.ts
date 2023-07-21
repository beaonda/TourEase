
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MenuController } from '@ionic/angular';
import Swiper from 'swiper';
import { IonMenu } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/compat/auth';

import { FireserviceService } from '../fireservice.service';
import { Router } from '@angular/router';
import { map } from 'rxjs';

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
  user:any;
  estabList:any;
  photoList:any;
  photoLink:any;
  estab:any;

  constructor(
    private menuController: MenuController,
    public router:Router, 
    public fireService:FireserviceService,
    public auth: AngularFireAuth
    ) {}

  ngOnInit() {
    this.initializeSwiper();
    this.retrieveEstabs();
    this.retrievePhotos();
    this.setPhoto();
  }

  retrieveEstabs(): void {
    this.fireService.getAllEstabs().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(data2 => {
      this.estabList = data2;
      this.fireService.getPhotos().snapshotChanges().pipe(
        map(changes =>
          changes.map(c =>
            ({ id: c.payload.doc.id, ...c.payload.doc.data() })
          )
        )
      ).subscribe(data => {
        console.log(data);
        for(var x in data2){
          for(var y in data){
            if(this.estabList[x].id == this.photoList[y].est_id){
              this.estabList[x].photoLink = this.photoList[y].imageUrl;
            }else{
              console.log("No photo found");
            }
          }
        }
      });
    });
  }

  retrievePhotos(): void {
    this.fireService.getPhotos().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(data => {
      console.log(data);
      this.photoList = data;
    });
  }


  setPhoto(){
    console.log(this.estabList);
    console.log(this.photoList);
    for(var x in this.estabList){
      for(var y in this.photoList){
        console.log("Iterate One");
        if(this.estabList[x].id == this.photoList[y].est_id){
          this.estabList[x].photoLink = this.photoList[y].imageUrl;
        }else{
          console.log("No photo found");
        }
      }
    }
  }


  logout(){
    this.auth.signOut().then(() => {
      this.router.navigate(['/login']);
   });
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