import { createAction, props } from '@ngrx/store';
import { Team } from '../../interfaces/team.interface';


export const saveTeams = createAction(
    '[SAVE TEAM LIST] Get All Teams',
    props<{teamlist: Team[]}>()
)