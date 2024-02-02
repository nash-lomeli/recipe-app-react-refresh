import React from 'react';
import {connect} from 'react-redux';
import LikeModal from './Like';
import FollowingModal from './Following'
import FollowerModal from './Follower'
import NoteModal from './Note'
import RegisterModal from './Register'

const ModalContainer = props => {
  switch (props.modalType) {
    case 'REGISTER':
      return <RegisterModal/>
    case 'LIKE':
      return <LikeModal />;
    case 'FOLLOWING':
      return <FollowingModal/>
    case 'FOLLOWER':
      return <FollowerModal/>
    case 'NOTE':
        return <NoteModal/>
    default:
      return null;
  }
};

const mapStateToProps = state => ({
  modalType: state.modal.modalType,
  modalProps: state.modal.modalProps,
});

export default connect(mapStateToProps)(ModalContainer);
