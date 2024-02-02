import React from 'react'
import './UserPreview.css'

import { connect } from 'react-redux'
import agent from '../../../agent'

import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Container from 'react-bootstrap/Container'

import Button from 'react-bootstrap/Button'

const mapStateToProps = state => ({
    currentUser: state.common.currentUser,
})

const mapDispatchToProps = dispatch => ({
    follow: user =>
        dispatch({
            type: 'FOLLOW_USER',
            payload: agent.Follow.follow(user)
        }),
    followFollowerList: user =>
        dispatch({
            type: 'FOLLOW_USER_FOLLOWER_LIST',
            payload: agent.Follow.follow(user)
        }),
    followFollowingList: user =>
        dispatch({
            type: 'FOLLOW_USER_FOLLOWING_LIST',
            payload: agent.Follow.follow(user)
        }),
    onRedirect: user =>
        dispatch({
          type: 'REDIRECT_PROFILE',
          payload: user
        }),
    showRegisterList: () => 
        dispatch({
            type: 'SHOW_MODAL',
            payload: {
                modalType: 'REGISTER',
                modalProps: {
                    show: true,
                    title: ''
                }
            }
        })
})

const UserPreview = (props) => {
    console.log('UserPreview', props)

    const followHandler = () => {
        console.log('followHandler')
        if (props.type == 'LikeList') {
            props.follow(props.user.id)
        } 
        else if (props.type == 'FollowerList') {
            props.followFollowerList(props.user.id)
        } 
        else if (props.type == 'FollowingList') {
            props.followFollowingList(props.user.id)
        }
    }

    const registerHandler = () => {
        props.showRegisterList();
    }

    const FollowButton = props => {
        if (!props.user) {
            return null
        }
        else if (props.currentUser && props.user.id == props.currentUser.id) {
            return null
        } else {
            return (
                <Button onClick={() => {props.currentUser ? followHandler() : registerHandler()}}
                    size="sm"
                    variant="dark">
                    {!props.user.is_following ? 'Follow':'Following'}
                </Button>
            )
        }
    }

    const profileRedirect = () => {
        props.onRedirect(props.user.username)
    }
            
    return (
        <Container>
            <Row>
                <Col xs={8} className="userPreview_usernameLink">
                    <button onClick={profileRedirect}>
                        <span>{props.user.username}</span>
                    </button>
                </Col>
                <Col>
                    <FollowButton
                        user={props.user}
                        currentUser={props.currentUser}/>
                </Col>
            </Row>            
        </Container>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(UserPreview)