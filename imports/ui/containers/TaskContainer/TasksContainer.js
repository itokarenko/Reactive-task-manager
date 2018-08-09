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
      isModal: false
    }

    this.showToastBarOnUpdate = this.showToastBarOnUpdate.bind(this)
    this.createTask = this.createTask.bind(this)
    this.toggleModal = this.toggleModal.bind(this)
    this.filterByCategory = this.filterByCategory.bind(this)
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
    if (this.state.category) {
      return this.state.tasks.map(task => {
        if (task.category === this.state.category) {
          console.log(task.category)
          return <Task title={task.title} createdBy={task.createdBy} key={task._id}
                category={task.category} id={task._id}
                filterByCategory={this.filterByCategory}/>
        }
      }).reverse()
    } else {
      return this.state.tasks.map(task => <Task title={task.title} createdBy={task.createdBy} key={task._id}
                                                category={task.category} id={task._id}
                                                filterByCategory={this.filterByCategory}/>).reverse()
    }
  }

  /**
   * Sets state value of a category to be filtered
   * @param category
   */
  filterByCategory(category) {
    this.setState({category})
  }

  /**
   * Cleans category filter
   */
  cleanFilter() {
    this.setState({category: ''})
  }

  renderTopButton () {
    if (this.state.category) {
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