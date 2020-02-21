import { createReducer } from "@ngrx/store";
import { saveRoster } from '../actions'

import { Action, on } from '@ngrx/store'


export const initialState = {
        roster: [],
        hitting: [],
        pitching: [],
        teamlist: [],
}



const rosterReducer = createReducer(initialState,
    on(saveRoster, (state, { roster }) => ({...state, roster: roster})),
);


export function saveRoster40(state, action: Action) {
    return rosterReducer(state, action)
}