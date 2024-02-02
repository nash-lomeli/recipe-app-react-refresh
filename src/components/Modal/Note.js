import React, { Component } from 'react'
import { connect } from 'react-redux'
import Modal from '../Utilities/Modal/index'
import NoteForm from '../NoteForm/NoteForm'

class NoteModal extends Component {

    render() {
        return (
            <Modal onClose={this.props.handleClose}>
                <NoteForm/>
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

export default connect(()=> ({}), mapDispatchToProps)(NoteModal)
