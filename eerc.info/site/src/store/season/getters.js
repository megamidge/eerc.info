/*
export function someGetter (state) {
}
*/

export function seasonEvents (state) {
  return [...state.events].sort((a, b) => a.datetime.seconds - b.datetime.seconds)
}
