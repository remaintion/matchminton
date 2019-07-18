import React from 'react'
import types from '@types'
import { Drawer, List, NavBar, Icon } from 'antd-mobile'
import 'antd-mobile/dist/antd-mobile.css'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { Dispatch, bindActionCreators } from 'redux'
import { signInWithFacebook, signOut } from '../reducers/auth'
import signoutIcon from '../assets/signout.svg'
import facebookIcon from '../assets/facebook.svg'

const Item = List.Item

interface PropTypes extends types.AuthState {
  className?: string
  signIn: () => void
  signOut: () => void
}
class Layout extends React.Component<PropTypes, any> {
  state = {
    open: false,
  }
  onOpenChange = () => {
    this.setState({ open: !this.state.open })
  }
  get sidebar() {
    const { isLoggedIn } = this.props

    if (isLoggedIn) {
      const { displayName, photoURL } = this.props
      return (
        <React.Fragment>
          <List>
            <Item>My Leuage</Item>
            <Item>My Rank</Item>
            <Item>My History</Item>
          </List>
          <List className="list__bottom">
            <Item thumb={photoURL}>{displayName}</Item>
            <Item onClick={() => this.props.signOut()} extra={<img src={signoutIcon} />}>
              Sign Out
            </Item>
          </List>
        </React.Fragment>
      )
    }
    return (
      <React.Fragment>
        <List>
          <Item disabled>My Leuage</Item>
          <Item disabled>My Rank</Item>
          <Item disabled>My History</Item>
        </List>
        <List className="list__bottom">
          <Item onClick={() => this.props.signIn()} extra={<img src={facebookIcon} />}>
            Sign In
          </Item>
        </List>
      </React.Fragment>
    )
  }
  render() {
    return (
      <div className={this.props.className}>
        <NavBar icon={<Icon type="ellipsis" />} onLeftClick={this.onOpenChange}>
          MatchMinTon
        </NavBar>
        <Drawer
          className="my-drawer"
          style={{ minHeight: document.documentElement.clientHeight }}
          enableDragHandle
          contentStyle={{ color: '#A6A6A6', textAlign: 'center', paddingTop: 42 }}
          sidebar={this.sidebar}
          open={this.state.open}
          onOpenChange={this.onOpenChange}
        >
          {this.props.children}
        </Drawer>
      </div>
    )
  }
}

const StyledWrapped = styled(Layout)`
  .my-drawer {
    position: relative;
    overflow: auto;
    -webkit-overflow-scrolling: touch;
    min-height: calc(100vh - 45px) !important;
  }
  .my-drawer .am-drawer-sidebar {
    background-color: #fff;
    overflow: auto;
    -webkit-overflow-scrolling: touch;
  }
  .my-drawer .am-drawer-sidebar .am-list {
    width: 300px;
    padding: 0;
  }
  .list__bottom {
    position: absolute;
    bottom: 0px;
  }
`

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
)(StyledWrapped)
