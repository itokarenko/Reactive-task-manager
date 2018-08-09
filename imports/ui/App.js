import React, {Component} from 'react'
import {withTracker} from 'meteor/react-meteor-data'
import NavBarComponent from './components/NavBarComponent/NavBarComponent'

export class _App extends Component {
  constructor(props) {
    super(props)
  }

  /**
   * Prevent switching to login route if user is logged in
   * @param nextProps
   */
  componentWillReceiveProps(nextProps) {
    if (nextProps.currentUser && FlowRouter.getRouteName() === 'Login') {
      FlowRouter.go('/tasks')
    }
  }

  render() {
    return (
      <div>
        <NavBarComponent/>
        <div className="container">
          {this.props.content}
        </div>
      </div>
    )
  }
}

/**
 * Put synchronized tasks into props
 */
export default withTracker(() => {
  return {
    users: Meteor.users,
    currentUser: Meteor.user()
  }
})(_App)