import { Injectable } from '@angular/core';
import { State, Action, StateContext, StateToken, Selector } from '@ngxs/store';
import { AddUser, ResetUser } from './user.actions';
import { UserStateModel } from './user.model';

const VALUE_TOKEN = new StateToken<UserStateModel>('user');

@State<UserStateModel>({
  name: VALUE_TOKEN,
  defaults: {
    token: '',
    username: '',
    apellido: '',
    edad: '',
    date: '',
    celular: '',
    email: '',
    idrol: 0,
  },
})
@Injectable()
export class UserState {
  @Action(AddUser)
  addUser(ctx: StateContext<UserStateModel>, action: AddUser) {
    const state = ctx.getState();
    // let stateValue= state.token;
    ctx.setState({
      ...state,
      token: action.token,
      username: action.username,
      apellido: action.apellido,
      edad: action.edad,
      date: action.date,
      celular: action.celular,
      email: action.email,
      idrol: action.idrol,
    });
  }

  @Action(ResetUser)
  resetUser(ctx: StateContext<UserStateModel>) {
    const state = ctx.getState();
    // let stateValue= state.token;
    ctx.setState({
      ...state,
      token: '',
      username: '',
      idrol: 0,
    });
  }

  @Selector()
  static token(state: UserStateModel) {
    return state;
  }
}
