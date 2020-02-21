import { createReducer } from "@ngrx/store";
import { saveHitters } from '../actions';
import { Hitter } from '../../interfaces/hitter.interface'

import { Action, on } from '@ngrx/store'

export interface HittingState {
    hitting: Hitter[]
}


export const initialState: HittingState = {
        hitting: []
}



const hittingReducer = createReducer(initialState,
    on(saveHitters, (state, { hitting }) => ({...state, hitting: hitting}))
);


export function saveHitting(state, action) {
    return hittingReducer(state, action)
}