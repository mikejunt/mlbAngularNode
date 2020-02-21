import { createAction, props } from '@ngrx/store';


export const loginResult = createAction(
    '[LOGIN SERVICE] Log In Attempt',
    props<{user: {name: string, favteam: string}}>()
)