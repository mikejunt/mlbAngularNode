import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../../environments/environment';
import * as HittingReducer from '../reducers/hitting.response.reducer';
import * as PitchingReducer from '../reducers/pitching.response.reducer';
import * as RosterReducer from '../reducers/roster.response.reducer';
import * as TeamReducer from '../reducers/team.response.reducer';
import * as TeamViewReducer from '../reducers/team.select.reducer'


export interface AppState {
  roster: Object,
  hitting: Object,
  pitching: Object,
  teamlist: Object,
  displayteam: Object,
  // username: string,
  // favteam: string
}

export const reducers: ActionReducerMap<AppState> = {
  hitting: HittingReducer.saveHitting,
  roster: RosterReducer.saveRoster40,
  pitching: PitchingReducer.savePitching,
  teamlist: TeamReducer.saveTeamList,
  displayteam: TeamViewReducer.changeViewTeam
  // user: {
  //   name: string,
  //   favteam: string
  // }
}

export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [] : [];
