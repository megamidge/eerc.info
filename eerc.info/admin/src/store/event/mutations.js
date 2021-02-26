import Vue from 'vue'
export function setSync (state, sync) {
  state.sync = sync
}

export function setSessions (state, sessions) {
  state.sessions = sessions
}

export function setSession (state, { sessionId, newData }) {
  const index = state.sessions.findIndex(s => s.id === sessionId)
  var updatedSession = {
    ...newData
  }
  Object.defineProperty(updatedSession, 'id', { value: sessionId, enumerable: false })
  Vue.set(state.sessions, index, updatedSession)
}

export function setSessionProperty (state, { key, value, id }) {
  const index = state.sessions.findIndex(s => s.id === id)
  state.sessions[index][key] = value
}

export function createSession (state, newSession) {
  var session = { name: newSession.name }
  Object.defineProperty(session, 'id', { value: newSession.id, enumerable: false })
  state.sessions.push(session)
}
export function deleteSession (state, sessionId) {
  const index = state.sessions.findIndex(s => s.id === sessionId)
  state.deletedSessions.push({ index: index, value: state.sessions[index] })
  Vue.delete(state.sessions, index)
}

export function undoSessionDelete (state, sessionId) {
  // TODO: Maybe refine the logic here. It's a bit odd.
  const deletedSession = state.deletedSessions.find(ds => ds.value.id === sessionId)
  const deletedIndex = state.deletedSessions.findIndex(ds => ds.value.id === sessionId)
  Vue.delete(state.deletedSessions, deletedIndex)
  console.log(deletedSession.index)
  state.sessions.splice(deletedSession.index, 0, deletedSession.value)
}
export function clearDeletedSessions (state) {
  state.deletedSessions = []
}
