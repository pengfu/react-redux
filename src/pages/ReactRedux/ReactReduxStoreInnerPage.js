import React, { Component } from 'react'
import { connect } from 'react-redux'

class ReactReduxStoreInnerPage extends Component {
  render() {
    const { num, add, minus, asyAdd } = this.props
    return (
      <div>
        <p>{num}</p>
        <button onClick={add}>add</button>
        <button onClick={minus}>minus</button>
        <button onClick={asyAdd}>asyAdd</button>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    num: state,
  }
}
const mapDispatchToProps = {
  add: () => {
    return { type: 'add' }
  },
  minus: () => {
    return { type: 'minus' }
  },
  asyAdd: () => (dispatch) => {
    setTimeout(() => {
      // 异步结束后，⼿手动执⾏行行dispatch
      dispatch({ type: 'add' })
    }, 1000)
  },
}

export default connect(
  mapStateToProps, // 派发事件映射
  mapDispatchToProps // 状态映射
)(ReactReduxStoreInnerPage)
