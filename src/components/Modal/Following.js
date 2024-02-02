import React, { Component } from 'react'
import { connect } from 'react-redux'
import Modal from '../Utilities/Modal/index'
import FollowingList from '../FollowingList/FollowingList'

class FollowingModal extends Component {

    render() {
        return (
            <Modal onClose={this.props.handleClose}>
                <FollowingList/>
            </Modal>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    handleClose: () => {
        dispatch({
            type: 'HIDE_MODAL'
        })
    }
})

export default connect(()=> ({}), mapDispatchToProps)(FollowingModal)
