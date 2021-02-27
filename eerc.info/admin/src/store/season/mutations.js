/*
export function someMutation (state) {
}
*/
export function setSync (state, sync) {
  state.sync = sync
}

export function setEvents (state, events) {
  state.events = events
}

import Vue from 'vue'
export function setEvent (state, { eventId, newData }) {
  console.log('setEvent...')
  const index = state.events.findIndex(e => e.id === eventId)
  var updatedEvent = {
    ...newData
  }
  Object.defineProperty(updatedEvent, 'id', { value: eventId, enumerable: false })
  Vue.set(state.events, index, updatedEvent)
}

import { generateID } from 'services/firebase/firestore'
export function createEvent (state, { newEvent, leagueId, seasonId }) {
  var event = { ...newEvent }
  const id = generateID(`leagues/${leagueId}/seasons/${seasonId}/events`)
  console.log('createEvent')
  Object.defineProperty(event, 'id', { value: id, enumerable: false })
  state.events.push(event)
}

export function setEventProperty (state, { key, value, id }) {
  const index = state.events.findIndex(e => e.id === id)
  state.events[index][key] = value
}

export function setEventLocationProperty (state, { key, value, id }) {
  const index = state.events.findIndex(e => e.id === id)
  state.events[index].location[key] = value
}
