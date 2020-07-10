export function signIn (state, payload) {
  state.user = payload
}

export function authReady (state, payload) {
  state.authReady = payload
}
