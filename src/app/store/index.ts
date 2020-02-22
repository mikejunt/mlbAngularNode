import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import * as Reducers from './reducers';


export interface AppState {
  roster: Reducers.RosterState
  hitting: Reducers.HittingState
  pitching: Reducers.PitchingState
  teamlist: Reducers.TeamState
  displayteam: Reducers.TeamViewState
  user: Reducers.UserState
  transactions: Reducers.TransactionListState
  copyright: Reducers.CopyNoticeState
}

export const reducers: ActionReducerMap<AppState> = {
  hitting: Reducers.saveHitting,
  roster: Reducers.saveRoster40,
  pitching: Reducers.savePitching,
  teamlist: Reducers.saveTeamList,
  displayteam: Reducers.changeViewTeam,
  user: Reducers.updateLoginStatus,
  transactions: Reducers.saveTransactionList,
  copyright: Reducers.setCopyNotice
}

export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [] : [];
