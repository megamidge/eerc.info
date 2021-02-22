/*
export function someMutation (state) {
}
*/
export function setSync (state, sync) {
  state.sync = sync
}

export function setLeagueInfo (state, leagueInfo) {
  state.leagueInfo = leagueInfo
}

export function setLeagueSeasons (state, seasons) {
  state.seasons = seasons
}

export function setLeagueProperty (state, { key, value }) {
  state.leagueInfo[key] = value
}

export function setSeasonProperty (state, { key, value, id }) {
  const index = state.seasons.findIndex(s => s.id === id)
  state.seasons[index][key] = value
}

export function setSeasonClass (state, { seasonId, vehicleClass }) {
  const index = state.seasons.findIndex(s => s.id === seasonId)
  if (index >= 0)
    state.seasons[index].vehicleClass = vehicleClass
}
