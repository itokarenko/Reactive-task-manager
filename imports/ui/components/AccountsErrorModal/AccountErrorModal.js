import React from 'react';
import {Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
import TaskComponent from "../TaskComponent/TaskComponent";
import PropTypes from "prop-types";

class AccountErrorModal extends React.Component {
  render() {
    return (
      <Modal isOpen={this.props.toggleModal} toggle={this.props.toggle} className={this.props.className}>
        <ModalHeader toggle={this.toggle}>Error</ModalHeader>
        <ModalBody>
          <div>
            {this.props.error}
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={this.props.toggle}>Cancel</Button>
        </ModalFooter>
      </Modal>
    );
  }
}

export default AccountErrorModal;


AccountErrorModal.propTypes ={
  error: PropTypes.string.isRequired,
  toggleModal: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
}