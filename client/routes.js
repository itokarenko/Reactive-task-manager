import React from 'react'
import { FlowRouter } from 'meteor/kadira:flow-router'
import { mount } from 'react-mounter'

import App from '../imports/ui/App'
import HomeContainer from '../imports/ui/containers/HomeContainer/HomeContainer'
import LoginContainer from '../imports/ui/containers/LoginContainer/LoginContainer'
import TasksContainer from '../imports/ui/containers/TaskContainer/TasksContainer'

FlowRouter.route('/', {
  name: 'Home',
  action(){
    mount( App, {
      content: <HomeContainer />
    })
  }
})

FlowRouter.route('/login', {
  name: 'Login',
  action(){
    mount( App, {
      content: <LoginContainer />
    })
  }
})

FlowRouter.route('/tasks', {
  name: 'Tasks',
  action(){
    mount( App, {
      content: <TasksContainer />
    })
  }
})