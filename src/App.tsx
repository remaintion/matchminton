import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import { bindActionCreators, Dispatch } from 'redux'
import { connect } from 'react-redux'
import { getCurrentUser } from './reducers/auth'
import Login from './pages/login'

interface AppProps {
  subscribeAuth: () => void
}
class App extends React.Component<AppProps, any> {
  componentDidMount() {
    this.props.subscribeAuth()
  }
  render() {
    return (
      <BrowserRouter>
        <Route exact path="/" component={Login} />
      </BrowserRouter>
    )
  }
}

const mapDipathToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      subscribeAuth: getCurrentUser,
    },
    dispatch,
  )
export default connect(
  null,
  mapDipathToProps,
)(App)
