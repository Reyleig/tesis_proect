import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertController, IonModal } from '@ionic/angular';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { UserState } from '../login/store/user.state';
import { TasksService } from '../services/task/tasks.service';


@Component({
  selector: 'app-training',
  templateUrl: './training.page.html',
  styleUrls: ['./training.page.scss'],
})
export class TrainingPage implements OnInit {
  @Select(UserState) user$!: Observable<any>;
  
  @ViewChild(IonModal) modal: IonModal;


  user: any;
  tasks = [];
  isModalOpen = false;
  tittleModal: string = 'Crear nota';

  constructor(
    private alertController: AlertController,
    private taskService: TasksService,
    ) { }

  ngOnInit() {
    this.user$.subscribe(
      (data) => {
        this.user = data;
      }
    ).unsubscribe();

    this.taskService.findTasks(this.user.token).subscribe(
      (data) => {
        if (data.status == 200) {
          this.tasks = data.payload;
        }
        console.log(data);
      }
    );
  }
  async presentAlert() {
    // const alert = await this.alertController.create({
    //   header: 'Alert',
    //   subHeader: 'Desea agregar nota',
    //   buttons: ['OK', 'Cancel'],
    // });

    // await alert.present();

    this.isModalOpen = true;
    this.tittleModal = 'Crear nota';
    this.modal.present();
  }

  cerrarModal() {
    this.isModalOpen = false;
    this.modal.dismiss();
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
