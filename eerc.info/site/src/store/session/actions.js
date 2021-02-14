import {
  leagueSeasonEventSessionResultsRef
} from 'services/firebase/firestore'
import { firestoreAction } from 'vuexfire'

export function setupSession ({ dispatch }, { leagueId, seasonId, eventId, session, collection }) {
  dispatch('getSessionResults', { leagueId, seasonId, eventId, sessionId: session.id, collection })
}

export const getSessionResults = firestoreAction(({ bindFirestoreRef }, { leagueId, seasonId, eventId, sessionId, collection }) => {
  return bindFirestoreRef('results', leagueSeasonEventSessionResultsRef(leagueId, seasonId, eventId, sessionId, collection))
})
