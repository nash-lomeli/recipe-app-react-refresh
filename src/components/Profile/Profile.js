import React, { Component } from 'react'
import './Profile.css'

import { connect } from 'react-redux'
import agent from '../../agent'

import { Link } from 'react-router-dom'
import ProfileSummary from './ProfileSummary/ProfileSummary'
import ProfileRecipeList from './ProfileRecipeList/ProfileRecipeList'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'

const mapStateToProps = state => ({
    profile: state.profile.profile,
    recipes: state.recipeList.recipes,
    currentUser: state.common.currentUser,
})

const mapDispatchToProps = dispatch => ({
    onLoad: payload =>
        dispatch({
            type: 'PROFILE_PAGE_LOADED',
            payload
        }),
    onLoadAuthor: payload =>
        dispatch({
            type: 'PROFILE_PAGE_AUTHOR_LOADED',
            payload
        }),
    onLoadCooked: payload =>
        dispatch({
            type: 'PROFILE_PAGE_COOK_LOADED',
            payload
        }),
    onUnload: () =>
        dispatch({
            type: 'PROFILE_PAGE_UNLOADED'
        }),
})


class Profile extends Component {
    componentDidMount() {
        this.props.onLoad(agent.Profiles.get(this.props.match.params.id))
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.profile) {
            if (this.props.profile) {
                if (nextProps.match.params.id != this.props.match.params.id) {
                    this.props.onUnload()
                    this.props.onLoad(agent.Profiles.get(nextProps.match.params.id))
            }
        }

            if (nextProps.profile.is_merchant && !nextProps.recipes) {
                    this.props.onLoadAuthor(agent.Recipes.byAuthor(this.props.match.params.id))
            } else {
            if (!nextProps.profile.is_merchant && !nextProps.recipes) {
                    this.props.onLoadCooked(agent.Recipes.byCooked(this.props.match.params.id))
                }
            }
        }
    }

    componentWillUnmount() {
        this.props.onUnload()
    }

    // Item to improve
    renderTabs() {
        let currentUserFeedButton = null
        if (this.props.currentUser) {
            if (this.props.profile.id === this.props.currentUser.id) {
                currentUserFeedButton = (
                    <Link to={`/profiles/${this.props.profile.username}/feed`}>
                        <Button checked variant="light" size="sm" className="renderTabs__button">
                            Feed
                        </Button>
                    </Link>
                )
            }
        }

        return (
            <Row className="justify-content-center align-self-center renderTabs__row">
                <Link to={`/profiles/${this.props.profile.username}/`}>
                    <Button checked variant="dark" size="sm" active className="renderTabs__button">
                        {this.props.profile.is_merchant ? 'Created' : 'Recently Cooked'}
                    </Button>
                </Link>
                <Link to={`/profiles/${this.props.profile.username}/favorited`}>
                    <Button checked variant="light" size="sm" className="renderTabs__button">
                        Favorited
                    </Button>
                </Link>
                {currentUserFeedButton}
            </Row>
        )
    }

    render() {
        if (!this.props.profile) {
            return null
        }

        return (
            <div className="profile">
                <Container>
                    <Row xs={1} sm={1} md={3} lg={3} className="show-grid">
                        <Col md={3} lg={3}>
                            <ProfileSummary
                                profile={this.props.profile}
                                currentUser={this.props.currentUser}
                                />
                        </Col>
                        <Col md={9} lg={9}>
                            {this.renderTabs()}
                            <ProfileRecipeList
                                recipes={this.props.recipes}/>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Profile)
export { Profile, mapStateToProps };
