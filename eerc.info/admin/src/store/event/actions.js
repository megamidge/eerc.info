/*
export function someAction (context) {
}
*/
import { firestoreAction } from 'vuexfire'
import {
  leagueSeasonEventSessionsRef
} from 'services/firebase/firestore'

export function setupEvent ({ dispatch, getters, commit }, { leagueId, seasonId, event, sync }) {
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
  commit('setSync', sync)
  dispatch('getEventSessions', { leagueId, seasonId: seasonId, eventId: event.id, collection, sync })

  this.watch(() => getters.sessions, (sessions) => sessionWatcher(sessions, leagueId, seasonId, event.id, collection, this, dispatch, sync))
}

export const getEventSessions = firestoreAction(({ bindFirestoreRef, commit }, { leagueId, seasonId, eventId, collection, sync }) => {
  if (sync)
    return bindFirestoreRef('sessions', leagueSeasonEventSessionsRef(leagueId, seasonId, eventId, collection))
  else {
    leagueSeasonEventSessionsRef(leagueId, seasonId, eventId, collection).get().then(snap => {
      const data = snap.docs.map(doc => {
        var docData = { ...doc.data() }
        Object.defineProperty(docData, 'id', { value: doc.id, enumerable: false })
        return docData
      })
      commit('setSessions', data)
    })
  }
})

import sessionModule from '../session'
function sessionWatcher (sessions, leagueId, seasonId, eventId, collection, context, dispatch, sync) {
  var leagueModuleName = sync ? leagueId : `edit_${leagueId}`
  sessions.forEach(session => {
    if (!context.hasModule([leagueModuleName, seasonId, eventId, session.id])) {
      context.registerModule([leagueModuleName, seasonId, eventId, session.id], sessionModule)
      dispatch(`${session.id}/setupSession`, { leagueId, seasonId, eventId, session, collection, sync })
    }
  })
}

export function reset () {
  console.log('reset event')
}
