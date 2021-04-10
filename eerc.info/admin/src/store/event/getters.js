export function sessions (state) {
  return state.sessions
}

export function sessionsDeleted (state) {
  return state.deletedSessions
}

export function session (state) {
  return sessionId => {
    return state.sessions.find(s => s.id === sessionId)
  }
}

export function vehicles (state) {
  const vehicles = []
  state.sessions.forEach(session => {
    state[session.id].results.forEach(result => {
      if (!vehicles.includes(result.vehicle) && !!result.vehicle)
        vehicles.push(result.vehicle)
    })
  })
  return vehicles
}
