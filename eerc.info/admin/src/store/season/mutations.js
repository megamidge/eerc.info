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

export function setEventProperty (state, { key, value, id }) {
  const index = state.events.findIndex(e => e.id === id)
  state.events[index][key] = value
}
