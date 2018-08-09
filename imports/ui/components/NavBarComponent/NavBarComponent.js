import React, {Component} from 'react'
import {withTracker} from 'meteor/react-meteor-data'
import {
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Collapse,
  NavbarToggler
} from 'reactstrap';

export class NavBarComponent extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isOpen: false
    }

    this.toggleNavbar = this.toggleNavbar.bind(this)
  }

  /**
   * Handles navbar collapse when mobile
   */
  toggleNavbar() {
    this.setState({
      isOpen: !this.state.isOpen
    })
  }

  /**
   * Redirect user to tasks page
   */
  goToTasksPage() {
    FlowRouter.go('/tasks');
  }

  /**
   * Redirect user to login page
   */
  goToLoginPage() {
    FlowRouter.go('/login');
  }

  /**
   * Logout from current user
   */
  logout() {
    Meteor.logout()
    FlowRouter.go('/');
  }

  render() {
    return (
      <div>
        <Navbar color="dark" dark expand="md">
          <NavbarBrand href="/">Task Manager</NavbarBrand>
          <NavbarToggler onClick={this.toggleNavbar}/>
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink className={this.props.currentUser ? 'd-none' : ''} onClick={this.goToLoginPage}>
                  Login
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink className={this.props.currentUser ? '' : 'd-none'} onClick={this.goToTasksPage}>
                  Tasks
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink className={this.props.currentUser ? '' : 'd-none'} onClick={this.logout}>
                  Logout
                </NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    )
  }
}

export default withTracker(() => {
  return {
    users: Meteor.users,
    currentUser: Meteor.user()
  }
})(NavBarComponent)