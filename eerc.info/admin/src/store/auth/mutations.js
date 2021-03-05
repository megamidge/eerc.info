export function setAuthState (state, payload) {
  state.isAuthenticated = payload.isAuthenticated
  state.isReady = payload.isReady
  state.userId = payload.uid
}
