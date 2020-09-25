// 用法：
// const store = createStore(counterReducer, applyMiddleware(logger))

export function createStore(reducer, enhancer) {
  if (enhancer) {
    return enhancer(createStore)(reducer)
  }
  let currentState = undefined

  let currentListeners = []

  function getState() {
    return currentState
  }

  function subscribe(listener) {
    currentListeners.push(listener)
  }

  function dispatch(action) {
    console.log('dispatch:', action)
    currentState = reducer(currentState, action)
    currentListeners.forEach((cb) => {
      cb()
    })
  }

  return { getState, subscribe, dispatch }
}

export function applyMiddleware(...middlewares) {
  // 返回强化以后函数
  return (createStore) => (...args) => {
    // createStore(reducer)
    console.log('...args', ...args)
    const store = createStore(...args)
    let dispatch = store.dispatch
    const midApi = {
      getState: store.getState,
      dispatch: (...args) => {
        console.log('------args-----', ...args)
        return dispatch(...args)
      },
    }
    // 使中间件可以获取状态值、派发action
    const middlewareChain = middlewares.map((middleware) => middleware(midApi))
    console.log('compose(...middlewareChain)--->', compose(...middlewareChain))
    // compose可以middlewareChain函数数组合并成⼀一个函数

    dispatch = compose(...middlewareChain)(store.dispatch)
    console.log('dispatch', dispatch)
    return {
      ...store,
      dispatch,
    }
  }
}

export function compose(...funcs) {
  if (funcs.length === 0) {
    return (arg) => arg
  }
  if (funcs.length === 1) {
    return funcs[0]
  }
  return funcs.reduce((left, right) => (...args) => right(left(...args)))
}
