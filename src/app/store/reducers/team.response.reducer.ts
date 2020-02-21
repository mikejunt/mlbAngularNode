import { createReducer } from "@ngrx/store";
import { saveTeams } from '../actions'

import { Action, on } from '@ngrx/store'
import { Team } from 'src/app/interfaces/team.interface';

export interface TeamState {
    teamlist: Team[]
}

export const initialState:TeamState = {
        teamlist: [],
}



const teamReducer = createReducer(initialState,
    on(saveTeams, (state, { teamlist }) => ({...state, teamlist: teamlist})),
);


export function saveTeamList (state, action: Action) {
    return teamReducer(state, action)
}