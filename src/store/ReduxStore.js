// import { createStore } from 'redux'
import { createStore, applyMiddleware } from '../myRedux'

const counterReducer = (state = 0, action) => {
  switch (action.type) {
    case 'add':
      return state + 1
    case 'minus':
      return state - 1
    default:
      return state
  }
}

function logger({ dispatch, getState }) {
  console.log('logger:dispatch', dispatch)
  console.log('logger:getState', getState)
  return (dispatch) => (action) => {
    // 中间件任务
    console.log(action.type + '执⾏行行了了!!')
    // 下⼀一个中间件
    return dispatch(action)
  }
}

const thunk = ({ dispatch, getState }) => (dispatch) => (action) => {
  if (typeof action == 'function') {
    return action(dispatch, getState)
  }
  return dispatch(action)
}

const store = createStore(counterReducer, applyMiddleware(logger, thunk))
export default store
