/*
export function someGetter (state) {
}
*/
export function info (state) {
  return state.leagueInfo
}
export function seasons (state) {
  return state.seasons
}
export function season (state) {
  return (id) => {
    return state.seasons.find(s => s.id === id)
  }
}
