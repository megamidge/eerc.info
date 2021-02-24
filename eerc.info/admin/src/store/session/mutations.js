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

export function addResult (state, newResult) {
  state.results.push(newResult)
}
