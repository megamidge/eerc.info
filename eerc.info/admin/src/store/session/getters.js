/*
export function someGetter (state) {
}
*/

export function results (state) {
  return state.results
}

export function result (state) {
  return (id) => {
    return state.results.find(r => r.id === id)
  }
}
