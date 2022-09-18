import { Injectable } from '@angular/core';
import { State, Action, StateContext, StateToken, Selector } from '@ngxs/store';
import { AddToken } from './user.actions';
import { UserStateModel } from './user.model'

const VALUE_TOKEN = new StateToken<UserStateModel>('token')

@State<UserStateModel>({
    name: VALUE_TOKEN,
    defaults: {
        token: '',
        username:'',
        idrol:0
    }
})
@Injectable()
export class UserState {

    @Action(AddToken)
    addtoken(ctx: StateContext<UserStateModel>, action: AddToken) {
        const state = ctx.getState();
        // let stateValue= state.token;
        ctx.setState({
            ...state,
            token: action.token,
            username:action.username,
            idrol:action.idrol
        });
    }

    @Selector()
    static token(state: UserStateModel) {
        return state
    }

}
