export const getLeague = (state) => (id) => {
  return state.leagues.find(l => l.id === id)
}
