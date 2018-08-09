import React from 'react'
import {Button, Modal, ModalHeader, ModalBody, ModalFooter, InputGroup, InputGroupAddon, InputGroupText, Input} from 'reactstrap'
import PropTypes from 'prop-types';
import './TaskModal.css'

/**
 * Task Modal
 */
export default class TaskModal extends React.Component {
  constructor (props) {
    super(props)
    console.log(this.props)
    this.state = {
      name: this.props.name || '',
      category: this.props.category || '',
    }

    this.updateName = this.updateName.bind(this)
    this.updateCategory = this.updateCategory.bind(this)
  }

  updateName(e) {
      this.setState({name: e.target.value})
  }

  updateCategory(e) {
    this.setState({category: e.target.value})
  }

  /**
   * Handle props update
   * necessary to keep input value up to date after editing
   * @param nextProps
   */
  componentWillReceiveProps (nextProps) {
    this.setState({
      name: nextProps.name || '',
      category: nextProps.category || ''
    })
  }

  render() {
    return (
      <Modal isOpen={this.props.modal} toggle={this.props.toggleModal} className={this.props.className}>
        <ModalHeader toggle={this.toggle}>{this.props.title}</ModalHeader>
        <ModalBody>
          <InputGroup>
            <InputGroupAddon addonType="prepend">
              <InputGroupText>Task Name:</InputGroupText>
            </InputGroupAddon>
            <Input onChange={this.updateName} value={this.state.name}/>
          </InputGroup>
          <InputGroup>
            <InputGroupAddon addonType="prepend">
              <InputGroupText>Task Category:</InputGroupText>
            </InputGroupAddon>
            <Input onChange={this.updateCategory} value={this.state.category}/>
          </InputGroup>
        </ModalBody>
        <ModalFooter>
          <Button color="success" onClick={() => {
            this.props.onSuccess(this.state.name, this.state.category)
            this.setState({name: '', category: ''})
          }} disabled={!this.state.name}>Save</Button>{' '}
          <Button color="danger" onClick={this.props.toggleModal}>Cancel</Button>
        </ModalFooter>
      </Modal>
    );
  }
}

TaskModal.propTypes ={
  modal: PropTypes.bool.isRequired,
  toggleModal: PropTypes.func.isRequired,
  onSuccess: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  name: PropTypes.string,
  category: PropTypes.string
}
