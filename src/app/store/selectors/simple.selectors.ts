import { AppState } from '..'



export const viewTeams = (state: AppState) => state.teamlist.teamlist
export const viewRoster = (state: AppState) => state.roster.roster
export const viewHitting = (state: AppState) => state.hitting.hitting
export const viewPitching = (state: AppState) => state.pitching.pitching
export const viewUserName = (state: AppState) => state.user.user.username
export const viewUserFav = (state: AppState) => state.user.user.favteam
export const viewSelectedTeam = (state: AppState) => state.displayteam.displayteam
export const viewCopyNotice = (state: AppState) => state.copyright.copyright
export const viewTrx = (state: AppState) => state.transactions.transactions