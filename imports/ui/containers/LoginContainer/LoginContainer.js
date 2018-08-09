import React, {Component} from 'react';
import {Col, Button, Form, FormGroup, Label, Input, Row} from 'reactstrap';
import AccountErrorModal from '../../components/AccountsErrorModal/AccountErrorModal'
import {Accounts} from 'meteor/accounts-base'
import {FlowRouter} from 'meteor/kadira:flow-router'

/**
 * Login container
 */
export default class LoginContainer extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isCreate: false,
      isError: false,
      errorMessage: '',
      email: '',
      password: '',
      username: ''
    }

    this.toggleCreateAccount = this.toggleCreateAccount.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
    this.emailOnChange = this.emailOnChange.bind(this)
    this.passwordOnChange = this.passwordOnChange.bind(this)
    this.usernameOnChange = this.usernameOnChange.bind(this)
    this.toggleErrorModal = this.toggleErrorModal.bind(this)
    this.createLoginCallback = this.createLoginCallback.bind(this)
  }

  /**
   * Switch between create and login account modes
   */
  toggleCreateAccount() {
    this.setState({isCreate: !this.state.isCreate})
  }

  /**
   * Toggle Error handler modal window
   */
  toggleErrorModal() {
    this.setState({
      isError: !this.state.isError
    });
  }

  /**
   * Callback for the create and login
   * in case of success @param error will be undefined
   * @param error
   */
  createLoginCallback(error) {
    if (error) {
      this.setState({errorMessage: error.reason}, this.toggleErrorModal)
    } else {
      this.setState({
        errorMessage: '',
        email: '',
        password: '',
        username: ''
      })

      FlowRouter.go('/tasks')
    }
  }

  /**
   * Handle Create user
   */
  createUser() {
    Accounts.createUser({
      email: this.state.email,
      password: this.state.password,
      username: this.state.username
    }, this.createLoginCallback)
  }

  /**
   * Handle Login user
   */
  login() {
    Meteor.loginWithPassword(this.state.email, this.state.password, this.createLoginCallback)
  }


  /**
   * On Submit of the form action will depend on the current mode: login or create
   */
  onSubmit() {
    if (this.state.isCreate) {
      this.createUser()
    } else {
      this.login()
    }
  }

  emailOnChange(e) {
    this.setState({email: e.target.value})
  }

  passwordOnChange(e) {
    this.setState({password: e.target.value})
  }

  usernameOnChange(e) {
    this.setState({username: e.target.value})
  }

  render() {
    return (
      <div>
        <Form>
          <FormGroup className={this.state.isCreate ? '' : 'd-none'} row>
            <Label for="userName" sm={2}>Username</Label>
            <Col sm={10}>
              <Input type="text" name="username" id="userName" placeholder="username" value={this.state.username}
                     onChange={this.usernameOnChange}/>
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="email" sm={2}>Email</Label>
            <Col sm={10}>
              <Input type="email" name="email" id="email" placeholder="email" value={this.state.email}
                     onChange={this.emailOnChange}/>
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="password" sm={2}>Password</Label>
            <Col sm={10}>
              <Input type="password" name="password" id="password" placeholder="password" value={this.state.password}
                     onChange={this.passwordOnChange}/>
            </Col>
          </FormGroup>

          <FormGroup inline>
            <Row>
              <Col xs="6">
                <Button onClick={this.onSubmit}>{this.state.isCreate ? 'Create' : 'Login'}</Button>
              </Col>
              <Col xs="6">
                <a href=""
                   className="float-right"
                   onClick={this.toggleCreateAccount}>{this.state.isCreate ? 'Have an account' : 'Create account'}</a>
              </Col>
            </Row>
          </FormGroup>
        </Form>
        <AccountErrorModal toggle={this.toggleErrorModal} error={this.state.errorMessage}
                           toggleModal={this.state.isError}/>
      </div>
    )
  }
}