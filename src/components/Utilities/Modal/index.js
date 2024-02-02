import React, {Component} from 'react';
import './index.css'
import {connect} from 'react-redux';

import RSmodal  from 'react-bootstrap/Modal'


const mapStateToProps = state => ({
  modalType: state.modal.modalType,
  modalProps: state.modal.modalProps,
});

const mapDispatchToProps = dispatch => ({
  onHide: () => 
      dispatch({
          type: 'HIDE_MODAL',
      })
})

class Modal extends Component {
  
    closeModal = () => {
      this.props.onHide();
    };
  
    render() {
      return (
            <RSmodal
                onHide={this.closeModal}
                show={this.props.modalProps.show}
                centered
                dialogClassName="modal-90w public-profile-modal-class"
                className="modal_design"
                size="sm">
              <RSmodal.Header closeButton>
                <RSmodal.Title id="contained-modal-title-vcenter">
                  {this.props.modalProps.title}
                </RSmodal.Title>
              </RSmodal.Header>
              <RSmodal.Body>
                {this.props.children}
              </RSmodal.Body>
            </RSmodal>
      )
    }
  }
  
  export default connect(mapStateToProps,mapDispatchToProps)(Modal);
