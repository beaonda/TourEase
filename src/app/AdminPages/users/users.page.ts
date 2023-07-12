import { Component, OnInit } from '@angular/core';
import { FireserviceService } from '../../fireservice.service';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-users',
  templateUrl: './users.page.html',
  styleUrls: ['./users.page.scss'],
})
export class UsersPage implements OnInit {

  constructor(
    public router:Router, 
    public fireService:FireserviceService
  ) { 

  }
  usersList:any;
  users:any;
  users2:any;

  ngOnInit() {
    /* this.usersList = this.fireService.getAllUsers().subscribe({
      next(position:any, item:any){
        console.log('Current position', position);
        this.users = item;
      }, error(msg:any){
        console.log('Error getting location', msg);
      } 
    });
    this.usersList$ = this.fireService.getAllUsers();*/
    this.retrieveUsers();
  }


  retrieveUsers(): void {
    this.fireService.getAllUsers().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(data => {
      this.usersList = data;
    });
  }

}

