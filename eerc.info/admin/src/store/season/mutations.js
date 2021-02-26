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

export function setEventProperty (state, { key, value, id }) {
  const index = state.events.findIndex(e => e.id === id)
  state.events[index][key] = value
}

export function setEventLocationProperty (state, { key, value, id }) {
  const index = state.events.findIndex(e => e.id === id)
  state.events[index].location[key] = value
}
