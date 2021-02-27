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

export function deleteEvent (state, eventId) {
  const index = state.events.findIndex(s => s.id === eventId)
  state.deletedEvents.push({ index: index, value: state.events[index] })
  Vue.delete(state.events, index)
}

export function undoEventDelete (state, eventId) {
  const deletedEvent = state.deletedEvents.find(de => de.value.id === eventId)
  const deletedIndex = state.deletedEvents.findIndex(de => de.value.id === eventId)
  Vue.delete(state.deletedEvents, deletedIndex)
  state.events.splice(deletedEvent.index, 0, deletedEvent.value)
}
export function clearDeletedEvents (state) {
  state.deletedEvents = []
}

export function setEventProperty (state, { key, value, id }) {
  const index = state.events.findIndex(e => e.id === id)
  state.events[index][key] = value
}

export function setEventLocationProperty (state, { key, value, id }) {
  const index = state.events.findIndex(e => e.id === id)
  state.events[index].location[key] = value
}
