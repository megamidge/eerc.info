/*
export function someGetter (state) {
}
*/

export function results (state) {
  return state.results.map(r => {
    return {
      ...r,
      id: r.id // because ID is non-enumerable, we need to explicitly return it so comparison works.
    }
  })
}

export function result (state) {
  return (id) => {
    return state.results.find(r => r.id === id)
  }
}
