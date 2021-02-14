import { firestoreAction } from 'vuexfire'
import {
  leagueDocRef,
  leagueCollectionRef
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
