# Coding test
This coding test is designed to show us your thought process and approach, as well as demonstrate your skills. How much effort you put into it is up to you, but typically we would expect two to three hours is reasonable. Some people choose to spend more - that’s fine, but not required.  

You are welcome to stop whenever you like.  
We are not expecting you to spend an insane amount of time on this. We feel that, using the right technologies, it is possible to achieve what the test asks for, in the timescale indicated. If you cannot achieve everything exactly as you would ideally like, let us know. Feel free to ask us questions if you need to.

## Technologies
Use whatever languages, frameworks, etc. you feel are best, or are most comfortable with, along with third-party libraries. You are free to specify architecture and system dependencies as you see fit. Please choose an appropriate CSS framework or implement something so that what we review is pleasant to look at and shows some thought as to layout and interactivity.

## Requirements
Create an application that will allow at least two users to access it simultaneously and manage a list of items. For example some daily tasks, a shared list for shopping. The items only require one text field.  

The users should be able to perform standard create, view, update, delete, and if one user makes a change, the other user(s) should see the change without manually refreshing their web browser. In Realtime. 

Your solution should follow best practice, and be robust and scalable. We expect to see the same techniques and approaches that you would use in a real project.

## User Journeys
* Mark wants to keep track of some daily tasks. He enters his name on a screen,
and is presented with a list of tasks. He adds
    * ‘Brush teeth’
    * ‘Catch bus to work’ 
    * ‘Do your job’

* Sandy logs in and adds
    * ‘Have lunch’
    * ‘Go home’
    * ‘Watch television’

* Mark sees Sandy’s entries appear. He edits ‘Watch television’ to be ‘Watch Newsnight’
* This change appears on Sandy’s screen as soon as he has done it.

## Bonus points
The following areas are not required, but if you choose to include them we will count them as bonus points.
* Appropriate and sensible tests.
* Any other dimensions on the data that might be useful, e.g. tagging.
* Responsive design techniques for different screen sizes, mobiles, etc.
* Any form of notifications - e.g. toast, element styling - to alert the user that
something on their screen has changed.

## Deliverables
Supply your efforts in a zipped Git repository, i.e. complete with the .git folder so that we can review your commit history, along with full documentation to set it up and run it. We will follow the instructions to the letter. If particular system components or services are required, include notes about their setup and configuration where it deviates from the default, out-of-the-box state. Note the version numbers of any system software required, if appropriate.
Please include any notes that you would like us to read, along with answers to the following questions:
* How long did you spend on the coding test?
* Did you manage to cover everything that you wanted to?
* What would you add to your solution if you had more time?

## This Project
This stub project will provide a Meteor connection back to a server and database. This provides the realtime data to your application. Alternatively you could use Google Firebase. Or Amazon AppSync. Or write your own implementation for synchronising multiple clients using websockets etc. But that is a lot of work. 

Meteor will run on your development machine, PC or Mac. You will need a development environment with node, npm and git. By cloning this repo you may not need to install the Meteor command in order to complete this project. The Meteor command allows you to create new Meteor projects with the Meteor directory structure and build system already in place.

This project is installed like so:
```
$ mkdir freeman  
$ cd freeman  
$ git clone **this repository**  
$ cd **this repository**  
$ npm install  
$ npm start
```
Similarly you can run any of the scripts in package.json.

Within meteor projects there is a .meteor folder that is a part of the source code. It is checked in to git. That folder hides a MongoDB database. If everything goes wrong try deleting these 2 project folders and re-install: ./node_modules and ./.meteor/local 

Both ./node_modules and ./.meteor/local are built, they are ignored by git. 

There is a simple example test: `$ npm run test` Or run it in the browser like this: `$ npm run test-app` 

There is a the start of a client application in the `./client` folder. This points to your React application component <App />  which you will write in the `./imports` folder. The client begins the page by linking to the Twitter Bootstrap CSS file, without jQuery, but you are free to delete this and use something else. The server side code is very simple in this case. See `./server` folder. 

## Tasks Collection
Already a collection of list items has been declared on the server and on the client `Tasks`. The collection appears within the App as an array `this.props.tasks`. This data will be synchronized by Meteor into a Mongo database and synchronized to all clients.

## Requirement
How you display, delete, add and edit items are decisions for you.

Open and navigate 2 or more tabs in your browser to http://localhost:3000/

If you enter data in one you should automatically / immediately see the results in the other.

They should remain synchronized as you add, delete and update the task list items in either client.
