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

import Vue from 'vue'
export function setSeason (state, { seasonId, newData }) {
  const index = state.seasons.findIndex(s => s.id === seasonId)
  var updatedSeason = {
    ...newData
  }
  Object.defineProperty(updatedSeason, 'id', { value: seasonId, enumerable: false })
  Vue.set(state.seasons, index, updatedSeason)
}
