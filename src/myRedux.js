export function createStore(reducer, enhancer) {
  let currentState = undefined

  let currentListeners = []

  function getState() {
    return currentState
  }

  function subscribe(listener) {
    currentListeners.push(listener)
  }

  function dispatch(action) {
    currentState = reducer(currentState, action)
    currentListeners.forEach((cb) => {
      cb()
    })
  }

  return { getState, subscribe, dispatch }
}
