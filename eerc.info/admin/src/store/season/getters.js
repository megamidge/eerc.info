export function seasonEvents (state) {
  return state.events
}

export function eventsDeleted (state) {
  return state.deletedEvents
}

export function event (state) {
  return (id) => {
    return state.events.find(e => e.id === id)
  }
}
