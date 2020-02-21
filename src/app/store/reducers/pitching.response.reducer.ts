import { createReducer } from "@ngrx/store";
import { savePitchers } from '../actions'

import { Action, on } from '@ngrx/store'


export const initialState = {
        roster: [],
        hitting: [],
        pitching: [],
        teamlist: [],
}



const pitchingReducer = createReducer(initialState,
    on(savePitchers, (state, { pitching }) => ({...state, pitching: pitching})),
);


export function savePitching(state, action: Action) {
    return pitchingReducer(state, action)
}