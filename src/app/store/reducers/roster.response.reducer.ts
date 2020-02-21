import { createReducer } from "@ngrx/store";
import { saveRoster } from '../actions';4
import { Player } from '../../interfaces/player.interface'

import { Action, on } from '@ngrx/store'

export interface RosterState {
    roster: Player[]
}

export const initialState: RosterState = {
        roster: [],
}



const rosterReducer = createReducer(initialState,
    on(saveRoster, (state, { roster }) => ({...state, roster: roster})),
);


export function saveRoster40(state, action: Action) {
    return rosterReducer(state, action)
}