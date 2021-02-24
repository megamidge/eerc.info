import {
  leagueSeasonEventSessionResultsRef
} from 'services/firebase/firestore'
import { firestoreAction } from 'vuexfire'

export function setupSession ({ dispatch, commit }, { leagueId, seasonId, eventId, sessionId, collection, sync }) {
  commit('setSync', sync)
  dispatch('getSessionResults', { leagueId, seasonId, eventId, sessionId, collection, sync })
}

export const getSessionResults = firestoreAction(({ bindFirestoreRef, commit }, { leagueId, seasonId, eventId, sessionId, collection, sync }) => {
  if (sync)
    return bindFirestoreRef('results', leagueSeasonEventSessionResultsRef(leagueId, seasonId, eventId, sessionId, collection))
  else leagueSeasonEventSessionResultsRef(leagueId, seasonId, eventId, sessionId, collection).get().then(snap => {
    const data = snap.docs.map(doc => {
      var docData = { ...doc.data() }
      Object.defineProperty(docData, 'id', { value: doc.id, enumerable: false })
      return docData
    })
    commit('setResults', data)
  })
})

export function reset ({ dispatch }, { leagueId, seasonId, eventId, sessionId, collection, sync }) {
  dispatch('setupSession', { leagueId, seasonId, eventId, sessionId, collection, sync })
}

export function resetResults ({ dispatch }, { leagueId, seasonId, eventId, sessionId, collection, sync }) {
  dispatch('getSessionResults', { leagueId, seasonId, eventId, sessionId, collection, sync })
}
