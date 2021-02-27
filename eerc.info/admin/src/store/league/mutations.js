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
import { generateID } from 'services/firebase/firestore'
export function createSeason (state, { newSeason, leagueId }) {
  var season = newSeason
  if (!season.id || season.id === '') {
    const id = generateID(`leagues/${leagueId}/seasons`)
    Object.defineProperty(season, 'id', { value: id, enumerable: false })
  } else {
    Object.defineProperty(season, 'id', { value: season.id, enumerable: false })
  }
  state.seasons.push(season)
}
import Vue from 'vue'
export function deleteSeason (state, seasonId) {
  const index = state.seasons.findIndex(s => s.id === seasonId)
  state.deletedSeasons.push({ index: index, value: state.seasons[index] })
  Vue.delete(state.seasons, index)
}
export function undoSeasonDelete (state, seasonId) {
  const deletedSeason = state.deletedSeasons.find(de => de.value.id === seasonId)
  const deletedIndex = state.deletedSeasons.findIndex(de => de.value.id === seasonId)
  Vue.delete(state.deletedSeasons, deletedIndex)
  state.seasons.splice(deletedSeason.index, 0, deletedSeason.value)
}

export function undoSeasonDeletes (state) {
  const deletedSeasons = [...state.deletedSeasons]
  deletedSeasons.forEach(ds => {
    const delIndex = state.deletedSeasons.indexOf(ds)
    Vue.delete(state.deletedSeasons, delIndex)
    state.seasons.splice(ds.index, 0, ds.value)
  })
}
export function clearDeletedSeasons (state) {
  state.deletedSeasons = []
}

export function setSeason (state, { seasonId, newData }) {
  const index = state.seasons.findIndex(s => s.id === seasonId)
  var updatedSeason = {
    ...newData
  }
  Object.defineProperty(updatedSeason, 'id', { value: seasonId, enumerable: false })
  Vue.set(state.seasons, index, updatedSeason)
}
