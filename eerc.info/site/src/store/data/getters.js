export function leagues (state) {
  return state.leagues
}
export function league (state) {
  return (leagueId) => {
    if (!state.leagues) return null
    return state.leagues.find(l => l.id === leagueId)
  }
}
