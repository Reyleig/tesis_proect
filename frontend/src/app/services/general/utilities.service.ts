import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { catchError } from 'rxjs/operators';
import { AlertController } from '@ionic/angular';

@Injectable({
    providedIn: 'root'
})
export class UtilitiesService {

    constructor(private alertController: AlertController
    ) { }

    async errorAlert(header, recommendation) {
        const alert = await this.alertController.create({
          header: 'Error',
          subHeader: header,
          message: recommendation,
          buttons: ['OK'],
        });

        await alert.present();
      }

      async infoAlert(header) {
        const alert = await this.alertController.create({
          header: 'Info!',
          subHeader: header,
          buttons: [
            {
              text: 'OK',
              role: 'confirm',
            },
            {
              text: 'Cancel',
              role: 'cancel',
            },

          ],
        });

        await alert.present();

        return  await alert.onDidDismiss();

      }


      async succesAlert(header) {
        const alert = await this.alertController.create({
          header: 'Succes!',
          subHeader: header,
          buttons: [
            {
              text: 'OK',
              role: 'confirm',
            }
          ],
        });

        await alert.present();

        return  await alert.onDidDismiss();

      }
    }

