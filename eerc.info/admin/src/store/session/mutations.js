/*
export function someMutation (state) {
}
*/
import Vue from 'vue'
export function setSync (state, sync) {
  state.sync = sync
}

export function setResults (state, results) {
  state.results = results
}

export function setResult (state, { id, field, value }) {
  state.results.find(r => r.id === id)[field] = value
}
export function deleteResult (state, id) {
  const index = state.results.findIndex(r => r.id === id)
  Vue.delete(state.results, index)
}

import { generateID } from 'services/firebase/firestore'
export function addResult (state, { newResult, leagueID, seasonID, eventID, stagesOrSessions, sessionID }) {
  const newResultWithID = {
    ...newResult,
    id: generateID(`leagues/${leagueID}/seasons/${seasonID}/events/${eventID}/${stagesOrSessions}/${sessionID}/results`)
  }
  state.results.push(newResultWithID)
}
