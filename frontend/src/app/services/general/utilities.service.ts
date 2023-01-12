import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { catchError } from 'rxjs/operators';
import { AlertController } from '@ionic/angular';
import sha256 from 'crypto-js/sha256';
import hmacSHA512 from 'crypto-js/hmac-sha512';
import Base64 from 'crypto-js/enc-base64';

@Injectable({
    providedIn: 'root'
})
export class UtilitiesService {

  hashDigest = sha256('Message');
  hmacDigest = Base64.stringify(hmacSHA512('Message', 'Secret Passphrase'));

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


      encrytarPassword(password) {
        const hashPassword = sha256(password);
        const hashPasswordBase64 = Base64.stringify(hashPassword);
        return (hashPasswordBase64);
      }
    }

