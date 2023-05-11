# Simple Todo List with EJS and backend Express

## Table of contents
* [General info](#general-info)
* [Technologies](#technologies)
* [Setup](#setup)
* [Project Links](#project-links)
* [Features](#features)
* [Project Status](#project-status)
* [Read more](#read-more)

## General info
Todo list backend with task. 

## Technologies
Project is created with:
 * Express
 * EJS

## Setup
To run this project, install it locally using npm:
```
git clone https://github.com/Sisarus/Nodejs-todoList.git
cd .\Nodejs-todoList\
npm install
npm run dev
```

## Project Links

* Opens to [localhost](http://localhost:3000)
* Create own task list with params [/:yourTodo](http://localhost:3000/MyOwnlist)

## Features
List the ready features here:

 * Find all tasks
 * Add task
 * delete task
 * Create new task list

## Project Status
Project is: complete

<!-- in progress / complete / no longer being worked on. If you are no longer working on it, provide reasons why. -->

### Read more

[EJS Templates](https://ejs.co/)

## Need NoSQL to work

Install https://www.mongodb.com/try/download/community

### Add .bash for MongoDB

This PC > Properties > Advanced system settings > Environment Variables
Edit >

Add to the list by clicking New >

Browse for your MongoDB installation directory and select the Bin Folder.
look fot help_data -> environment_variable.jpg

### Run MongoDB

run every vere CMD -> mongosh
run every vere CMD -> mongod

### MongoDB

show dbs

use database_name

db

db.dropDatabase()
