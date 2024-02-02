import React, { Component } from 'react'
import './LikeList.css'
import { connect } from 'react-redux'
import agent from '../../agent'
import Row from 'react-bootstrap/Row'

import UserPreview from '../Utilities/UserPreview/UserPreview'

const mapStateToProps = state => ({
    ...state.like,
    modalProps: state.modal.modalProps,
})

const mapDispatchToProps = dispatch => ({
    onLoad: payload => {
        console.log('mapDispatchToProps-onLoad')
        dispatch({
            type: 'LIKE_LIST_PAGE_LOADED',
            payload
        })
    },
    onUnload: () => {
        dispatch({
            type: 'LIKE_LIST_PAGE_UNLOADED'
        })},
})


class LikeList extends Component {
    componentWillMount() {
        this.props.onLoad(agent.Like.likeList(this.props.modalProps.slug))
    }

    render() {
        if (!this.props.likes) {
            return null
        }

        if (this.props.likes.length === 0) {
            return (
                <div>
                    <p>No Likes</p>
                </div>
            )
        }

        return (
            <>
                {
                    this.props.likes.map(like => {
                        return (
                        <Row key={like.id} className="likeList__row">
                            <UserPreview 
                                user={like.user}
                                type='LikeList'/>
                        </Row>
                        )
                        
                    })
                }
            </>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LikeList)
