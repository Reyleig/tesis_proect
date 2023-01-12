import { Injectable } from '@angular/core';
import { State, Action, StateContext, StateToken, Selector } from '@ngxs/store';
import { AddTimer } from './timer.actions';
import { TimerStateModel } from './timer.model'

const VALUE_TIMER = new StateToken<TimerStateModel>('timer')

@State<TimerStateModel>({
    name: VALUE_TIMER,
    defaults: {
        banderas: [],
        time: '00:00:00',
        id_deportista: 0,
        id_estilo: 0,
        milisegundos: 0,
    }
})

@Injectable()
export class TimerState {

    @Action(AddTimer)
    addTimer(ctx: StateContext<TimerStateModel>, action: AddTimer) {
        const state = ctx.getState();
        ctx.setState({
            ...state,
            banderas: action.banderas,
            time: action.time,
            id_deportista: action.id_deportista,
            id_estilo: action.id_estilo,
            milisegundos: action.milisegundos,
        });
    }

    @Selector()
    static timer(state: TimerStateModel) {
        return state
    }

}



