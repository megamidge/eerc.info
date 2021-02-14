import { firestoreAction } from 'vuexfire'
import {
  leagueSeasonEventsRef
} from 'src/services/firebase/firestore'
/*
export function someAction (context) {
}
*/

export function setupSeason ({ dispatch, getters }, { leagueId, season }) {
  dispatch('getSeasonEvents', { leagueId, seasonId: season.id })
  this.watch(() => getters.seasonEvents, (events) => eventWatcher(events, leagueId, season.id, this, dispatch))
}

export const getSeasonEvents = firestoreAction(({ bindFirestoreRef }, { leagueId, seasonId }) => {
  return bindFirestoreRef('events', leagueSeasonEventsRef(leagueId, seasonId))
})

import eventModule from '../event'
function eventWatcher (events, leagueId, seasonId, context, dispatch) {
  events.forEach(event => {
    if (!context.hasModule([leagueId, seasonId, event.id])) {
      context.registerModule([leagueId, seasonId, event.id], eventModule)
      dispatch(`${event.id}/setupEvent`, { leagueId, seasonId, event })
    }
  })
}
