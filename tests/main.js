import assert from "assert";
import React from 'react'
import expect from 'expect'
import {shallow, configure} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

configure({adapter: new Adapter()});

import HomeContainer from '../imports/ui/containers/HomeContainer/HomeContainer'
import LoginContainer from '../imports/ui/containers/LoginContainer/LoginContainer'
import {TasksContainer} from '../imports/ui/containers/TaskContainer/TasksContainer'
import TaskComponent from '../imports/ui/components/TaskComponent/TaskComponent'
import TaskModal from '../imports/ui/components/TaskModal/TaskModal'

describe("reactive-tasks-meteor2", function () {
  it("package.json has correct name", async function () {
    const {name} = await import("../package.json");
    assert.strictEqual(name, "reactive-tasks");
  });

  if (Meteor.isClient) {
    it("client is not server", function () {
      assert.strictEqual(Meteor.isServer, false);
    });
  }

  if (Meteor.isServer) {
    it("server is not client", function () {
      assert.strictEqual(Meteor.isClient, false);
    });
  }
});

describe('Home Container', () => {
  const wrapper = shallow(<HomeContainer/>)
  it('renders h1', () => {
    expect(wrapper.find('h1').text()).toEqual('Welcome to the Task Manager')
  });
  it('renders h4', () => {
    expect(wrapper.find('h4').text()).toEqual('Please login to continue working with the app')
  });
});

describe('Login Container', () => {
  const wrapper = shallow(<LoginContainer/>)
  it('renders correct amount of inputs', () => {
    expect(wrapper.find('Input').length).toEqual(3)
  });

  it('renders correct amount of inputs', () => {
    expect(wrapper.find('Input').length).toEqual(3)
  });
});

describe('Tasks Container', () => {
  it('renders correct amount of Tasks', () => {
    let wrapper = shallow(<TasksContainer tasks={[{title: 'First Task', createdBy: 'Illia'}]}/>)
    expect(wrapper.find('TaskComponent').length).toEqual(1)
  });

  it('renders correct amount of Tasks', () => {
    let wrapper = shallow(<TasksContainer
      tasks={[
        {
          title: 'First Task',
          createdBy: 'Illia'
        },
        {
          title: 'Second Task',
          createdBy: 'Illia'
        },
        {
          title: 'Third Task',
          createdBy: 'Illia'
        }]}/>)
    expect(wrapper.find('TaskComponent').length).toEqual(3)
  });

});

describe('Task Component', () => {
  const wrapper = shallow(<TaskComponent title='Test Task' createdBy='Illia'/>)
  it('renders correct Task tile', () => {
    expect(wrapper.find('h1').text()).toEqual('Test Task')
  });

  it('renders correct Author', () => {
    expect(wrapper.find('span').text()).toEqual('Author: Illia')
  });
});




