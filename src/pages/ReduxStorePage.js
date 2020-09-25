import React, { Component } from 'react'
import store from '../store/ReduxStore'

export default class ReduxStorePage extends Component {
  componentDidMount() {
    store.subscribe(() => {
      // this.forceUpdate()
      this.setState({})
    })
  }
  add = () => {
    store.dispatch({ type: 'add' })
  }
  minus = () => {
    store.dispatch({ type: 'minus' })
  }
  stayStatic = () => {
    store.dispatch({ type: 'others' })
  }
  asyncAdd = () => {
    store.dispatch((dispatch) => {
      setTimeout(() => {
        dispatch({ type: 'add' })
      }, 1000)
    })
  }
  render() {
    console.log('render', store.getState())
    return (
      <div>
        <h1>ReduxPage</h1>
        <p>{store.getState()}</p>
        <button onClick={this.add}>add</button>
        <button onClick={this.minus}>minus</button>
        <button onClick={this.stayStatic}>static</button>
        <button onClick={this.asyncAdd}>asyncAdd</button>
      </div>
    )
  }
}
