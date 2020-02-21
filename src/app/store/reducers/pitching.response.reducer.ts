import { createReducer } from "@ngrx/store";
import { savePitchers } from '../actions';
import { Pitcher } from '../../interfaces/pitcher.interface'
import { Action, on } from '@ngrx/store'

export interface PitchingState {
    pitching: Pitcher[]
}

export const initialState: PitchingState = {
        pitching: [],

}

const pitchingReducer = createReducer(initialState,
    on(savePitchers, (state, { pitching }) => ({...state, pitching: pitching})),
);


export function savePitching(state, action: Action) {
    return pitchingReducer(state, action)
}