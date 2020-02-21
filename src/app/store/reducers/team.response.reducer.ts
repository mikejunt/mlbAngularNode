import { createReducer } from "@ngrx/store";
import { saveTeams } from '../actions'

import { Action, on } from '@ngrx/store'


export const initialState = {
        roster: [],
        hitting: [],
        pitching: [],
        teamlist: [],
}



const teamReducer = createReducer(initialState,
    on(saveTeams, (state, { teamlist }) => ({...state, teamlist: teamlist})),
);


export function saveTeamList (state, action: Action) {
    return teamReducer(state, action)
}