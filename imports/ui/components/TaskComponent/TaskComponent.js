import React, {Component} from 'react'
import {ListGroupItem, Row, Col} from 'reactstrap';
import {Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Badge} from 'reactstrap';
import {Tasks} from '../../../api/tasks';
import TaskModal from '../TaskModal/TaskModal';
import PropTypes from "prop-types";

/**
 * Task Component
 */
export default class TaskComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      dropdownOpen: false,
      isTaskModal: false,
    }

    this.toggle = this.toggle.bind(this)
    this.deleteTask = this.deleteTask.bind(this)
    this.editTask = this.editTask.bind(this)
    this.toggleTaskModal = this.toggleTaskModal.bind(this)
    this.handleCategoryFilter = this.handleCategoryFilter.bind(this)
    this.handleAuthorFilter = this.handleAuthorFilter.bind(this)
  }

  /**
   * Toggle task dropdown
   */
  toggle() {
    this.setState({dropdownOpen: !this.state.dropdownOpen})
  }

  /**
   * Toggle edit task modal
   */
  toggleTaskModal() {
    this.setState({isTaskModal: !this.state.isTaskModal})
  }

  /**
   * delete task from the collection
   */
  deleteTask() {
    Tasks.remove(this.props.id);
  }

  /**
   * Update task from the collection on change
   * @param title
   */
  editTask(title, category) {
    Tasks.update(this.props.id, {
      $set: {title, category},
    });
    this.toggleTaskModal()
  }

  /**
   * handles callback for category filter
   */
  handleCategoryFilter() {
    this.props.filterBy({category: this.props.category})
  }

  /**
   * handles callback for author filter
   */
  handleAuthorFilter() {
    this.props.filterBy({createdBy: this.props.createdBy})
  }

  render() {
    return (
      <div>
        <ListGroupItem>
          <Row>
            <Col xs="8">
              <h1>{this.props.title}</h1>
              <span onClick={this.handleAuthorFilter}>Author: {this.props.createdBy}</span>
              <Badge onClick={this.handleCategoryFilter} pill>{this.props.category}</Badge>
            </Col>
            <Col xs="4">
              <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle} className='float-right'>
                <DropdownToggle className="default">
                  ...
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem onClick={this.toggleTaskModal}>
                    Edit
                  </DropdownItem>
                  <DropdownItem onClick={this.deleteTask}>
                    Delete
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </Col>
          </Row>
        </ListGroupItem>
        <TaskModal title='Edit Task' modal={this.state.isTaskModal} toggleModal={this.toggleTaskModal}
                   onSuccess={this.editTask} name={this.props.title} category={this.props.category}/>
      </div>)
  }
}

TaskComponent.propTypes = {
  id: PropTypes.string.isRequired,
  filterBy: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  category: PropTypes.string,
  author: PropTypes.string
}