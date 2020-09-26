import React, { useContext, useState, useEffect } from 'react'
const Context = React.createContext()
export function Provider(props) {
  return (
    <Context.Provider value={props.store}>{props.children} </Context.Provider>
  )
}

export const connect = (
  mapStateToProps = (state) => state,
  mapDispatchToProps = {}
) => (Cmp) => {
  return () => {
    const store = useContext(Context)
    const getProps = () => {
      const stateProps = mapStateToProps(store.getState())
      const dispatchProps = bindActionCreators(
        mapDispatchToProps,
        store.dispatch
      )
      return { ...stateProps, ...dispatchProps }
    }
    const [props, setProps] = useState({ ...getProps() })
    useEffect(() => {
      store.subscribe(() => {
        setProps({ ...props, ...getProps() })
      })
    })
    return <Cmp {...props} />
  }
}
function bindActionCreator(creator, dispatch) {
  return (...args) => dispatch(creator(...args))
}
function bindActionCreators(creators, dispatch) {
  return Object.keys(creators).reduceRight((ret, item) => {
    ret[item] = bindActionCreator(creators[item], dispatch)
    return ret
  }, {})
}
