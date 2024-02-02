import React from 'react'
import './ProfileSummary.css'

import { connect } from 'react-redux'

import { Link } from 'react-router-dom'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'

import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';
import RestaurantOutlinedIcon from '@material-ui/icons/RestaurantOutlined';
import BookOutlinedIcon from '@material-ui/icons/BookOutlined';
import agent from '../../../agent'


const mapDispatchToProp = dispatch => ({
    follow: id => 
        dispatch({
            type: 'PROFILE_FOLLOW_USER',
            payload: agent.Follow.follow(id)
        }),
    showFollowingList: id =>
        dispatch({
            type: 'SHOW_MODAL',
            payload: {
                modalType: 'FOLLOWING',
                modalProps: {
                        id,
                        show: true,
                        title: 'Following'
                }
            }
        }),
    showFollowerList: id =>
        dispatch({
            type: 'SHOW_MODAL',
            payload: {
                modalType: 'FOLLOWER',
                modalProps: {
                        id,
                        show: true,
                        title: 'Followers'
                }
            }
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

const BasicInfo = props => {
    const profile = props.profile
    
    if (!profile) {
        return null
    }

    return (
        <>
            <Row>
                <Col className="profileSummary__info">
                    <button onClick={props.followerListHandler}>
                       Followers ({profile.followers})
                    </button>
                </Col>
            </Row>
            <Row>
                <Col className="profileSummary__info">
                    <button onClick={props.followingListHandler}>
                        Following ({profile.following})
                    </button>
                </Col>
            </Row>
        </> 
    )
}

const MerchantInfo = props => {
    const profile = props.profile

    if (!profile.is_merchant) {
        return null
    }

    return (
            <>
                <Row>
                    <Col className="profileSummary__info">
                        <BookOutlinedIcon/>
                        <span> {profile.recipe_count}</span>
                    </Col>
                </Row>
                <Row>
                    <Col className="profileSummary__info">
                        <FavoriteBorderOutlinedIcon/>
                        <span> {profile.like_count}</span>
                    </Col>
                </Row>
                <Row>
                    <Col className="profileSummary__info">
                        <RestaurantOutlinedIcon/>
                        <span> {profile.cuisine}</span>
                    </Col>
                </Row>
                <Row>
                    <Col className="profileSummary__info">
                        <HomeOutlinedIcon/>
                        <span> {profile.street_address}. {profile.city}</span>
                    </Col>
                </Row>
            </> 
    )
}

const VerifiedBadge = props => {
    const profile = props.profile

    if (!profile.is_merchant) {
        return (
            <span className="verifiedBadge">
                <span className="verifiedText">USER</span>
            </span>
        )
    }

    return (
    <span className="verifiedBadge">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 21.6596l-3.38079 1.8543-1.84158-3.3877-3.84662-.2679.28231-3.8456-3.09118-2.3049 2.31658-3.0825-1.3543-3.61028 3.61534-1.34071.81255-3.76935 3.76627.82672L12 0l2.7214 2.73168 3.7663-.82672.8125 3.76935 3.6154 1.34071-1.3543 3.61028 2.3166 3.0825-3.0912 2.3049.2823 3.8456-3.8466.2679-1.8416 3.3877L12 21.6596z" fill="#DFBB23"></path>
            <path d="M16.8637 7.41226l-6.6435 7.77824-2.80421-3.2842-.4935.5775 3.29771 3.8617 7.2135-8.44649-.57-.48675z" fill="#fff"></path>
        </svg>
        <span className="verifiedText">MERCHANT</span>
    </span>
    )
}

const FollowButton = props => {
        if (props.currentUser) {
            if (props.profile.id === props.currentUser.id) {
                return (
                    <Link to={`/settings`}>
                        <Button variant="outline-dark">Edit Profile</Button>
                    </Link>
                )
            }
        } 
        return (
            <Button onClick={() => {props.currentUser ? props.followHandler() : props.registerHandler()}}
                variant="outline-dark">
                    {!props.profile.is_following ? 'Follow': 'Following'}
            </Button>
        )
    }

const ProfileSummary = props => {
    const profile = props.profile

    const registerHandler = () => {
        props.showRegisterList();
    }

    const followingListHandler = () => {
        props.showFollowingList(profile.id);
    }

    const followerListHandler = () => {
        props.showFollowerList(profile.id);
    }

    const followHandler = () => {
        props.follow(profile.id)
    }
    
    return (
        <div className="profileSummary">
            <Container className="container-sm">
                <Row>
                    <Col>
                        <Row className="profileSummary__titleBorder">
                            <Col className="profileSummary__title text-center">
                            <VerifiedBadge profile={profile}/>
                                <h1>
                                    {profile.username}
                                </h1>
                            </Col>
                        </Row>
                        <Row className="justify-content-center profileSummary__followButton">
                        {/* // Item to improve */}
                            <FollowButton
                                    profile={profile}
                                    currentUser={props.currentUser}
                                    followHandler={followHandler}
                                    registerHandler={registerHandler}/>
                        </Row>
                        <Row >
                            <Col className="profileSummary__border">
                            </Col>
                        </Row>
                        <Row >
                            <Col>
                                {/* // Item to improve */}
                                <MerchantInfo
                                    profile={profile}/>
                                
                                <BasicInfo
                                    profile={profile}
                                    currentUser={props.currentUser}
                                    followingListHandler={followingListHandler}
                                    followerListHandler={followerListHandler}/>

                            </Col>
                        </Row>
                        <Row className="justify-content-md-center">
                            <Col className="profileSummary__border">
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Row>
                                    <Col className="profileSummary__header">
                                        <h3>{profile.is_merchant ? 'About Us' : 'About Me'}</h3>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col className="profileSummary__descriptionText">
                                        <span>{profile.description}</span>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default connect(() => ({}),mapDispatchToProp)(ProfileSummary)
