import { createReducer } from "@ngrx/store";
import { saveHitters } from '../actions'

import { Action, on } from '@ngrx/store'
import { AppState } from '.';


export const initialState = {
        roster: [],
        hitting: [],
        pitching: [],
        teamlist: [],
}



const hittingReducer = createReducer(initialState,
    on(saveHitters, (state, { hitting }) => ({...state, hitting: hitting}))
);


export function saveHitting(state, action) {
    return hittingReducer(state, action)
}