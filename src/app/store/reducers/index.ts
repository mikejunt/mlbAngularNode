import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../../environments/environment';
import { Team } from '../../interfaces/team.interface';
import * as Actions from '../actions/index';
import * as HittingReducer from '../reducers/hitting.response.reducer';
import * as PitchingReducer from '../reducers/pitching.response.reducer';
import * as RosterReducer from '../reducers/roster.response.reducer';
import * as TeamReducer from '../reducers/team.response.reducer';


export interface AppState {
  roster: Object[],
  hitting: Object[],
  pitching: Object[],
  teamlist: Team[],
  // lastteam: string,
  // username: string,
  // favteam: string
}

export const reducers: ActionReducerMap<AppState> = {
  hitting: HittingReducer.saveHitting,
  roster: RosterReducer.saveRoster40,
  pitching: PitchingReducer.savePitching,
  teamlist: TeamReducer.saveTeamList,
  // lastteam: string
  // user: {
  //   name: string,
  //   favteam: string
  // }

}


export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [] : [];
