import React, { Component } from 'react'
import './FollowerList.css'
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
            type: 'FOLLOWER_LIST_PAGE_LOADED',
                payload
        })
    },
    onUnload: () => {
        dispatch({
            type: 'FOLLOWER_LIST_PAGE_UNLOADED'
            })
    },
})


class FollowerList extends Component {
    componentWillMount() {
        this.props.onLoad(agent.Follow.followerList(this.props.modalProps.id))
    }

    render() {
    if (!this.props.followers) {
        return null
    }

    if (this.props.followers.length === 0) {
        return (
                <div>
                    <p>No Followers</p>
                </div>
            )
    }

 return (
        <>
            {
                this.props.followers.map(follower => {
                return (
                    <Row key={follower.id} className="likeList__row">
                        <UserPreview 
                            user={follower}
                            type='FollowerList'/>
                    </Row>
                )
                
                })
            }
        </>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FollowerList)