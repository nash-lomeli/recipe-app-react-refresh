import React from 'react'

import { connect } from 'react-redux'
import agent from '../../agent'

import { Link } from 'react-router-dom';

import { Profile, mapStateToProps } from './Profile';
import Row from 'react-bootstrap/Row'
import Button from 'react-bootstrap/Button'

const mapDispatchToProps = dispatch => ({
    onLoad: payload =>
        dispatch({
            type: 'PROFILE_PAGE_LOADED',
            payload
        }),
    onLoadLiked: payload =>
        dispatch({
            type: 'PROFILE_PAGE_LIKED_LOADED',
            payload
        }),
    onUnload: () =>
        dispatch({
            type: 'PROFILE_PAGE_UNLOADED'
        }),
})

class ProfileLiked extends Profile {
    componentWillMount() {
        this.props.onLoad(agent.Profiles.get(this.props.match.params.id))
        this.props.onLoadLiked(agent.Recipes.byLiked(this.props.match.params.id))
    }

    componentWillReceiveProps() {
    }

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
                    <Button checked variant="light" size="sm" className="renderTabs__button">
                        {this.props.profile.is_merchant ? 'Created' : 'Recently Cooked'}
                    </Button>
                </Link>
                <Link to={`/profiles/${this.props.profile.username}/favorited`}>
                    <Button checked variant="dark" size="sm" active className="renderTabs__button">
                        Favorited
                    </Button>
                </Link>
                {currentUserFeedButton}
            </Row>
        )
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileLiked);
