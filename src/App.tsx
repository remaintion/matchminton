import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import { bindActionCreators, Dispatch } from 'redux'
import { connect } from 'react-redux'
import { getCurrentUser } from './reducers/auth'
import Login from './pages/login'
import Home from './pages/home'
import Layout from './components/layout'

interface AppProps {
  subscribeAuth: () => void
}
class App extends React.Component<AppProps, any> {
  componentDidMount() {
    this.props.subscribeAuth()
  }
  render() {
    return (
      <Layout>
        <BrowserRouter>
          <Route exact path="/" component={Home} />
          <Route exact path="/login" components={Login} />
        </BrowserRouter>
      </Layout>
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
