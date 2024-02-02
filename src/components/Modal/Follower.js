import React, { Component } from 'react'
import { connect } from 'react-redux'
import Modal from '../Utilities/Modal/index'
import FollowerList from '../FollowerList/FollowerList'

class FollowerModal extends Component {

 render() {
        return (
                 <Modal onClose={this.props.handleClose}>
                    <FollowerList/>
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

export default connect(()=> ({}), mapDispatchToProps)(FollowerModal)
