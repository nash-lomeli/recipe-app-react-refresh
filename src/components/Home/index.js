import React, { Component } from 'react'
import './index.css'

import { connect } from 'react-redux'

import Banner from './Banner/Banner'
import RecipeView from './RecipeView/RecipeView'

import Container from 'react-bootstrap/Container'

import agent from '../../agent'

const Promise = global.Promise;

const mapStateToProps = state => ({
    appName: state.common.appName
})

const mapDispatchToProps = dispatch => ({
    onLoad: (payload) =>
      dispatch({ 
        type: 'HOME_PAGE_LOADED',
        payload 
    }),
  })

class Home extends Component {
    componentWillMount() {
        this.props.onLoad(agent.CuratedCollections.all());
      }

    render() {
        return (
            <div className='home'>
                <Container>
                    <Banner/>
                    <RecipeView/>
                </Container>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)