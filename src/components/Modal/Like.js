import React, { Component } from 'react'
import { connect } from 'react-redux'
import Modal from '../Utilities/Modal/index'
import LikeList from '../LikeList/LikeList'

class LikeModal extends Component {

    render() {

        return (
            <Modal onClose={this.props.handleClose}>
                <LikeList/>
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

export default connect(()=> ({}), mapDispatchToProps)(LikeModal)