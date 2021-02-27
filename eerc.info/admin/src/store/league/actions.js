/*
export function someAction (context) {
}
*/
import { firestoreAction } from 'vuexfire'
import {
  leagueDocRef,
  leagueCollectionRef,
  publishLeagueChanges,
  publishSeasonChanges
} from 'services/firebase/firestore'
/*
export function someAction (context) {
}
*/
export function fetchLeague ({ dispatch, getters, commit }, { leagueId, sync }) {
  commit('setSync', sync)
  dispatch('getLeagueInfo', { leagueId, sync })
  dispatch('getLeagueSeasons', { leagueId, sync })
  this.watch(() => getters.seasons, (seasons) => seasonWatcher(seasons, leagueId, this, dispatch, sync))
}

export const getLeagueInfo = firestoreAction(({ bindFirestoreRef, commit }, { leagueId, sync }) => {
  if (sync)
    return bindFirestoreRef('leagueInfo', leagueDocRef(leagueId))
  else {
    leagueDocRef(leagueId).get().then(snap => {
      var data = { ...snap.data() }
      Object.defineProperty(data, 'id', { value: snap.id, enumerable: false })
      commit('setLeagueInfo', data)
    })
  }
})
export const getLeagueSeasons = firestoreAction(({ bindFirestoreRef, commit }, { leagueId, sync }) => {
  if (sync)
    return bindFirestoreRef('seasons', leagueCollectionRef(leagueId, 'seasons'))
  else {
    leagueCollectionRef(leagueId, 'seasons').get().then(snap => {
      const data = snap.docs.map(doc => {
        var docData = { ...doc.data() }
        // Define the id as a non-enumerable property because we only really want to use it directly. We don't want to accidentally add an 'id' field to every document basically.
        Object.defineProperty(docData, 'id', { value: doc.id, enumerable: false })
        return docData
      })
      commit('setLeagueSeasons', data)
    })
  }
})

import seasonModule from '../season'
function seasonWatcher (seasons, leagueId, context, dispatch, sync) {
  var leagueModuleName = sync ? leagueId : `edit_${leagueId}`
  seasons.forEach(season => {
    if (!context.hasModule([leagueModuleName, season.id])) {
      context.registerModule([leagueModuleName, season.id], seasonModule)
      dispatch(`${season.id}/setupSeason`, { leagueId, season, sync })
    }
  })
}

export function resetLeagueInfo ({ dispatch }, { leagueId, sync }) {
  dispatch('getLeagueInfo', { leagueId, sync })
}
export function reset ({ dispatch, commit }, { leagueId, sync }) {
  dispatch('getLeagueSeasons', { leagueId, sync })
  commit('clearDeletedSeasons')
}

export function publishInfoChanges ({ state }) {
  console.log('state', state)
  return publishLeagueChanges(state.leagueInfo.id, state.leagueInfo)
}

export function publishChanges (context, changes) {
  return publishLeagueChanges(context.state.leagueInfo.id, changes)
}
export function publishDeletedSeasons (context, { leagueId }) {
  var changes = []
  context.state.deletedSeasons.forEach(deletedSeason => {
    changes.push({
      path: `leagues/${leagueId}/seasons`,
      id: deletedSeason.value.id,
      data: null
    })
  })
  context.commit('clearDeletedSeasons')
  console.log('Deleted Seasons', changes)
  return publishSeasonChanges(changes)
}
export function toggleActive (context, active) {
  return publishLeagueChanges(context.state.leagueInfo.id, { active: active })
}
