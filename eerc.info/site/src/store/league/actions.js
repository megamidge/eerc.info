import { firestoreAction } from 'vuexfire'
import {
  leagueDocRef,
  leagueCollectionRef
} from 'services/firebase/firestore.js'

/*
export function someAction (context) {
}
*/
export function fetchLeague ({ context, dispatch }, leagueId) {
  dispatch('getLeagueInfo', leagueId)
  dispatch('getLeagueSeasons', leagueId)
}

export const getLeagueInfo = firestoreAction(({ bindFirestoreRef }, leagueId) => {
  return bindFirestoreRef('leagueInfo', leagueDocRef(leagueId))
})
export const getLeagueSeasons = firestoreAction(({ bindFirestoreRef }, leagueId) => {
  return bindFirestoreRef('seasons', leagueCollectionRef(leagueId, 'seasons'))
})
