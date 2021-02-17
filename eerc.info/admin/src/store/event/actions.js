/*
export function someAction (context) {
}
*/
import { firestoreAction } from 'vuexfire'
import {
  leagueSeasonEventSessionsRef
} from 'services/firebase/firestore'

export function setupEvent ({ dispatch, getters }, { leagueId, seasonId, event }) {
  // We need to tell the binding what the name of the events 'sessions' collection is.
  // By default, it will be sessions.
  // For different event types, this may be different. For rally, it is 'stages'.
  var collection
  switch (event.type) {
    case 'rally' :
      collection = 'stages'
      break
      // expand as required
    default: collection = 'sessions'
      break
  }
  dispatch('getEventSessions', { leagueId, seasonId: seasonId, eventId: event.id, collection })

  this.watch(() => getters.sessions, (sessions) => sessionWatcher(sessions, leagueId, seasonId, event.id, collection, this, dispatch))
}

export const getEventSessions = firestoreAction(({ bindFirestoreRef }, { leagueId, seasonId, eventId, collection }) => {
  return bindFirestoreRef('sessions', leagueSeasonEventSessionsRef(leagueId, seasonId, eventId, collection))
})

import sessionModule from '../session'
function sessionWatcher (sessions, leagueId, seasonId, eventId, collection, context, dispatch) {
  sessions.forEach(session => {
    if (!context.hasModule([leagueId, seasonId, eventId, session.id])) {
      context.registerModule([leagueId, seasonId, eventId, session.id], sessionModule)
      dispatch(`${session.id}/setupSession`, { leagueId, seasonId, eventId, session, collection })
    }
  })
}
