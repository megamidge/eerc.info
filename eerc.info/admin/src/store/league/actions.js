/*
export function someAction (context) {
}
*/
import { firestoreAction } from 'vuexfire'
import {
  leagueDocRef,
  leagueCollectionRef,
  publishLeagueChanges
} from 'services/firebase/firestore'
/*
export function someAction (context) {
}
*/
export function fetchLeague ({ dispatch, getters }, leagueId) {
  dispatch('getLeagueInfo', leagueId)
  dispatch('getLeagueSeasons', leagueId)
  this.watch(() => getters.seasons, (seasons) => seasonWatcher(seasons, leagueId, this, dispatch))
}

export const getLeagueInfo = firestoreAction(({ bindFirestoreRef }, leagueId) => {
  return bindFirestoreRef('leagueInfo', leagueDocRef(leagueId))
})
export const getLeagueSeasons = firestoreAction(({ bindFirestoreRef }, leagueId) => {
  return bindFirestoreRef('seasons', leagueCollectionRef(leagueId, 'seasons'))
})

import seasonModule from '../season'
function seasonWatcher (seasons, leagueId, context, dispatch) {
  seasons.forEach(season => {
    if (!context.hasModule([leagueId, season.id])) {
      context.registerModule([leagueId, season.id], seasonModule)
      dispatch(`${season.id}/setupSeason`, { leagueId, season })
    }
  })
}

export function publishChanges (context, changes) {
  return publishLeagueChanges(context.state.leagueInfo.id, changes)
}

export function toggleActive (context, active) {
  return publishLeagueChanges(context.state.leagueInfo.id, { active: active })
}
