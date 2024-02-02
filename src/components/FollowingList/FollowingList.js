import React, { Component } from 'react'
import './FollowingList.css'
import { connect } from 'react-redux'
import agent from '../../agent'
import Row from 'react-bootstrap/Row'

import UserPreview from '../Utilities/UserPreview/UserPreview'

const mapStateToProps = state => ({
    ...state.follow,
    modalProps: state.modal.modalProps,
})

const mapDispatchToProps = dispatch => ({
    onLoad: payload => {
        dispatch({
            type: 'FOLLOWING_LIST_PAGE_LOADED',
                payload
        })
    },
    onUnload: () => {
        dispatch({
            type: 'FOLLOWING_LIST_PAGE_UNLOADED'
            })
    },
})


class FollowingList extends Component {
    componentWillMount() {
        this.props.onLoad(agent.Follow.followingList(this.props.modalProps.id))
    }

    render() {
    if (!this.props.following) {
        return null
    }

    if (this.props.following.length === 0) {
        return (
                <div>
                    <p>No Following</p>
                </div>
            )
    }

 return (
        <>
            {
                this.props.following.map(follow => {
                return (
                    <Row key={follow.id} className="likeList__row">
                        <UserPreview 
                            user={follow}
                            type='FollowingList'/>
                    </Row>
                )
                
                })
            }
        </>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FollowingList)