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
