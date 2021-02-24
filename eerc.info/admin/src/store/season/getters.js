export function seasonEvents (state) {
  return state.events
}

export function event (state) {
  return (id) => {
    return state.events.find(e => e.id === id)
  }
}
