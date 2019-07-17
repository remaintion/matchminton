import React from 'react'
import { bindActionCreators, Dispatch } from 'redux'
import { connect } from 'react-redux'
import types from '@types'
import { signInWithFacebook, signOut } from '../reducers/auth'

interface LoginProps extends types.AuthState {
  signIn: () => void
  signOut: () => void
}
class Login extends React.Component<LoginProps, any> {
  signIn = () => this.props.signIn()
  signOut = () => this.props.signOut()
  render() {
    return (
      <div>
        <h1>LOGIN PAGE</h1>
        <button onClick={this.signIn}>LOGIN BY FACEBOOK</button>
        <button onClick={this.signOut}>SIGN OUT</button>
        {this.props.isLoggedIn && (
          <div>
            <h1>{this.props.displayName}</h1>
            <img src={this.props.photoURL} />
          </div>
        )}
      </div>
    )
  }
}

const mapStateToProps = (state: types.RootState) => state.auth
const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      signIn: signInWithFacebook,
      signOut: signOut,
    },
    dispatch,
  )
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Login)
