import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
@Component({
  selector: 'app-register-est',
  templateUrl: './register-est.page.html',
  styleUrls: ['./register-est.page.scss'],
})
export class RegisterEstPage{

  constructor(private alertController: AlertController) {}

  openDatePicker() {
    // Open the date picker logic here
    // You can use Ionic's DatePicker component or a custom implementation
    // Example: You can show an alert with the date picker options
    this.alertController.create({
      header: 'Select Date',
      inputs: [
        {
          name: 'date',
          type: 'date',
          label: 'Date',
          value: '',
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Canceled');
          },
        },
        {
          text: 'OK',
          handler: (data) => {
            console.log('Selected Date:', data.date);
          },
        },
      ],
    }).then((alert) => {
      alert.present();
    });
  }
}
