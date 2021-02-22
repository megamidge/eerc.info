export function setSync (state, sync) {
  state.sync = sync
}

export function setSessions (state, sessions) {
  state.sessions = sessions
}

export function setSessionProperty (state, { key, value, id }) {
  const index = state.sessions.findIndex(s => s.id === id)
  state.sessions[index][key] = value
}
