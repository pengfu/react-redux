import React, { Component } from 'react'
import './App.css'
import ReduxStorePage from './pages/ReduxStorePage'
import ReactReduxStorePage from './pages/ReactRedux/ReactReduxStorePage';

export default class App extends Component {
  
  render() {
    return (
      <div>
       {/* <ReduxStorePage  /> */}
       <ReactReduxStorePage />
      </div>
    )
  }
}
