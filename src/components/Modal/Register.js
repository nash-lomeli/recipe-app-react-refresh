import React, { Component } from 'react'
import { connect } from 'react-redux'
import Modal from '../Utilities/Modal/index'
import Register from '../Auth/Register/Register'

class RegisterModal extends Component {

 render() {
        return (
                 <Modal onClose={this.props.handleClose}>
                    <Register/>
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

export default connect(()=> ({}), mapDispatchToProps)(RegisterModal)
