import { createReducer } from "@ngrx/store";
import { setViewTeam } from '../actions';
import { Action, on } from '@ngrx/store';

export interface TeamViewState {
    displayteam: string
}

export const initialState:TeamViewState = {
        displayteam: "119"
}



const teamViewReducer = createReducer(initialState,
    on(setViewTeam, (state, { displayteam }) => ({...state, displayteam: displayteam})),
);


export function changeViewTeam (state, action: Action) {
    return teamViewReducer(state, action)
}