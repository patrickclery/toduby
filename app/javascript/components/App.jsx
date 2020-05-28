import React, {Component, useState, useEffect} from "react"
import {render} from "react-dom"
import {useDispatch, useSelector, Provider} from "react-redux"
import {configureStore} from "@reduxjs/toolkit"
import {Container, Jumbotron} from "react-bootstrap"
import styled from "styled-components"
import * as PropTypes from "prop-types";

import TaskTable from "./TaskTable"
import TodoForm from "./TodoForm"
import TodoToast from "./TodoToast"

import rootReducer from "../reducers"

const store = configureStore({reducer: rootReducer})

const StyledJumbotron = styled(Jumbotron)`
  background-color: white;
`

export default function App(props) {

  const [successMessage, setSuccessMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [priority, setPriority] = useState("0")

  const fetchTodos = async () => {
    const response = await fetch(`${props.apiUri}/todos/`);
    const json = await response.json()
    setTodos(json.data)
  }

  useEffect(() => {
    fetchTodos();
  }, []);


  const handleSubmit = async (event) => {
    event.preventDefault()
    createTask({description, priority});
  }

  const handleUpdate = async (_field, _value, _todoId) => {
    // Get the todo
    const todoIndex = todos.findIndex(obj => obj.id === _todoId)
    let todo = todos[todoIndex]
    todo.attributes[_field] = _value

    const uri = `${props.apiUri}/todos/${todo.id}`
    const requestOptions = {
      method:  'PUT',
      headers: {'Content-Type': 'application/json'},
      body:    JSON.stringify({[_field]: _value})
    }

    const response = await fetch(uri, requestOptions)
    const json = await response.json()

    // If we get an error, display the error message
    if (json.errors) {
      setErrorMessage(json.errors[0].detail)
    } else {
      // Loop through Todos and replace todo with updated todo
      const newTodos = todos
      newTodos.splice(todoIndex, 1, json.data)
      setTodos(newTodos)
      setSuccessMessage(`Successfully updated ${todo.attributes.description}!`)
    }
  }

  const destroyTask = async todoId => {
    // Get the todo
    const todo = todos.filter(obj => {
      return obj.id === todoId
    })[0]

    const uri = `${apiBaseUri}/todos/${todo.id}`
    const requestOptions = {
      method:  'DELETE',
      headers: {'Content-Type': 'application/json'}
    }
    const response = await fetch(uri, requestOptions)
    const json = await response.json()

    setTodos(todos.filter(todo => {
      return todo.id !== todoId
    }))
    setSuccessMessage(`Successfully removed ${todo.attributes.description}!`)
  };

  const handleDestroy = async (event, todoId) => {
    event.preventDefault()

    await destroyTask(todoId);
  }

  const checkTask = async (todo, checked) => {
    // Sent the request to the API to update
    const uri = `${props.apiUri}/todos/${todo.id}`
    const requestOptions = {
      method:  'PUT',
      headers: {'Content-Type': 'application/json'},
      body:    JSON.stringify({todo: {completed: checked}})
    }
    const response = await fetch(uri, requestOptions)
    const json = await response.json()
    // If we get an error, display the error message
    if (json.errors) setErrorMessage(json.errors[0].detail)
    else {
      // Loop through Todos and replace todo with updated todo
      const newTodos = todos
      const todoIndex = newTodos.findIndex(obj => obj.id === todo.id)
      newTodos.splice(todoIndex, 1, json.data)
      setTodos(newTodos)
    }
  };

  const handleCheck = async (event) => {
    const id = event.target.value
    // Retrieve the Todo from the array of todos
    const todo = todos.filter(obj => {
      return obj.id === id
    })[0]
    const checked = event.target.checked ? "1" : "0"
    checkTask(todo, checked);
  }

  return (
    <Provider store={store}>
      <Container style={{width: '700px'}}>
        <TodoToast onClose={() => setSuccessMessage(null)}
                   successMessage={successMessage}/>
        <StyledJumbotron>
          <h1>Add a new task</h1>
          <TodoForm description={description}
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
                    priority={priority}/>
        </StyledJumbotron>
        <TaskTable todos={todos}
                   handleDestroy={handleDestroy}
                   handleCheck={handleCheck}
                   handleUpdate={handleUpdate}/>
      </Container>
    </Provider>
  )
}

App.propTypes = {
  apiUri: PropTypes.string
}
App.defaultProps = {
  apiUri: ""
}


