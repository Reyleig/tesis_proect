import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { UserState } from '../login/store/user.state';
import { UtilitiesService } from '../services/general/utilities.service';
import { ProfileService } from '../services/profile/profile.service';
import { SwimmerService } from '../services/swimmer/swimmer.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  @Select(UserState) user$!: Observable<any>;

  user: any;
  date: Date = new Date();
  swimmerForm;


  constructor(
    private profileService: ProfileService,
    private formBuilder: FormBuilder,
    public swimmerService: SwimmerService,
    public utilitiesService: UtilitiesService,

  ) { }

  ngOnInit() {
    this.userState();
    this.init();
    this.getCoach();
  }
  init(){
    this.swimmerForm = this.formBuilder.group({
      id: ['', []],
      email: ['', [Validators.required, Validators.minLength(3)]],
      name: ['', [Validators.required, Validators.minLength(3)]],
      apellido: ['', [Validators.required, Validators.minLength(3)]],
      celular: ['', [Validators.required, Validators.minLength(3)]],
      edad: [0, [Validators.required, Validators.minLength(1)]],
    });
  }

  userState() {
    this.user$.subscribe(
      (res) => {
        this.user = res;
      });
  }
  actualizar(){
    this.swimmerService.updateSwimmers(this.swimmerForm.value).subscribe( data =>{
      if(data.affected == 1){
        this.utilitiesService.succesAlert("Actualizado con exito");
      } else{
       this.utilitiesService.errorAlert('ha sucedido un error','Intentelo mas tarde') 
      }
    })
  }

  getCoach() {
    this.profileService.getCoach(this.user.token).subscribe(
      (res) => {
        console.log(res);
        this.swimmerForm.controls['id'].setValue(res.payload.id)
        this.swimmerForm.controls['email'].setValue(res.payload.email);
        this.swimmerForm.controls['name'].setValue(res.payload.name);
        this.swimmerForm.controls['apellido'].setValue(res.payload.apellido);
        this.swimmerForm.controls['celular'].setValue(res.payload.celular);
        this.swimmerForm.controls['edad'].setValue(res.payload.edad);
        //this.swimmerForm.controls['date'].setValue(res.payload.fecha_nacimiento);

      });
  }
}
