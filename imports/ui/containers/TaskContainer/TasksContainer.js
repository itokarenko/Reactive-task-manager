import React, {Component} from 'react';

import {Tasks} from '../../../api/tasks'
import {withTracker} from 'meteor/react-meteor-data'
import {ListGroup, Button} from 'reactstrap';
import Task from '../../components/TaskComponent/TaskComponent'
import TaskModal from '../../components/TaskModal/TaskModal'
import {Meteor} from 'meteor/meteor';
import './TaskContainer.css'

/**
 * Tasks container
 */
export class TasksContainer extends Component {
  constructor(props) {
    super(props)

    this.state = {
      tasks: this.props.tasks,
      isToast: false,
      isModal: false,
      category: '',
      createdBy: ''
    }

    this.showToastBarOnUpdate = this.showToastBarOnUpdate.bind(this)
    this.createTask = this.createTask.bind(this)
    this.toggleModal = this.toggleModal.bind(this)
    this.filterBy = this.filterBy.bind(this)
    this.renderTopButton = this.renderTopButton.bind(this)
    this.cleanFilter = this.cleanFilter.bind(this)
  }

  /**
   * Handles update receive message
   */
  showToastBarOnUpdate() {
    this.setState({isToast: true})
    setTimeout(() => {
      this.setState({isToast: false})
    }, 3000)
  }

  /**
   * Toggles create task modal
   */
  toggleModal() {
    this.setState({
      isModal: !this.state.isModal,
      category: ''
    });
  }

  /**
   * Adds a new task to the tasks collection
   * @param taskName
   */
  createTask(taskName, taskCategory) {
    Tasks.insert({
      title: taskName,
      category: taskCategory,
      createdAt: new Date(),
      createdBy: this.props.currentUser.username
    });

    this.toggleModal()
  }

  /**
   * Render List of Tasks
   */
  renderTasks() {
    if (this.state.category || this.state.createdBy) {
      const filterValue = this.state.category ? 'category' : 'createdBy'

      return this.state.tasks.map(task => {
        if (task[filterValue] === this.state[filterValue]) {
          return <Task title={task.title} createdBy={task.createdBy} key={task._id}
                       category={task.category} id={task._id}
                       filterBy={this.filterBy}/>
        }
      }).reverse()
    } else {
      return this.state.tasks.map(task => <Task title={task.title} createdBy={task.createdBy} key={task._id}
                                                category={task.category} id={task._id}
                                                filterBy={this.filterBy}/>).reverse()
    }
  }

  /**
   * Sets state value of a category to be filtered
   * @param filter {key: value} for state
   */
  filterBy(filter) {
    this.setState(filter)
  }

  /**
   * Cleans category filter
   */
  cleanFilter() {
    this.setState({category: '', createdBy: ''})
  }

  renderTopButton() {
    if (this.state.category || this.state.createdBy) {
      return <Button onClick={this.cleanFilter} className="default" className="full">Clean filter</Button>
    } else {
      return <Button onClick={this.toggleModal} color="success" className="full">Create Task</Button>
    }
  }

  /**
   * Handles update of the tasks
   * @param nextProps
   */
  componentWillReceiveProps(nextProps) {
    this.setState({tasks: nextProps.tasks})

    if (this.state.tasks.length !== 0) {
      this.showToastBarOnUpdate()
    }
  }

  render() {
    return <div>
      <div className={`toastbar ${this.state.isToast ? 'show' : ''}`}>Tasks are updated</div>
      <div>
        {this.renderTopButton()}
      </div>
      <ListGroup>
        {this.renderTasks()}
      </ListGroup>
      <TaskModal title="Create Task" modal={this.state.isModal} toggleModal={this.toggleModal}
                 onSuccess={this.createTask}/>
    </div>
  }
}

export default withTracker(() => {
  Meteor.subscribe('tasks')

  return {
    tasks: Tasks.find({}).fetch(),
    currentUser: Meteor.user(),
  }
})(TasksContainer)