import React, { Component } from 'react'
import ReactReduxStoreInnerPage from './ReactReduxStoreInnerPage'
// import { Provider } from 'react-redux' // 框架的
import { Provider } from '../../myReactRedux'
import store from '../../store/ReactReduxStore'

export default class App extends Component {
  render() {
    return (
      <div>
        <Provider store={store}>
          <ReactReduxStoreInnerPage />
        </Provider>
      </div>
    )
  }
}
