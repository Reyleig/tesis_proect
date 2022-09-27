import { Injectable } from '@angular/core';
import { State, Action, StateContext, StateToken, Selector } from '@ngxs/store';
import { AddSwimmer } from './swimmer.actions';
import { SwimmerStateModel } from './swimmer.model'

const VALUE_SWIMMER = new StateToken<SwimmerStateModel>('swimmer')

@State<SwimmerStateModel>({
    name: VALUE_SWIMMER,
    defaults: {
        name:'',
    }
})
@Injectable()
export class SwimmerState {

    @Action(AddSwimmer)
    addSwimmer(ctx: StateContext<SwimmerStateModel>, action: AddSwimmer) {
        const state = ctx.getState();
        ctx.setState({
            ...state,
            name:action.name,
        });
    }

    @Selector()
    static swimmer(state: SwimmerStateModel) {
        return state
    }

}
