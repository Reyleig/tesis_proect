import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AlertController, IonModal } from '@ionic/angular';
import { Select } from '@ngxs/store';
import { Observable, Subscriber, Subscription } from 'rxjs';
import { UserState } from '../login/store/user.state';
import { UtilitiesService } from '../services/general/utilities.service';
import { TasksService } from '../services/task/tasks.service';


@Component({
  selector: 'app-training',
  templateUrl: './training.page.html',
  styleUrls: ['./training.page.scss'],
})
export class TrainingPage implements OnInit,OnDestroy {
  @Select(UserState) user$!: Observable<any>;

  @ViewChild(IonModal) modal: IonModal;


  user: any;
  tasks = [];
  isModalOpen = false;
  isEdit = false;
  tittleModal: string = 'Crear nota';
  idTarea: number;
  form = this.formBuilder.group({
    title: ['', [Validators.required]],
    description: ['', []],
  });
  subcription: Subscription;
  idMax: number ;


  constructor(
    private alertController: AlertController,
    private taskService: TasksService,
    private formBuilder: FormBuilder,
    private utilitiesService: UtilitiesService,
  ) { }


  ngOnInit() {
    //suscribirse a los cambios del form
    this.subcription= this.form.get('description').valueChanges.subscribe(
      (data) => {
        this.editNota(data);
      }
    );

    this.user$.subscribe(
      (data) => {
        this.user = data;
      }
    ).unsubscribe();

    this.getTasks();
  }
  getTasks() {
    this.taskService.findTasks(this.user.token).subscribe(
      (data) => {
        if (data.status == 200) {
          this.tasks = data.payload;
          this.idMax = Math.max.apply(Math, this.tasks.map(function (o) { return o.id; }))
        }
      }
    );
  }

  crearNota() {
    this.utilitiesService.infoAlert('Desea Crear Nota? ').then(
      (data) => {
        if (data.role == 'confirm') {
          let task = {
            token: this.user.token,
            tituloTarea: this.form.value.title,
            descripcionTarea: this.form.value.description,
          }

          this.taskService.createTask(task).subscribe(
            (data) => {
              if (data.status == 200) {
                this.getTasks();
                this.utilitiesService.succesAlert(data.payload).then(
                  () => {
                    this.cerrarModal();
                  });
              }
            });
        }
      });
  }

  eliminarNota() {
    this.utilitiesService.infoAlert('Desea Eliminar Nota? ').then(
      (data) => {
        if (data.role == 'confirm') {          
          this.taskService.deleteTask(this.user.token, this.idTarea).subscribe(
            (data) => {
              if (data.status == 200) {
                this.getTasks();
                this.cerrarModal();
              }
            });
        }
      });
  }

  editNota(data) {
    if (!this.isEdit) {
      this.idTarea = this.idMax + 1;
    }

    console.log(this.idTarea);
    
    let task = {
      token: this.user.token,
      tituloTarea: this.form.value.title,
      descripcionTarea: data,
      id: this.idTarea,
    }

    this.taskService.updateTask(task).subscribe(
      (data) => {
        if (data.status == 200) {
        }
      });
  }

  async presentAlert() {
    this.form.reset();
    this.isEdit = false;
    this.isModalOpen = true;
    this.tittleModal = 'Crear nota';
    this.modal.present();
  }

  cerrarModal() {
    this.isModalOpen = false;
    this.getTasks();
    this.modal.dismiss();
  }

  async editAlert(data) {
    this.isEdit = true;
    this.isModalOpen = true;
    this.tittleModal = 'Task';
    this.idTarea = data.id;
    this.form.controls.title.setValue(data.titulo_tarea);
    this.form.controls.description.setValue(data.descripcion_tarea);
    this.modal.present();
  }


  ngOnDestroy() {
    this.subcription.unsubscribe();
  }
}
