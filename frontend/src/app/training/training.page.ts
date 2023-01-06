import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-training',
  templateUrl: './training.page.html',
  styleUrls: ['./training.page.scss'],
})
export class TrainingPage implements OnInit {

  constructor(private alertController: AlertController) { }

  ngOnInit() {
  }
  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Alert',
      subHeader: 'Desea agregar nota',
      buttons: ['OK', 'Cancel'],
    });

    await alert.present();
  }

  async editAlert() {
    const alert = await this.alertController.create({
      header: 'Alert',
      subHeader: 'Desea editar nota',
      buttons: ['OK', 'Cancel'],
    });

    await alert.present();
  }
}
