import React, { Component } from 'react'

import { connect } from 'react-redux'
import Header from './Navigation/Header/Header'
import Home from './Home'
import Recipe from './Recipe'
import Profile from './Profile/Profile'
import ProfileLiked from './Profile/ProfileLiked'
import ProfileFeed from './Profile/ProfileFeed'
import Login from './Auth/Login/Login'
import SearchResult from './SearchResult'
import Register from './Auth/Register/Register'
import ModalContainer from './Modal'
import UserSettings from './User'
import agent from '../agent'
import { Switch, Route } from 'react-router-dom'
import history from './Utilities/history';
import GuardedRoute from './Utilities/guardedRoute'

const mapStateToProps = state => ({
  appName: state.common.appName,
  currentUser: state.common.currentUser,
  redirectTo: state.common.redirectTo
})

const mapDispatchToProps = dispatch => ({
  onLoad: (payload, token) =>
    dispatch({
      type: 'APP_LOAD',
      payload,
      token
    }),
  onRedirect: () =>
    dispatch({
      type: 'REDIRECT'
    }),
  onSubmitForm: query => {
    const payload = agent.Recipes.search(query)
    dispatch({
      type: 'SEARCH_ENTERED',
      query,
      payload
    })
  },
})

class App extends Component {
  componentWillMount() {
    const token = window.localStorage.getItem('jwt')
    if (token) {
      agent.setToken(token)
    }
    this.props.onLoad(token ? agent.Auth.current() : null, token)
  }


  componentWillReceiveProps(nextProps) {
    if (nextProps.redirectTo) {
      history.push(nextProps.redirectTo)
      this.props.onRedirect();
    }
  }

  render() {
    return (
      <div>
          <Header 
            currentUser={this.props.currentUser}
            onSubmitForm={this.props.onSubmitForm}/>
          <Switch>
            <Route path='/profiles/:id' exact component={Profile}/>
            <Route path='/profiles/:id/favorited' exact component={ProfileLiked}/>
            <Route path='/profiles/:id/feed' exact component={ProfileFeed} currentUser={this.props.currentUser}/>
            <Route path='/login' exact component={Login}/>
            <Route path='/register' exact component={Register}/>
            <Route path='/settings' exact component={UserSettings} currentUser={this.props.currentUser}/>
            <Route path='/results' exact component={SearchResult}/>
            <Route path='/recipes/:slug' exact component={Recipe}/>
            <Route path='/' exact component={Home}/>
          </Switch>  
          <ModalContainer />
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
