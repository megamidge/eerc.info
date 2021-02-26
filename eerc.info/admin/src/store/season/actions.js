import { firestoreAction } from 'vuexfire'
import {
  leagueSeasonEventsRef
} from 'src/services/firebase/firestore'
/*
export function someAction (context) {
}
*/

export function setupSeason ({ dispatch, getters, commit }, { leagueId, season, sync }) {
  commit('setSync', sync)
  dispatch('getSeasonEvents', { leagueId, seasonId: season.id, sync })
  this.watch(() => getters.seasonEvents, (events) => eventWatcher(events, leagueId, season.id, this, dispatch, sync))
}

export const getSeasonEvents = firestoreAction(({ bindFirestoreRef, commit }, { leagueId, seasonId, sync }) => {
  if (sync)
    return bindFirestoreRef('events', leagueSeasonEventsRef(leagueId, seasonId))
  else {
    leagueSeasonEventsRef(leagueId, seasonId).get().then(snap => {
      const data = snap.docs.map(doc => {
        var docData = { ...doc.data() }
        Object.defineProperty(docData, 'id', { value: doc.id, enumerable: false })
        return docData
      })
      commit('setEvents', data)
    })
  }
})

import eventModule from '../event'
function eventWatcher (events, leagueId, seasonId, context, dispatch, sync) {
  var leagueModuleName = sync ? leagueId : `edit_${leagueId}`
  events.forEach(event => {
    if (!context.hasModule([leagueModuleName, seasonId, event.id])) {
      context.registerModule([leagueModuleName, seasonId, event.id], eventModule)
      dispatch(`${event.id}/setupEvent`, { leagueId, seasonId, event, sync })
    }
  })
}

export function reset ({ dispatch }, { leagueId, seasonId, sync }) {
  dispatch('getSeasonEvents', { leagueId, seasonId, sync })
}

export function publishSeasonChanges (context) {
  console.log('Publish season [NOT IMPLEMENTED]')
}
