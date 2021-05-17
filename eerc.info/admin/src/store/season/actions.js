import { firestoreAction } from 'vuexfire'
import { leagueSeasonEventsRef, publishSeasonChanges as fsPublishSeasonChanges } from 'src/services/firebase/firestore'
/*
export function someAction (context) {
}
*/

export function setupSeason({ dispatch, getters, commit }, { leagueId, season, sync }) {
  commit('setSync', sync)
  dispatch('getSeasonEvents', { leagueId, seasonId: season.id, sync })
  this.watch(
    () => getters.seasonEvents,
    (events) => eventWatcher(events, leagueId, season.id, this, dispatch, sync)
  )
}

export const getSeasonEvents = firestoreAction(({ bindFirestoreRef, commit }, { leagueId, seasonId, sync }) => {
  if (sync) return bindFirestoreRef('events', leagueSeasonEventsRef(leagueId, seasonId))
  else {
    leagueSeasonEventsRef(leagueId, seasonId)
      .get()
      .then((snap) => {
        const data = snap.docs.map((doc) => {
          var docData = { ...doc.data() }
          Object.defineProperty(docData, 'id', { value: doc.id, enumerable: false })
          return docData
        })
        commit('setEvents', data)
      })
  }
})

import eventModule from '../event'
function eventWatcher(events, leagueId, seasonId, context, dispatch, sync) {
  var leagueModuleName = sync ? leagueId : `edit_${leagueId}`
  events.forEach((event) => {
    if (!context.hasModule([leagueModuleName, seasonId, event.id])) {
      context.registerModule([leagueModuleName, seasonId, event.id], eventModule)
      dispatch(`${event.id}/setupEvent`, { leagueId, seasonId, event, sync })
    }
  })
}

export function reset({ dispatch, commit }, { leagueId, seasonId, sync }) {
  commit('clearDeletedEvents')
  dispatch('getSeasonEvents', { leagueId, seasonId, sync })
}

import deepEqual from 'deep-equal'
export function publishSeasonChanges(context, { leagueId, seasonId }) {
  const changes = [] // any items that are different to the synced/live version of the data are pushed into this array in {path,id,data} format.
  // if the change is a DELETE, data should be undefined or null or an empty object.
  // if the ID is undefined, firebase should create one for us.
  const season = context.rootGetters[`edit_${leagueId}/season`](seasonId)
  // console.log('season', season.id, season)
  if (!deepEqual(season, context.rootGetters[`${leagueId}/season`](seasonId))) {
    changes.push({
      path: `leagues/${leagueId}/seasons`,
      id: season.id,
      data: { ...season }
    })
  }
  const deletedEvents = context.getters.eventsDeleted
  deletedEvents.forEach((event) => {
    changes.push({
      path: `leagues/${leagueId}/seasons/${seasonId}/events`,
      id: event.value.id,
      data: null
    })
  })
  const events = context.getters.seasonEvents
  events.forEach((event) => {
    // console.log('event', event.id, event)
    const eventGet = context.rootGetters[`${leagueId}/${seasonId}/event`]
    if (!deepEqual(event, eventGet ? eventGet(event.id) : {})) {
      changes.push({
        path: `leagues/${leagueId}/seasons/${seasonId}/events`,
        id: event.id,
        data: { ...event }
      })
    }
    const collectionName = event.type === 'rally' ? 'stages' : 'sessions'
    const sessions = context.getters[`${event.id}/sessions`]
    const deletedSessions = context.getters[`${event.id}/sessionsDeleted`]
    deletedSessions.forEach((session) => {
      changes.push({
        path: `leagues/${leagueId}/seasons/${seasonId}/events/${event.id}/${collectionName}`,
        id: session.value.id,
        data: null
      })
    })
    sessions.forEach((session) => {
      // console.log('session', session.id, session)
      const seshGet = context.rootGetters[`${leagueId}/${seasonId}/${event.id}/session`]
      if (!deepEqual(session, seshGet ? seshGet(session.id) : {})) {
        changes.push({
          path: `leagues/${leagueId}/seasons/${seasonId}/events/${event.id}/${collectionName}`,
          id: session.id,
          data: { ...session }
        })
      }

      const liveResults = context.rootGetters[`${leagueId}/${seasonId}/${event.id}/${session.id}/results`]
      const results = context.getters[`${event.id}/${session.id}/results`]
      // find all the results that are in `liveResults` but not in `results`.
      if (liveResults) {
        // this only needs doing if there are actually any liveResults for this session :)
        const difference = liveResults.filter((lr) => {
          return !results.find((r) => r.id === lr.id)
        })
        // push those results as delete changes...
        difference.forEach((result) => {
          changes.push({
            path: `leagues/${leagueId}/seasons/${seasonId}/events/${event.id}/${collectionName}/${session.id}/results`,
            id: result.id,
            data: null
          })
        })
      }
      results.forEach((result) => {
        // console.log('result', result.id, result)
        const storedResult = context.rootGetters[`${leagueId}/${seasonId}/${event.id}/${session.id}/result`](result.id)
        const { id, ...resultData } = result
        if (!deepEqual(resultData, storedResult)) {
          changes.push({
            path: `leagues/${leagueId}/seasons/${seasonId}/events/${event.id}/${collectionName}/${session.id}/results`,
            id: result.id,
            data: { ...resultData }
          })
        }
      })
    })
  })
  fsPublishSeasonChanges(changes)
}
