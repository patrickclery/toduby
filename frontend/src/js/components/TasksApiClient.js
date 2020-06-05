import * as PropTypes from "prop-types"

export default class TaskApiClient {
  constructor(props) {
    this.apiUrl = props.baseUrl
  }

  /**
   * Get a list of tasks from the API
   * @returns {Promise} the JSON data
   */
  async fetchTasks() {
    const requestOptions = {
      method:  "GET",
      headers: {"Content-Type": "application/json"}
    }
    const response = await fetch(`${this.apiUrl}/todos/`, requestOptions)
    return response.json()
  }

  /**
   * Create a new task using attributes
   * @returns {Promise} the JSON data
   * @param description The task text
   * @param priority Any of [0,1,2] from low to high
   */
  async createTask(description, priority) {
    const requestOptions = {
      method:  "POST",
      headers: {"Content-Type": "application/json"},
      body:    JSON.stringify({
                                description,
                                priority
                              })
    }
    const response = await fetch(`${this.apiUrl}/todos/`, requestOptions)
    return response.json()
  }

  async updateTask(id, attributes) {
    // Get the todo
    const todoIndex = this.state.todos.findIndex(obj => obj.id === _todoId)
    let todo = this.state.todos[todoIndex]
    todo.attributes[_field] = _value

    const uri = `${this.apiBaseUri}/todos/${todo.id}`
    const requestOptions = {
      method:  "PUT",
      headers: {"Content-Type": "application/json"},
      body:    JSON.stringify({[_field]: _value})
    }

    let response = await fetch(uri, requestOptions)
    const json = await response.json()

    // If we get an error, display the error message
    if (json.errors) {
      this.setState({errorMessage: json.errors[0].detail})
    } else {
      // Loop through Todos and replace todo with updated todo
      const newTodos = this.state.todos
      newTodos.splice(todoIndex, 1, json.data)
      this.setState({todos: newTodos})
      this.setState({successMessage: `Successfully updated ${todo.attributes.description}!`})
    }
  }

  async destroyTask(event, todoId) {
    event.preventDefault()

    // Get the todo
    const todo = this.state.todos.filter(obj => {
      return obj.id === todoId
    })[0]

    const uri = `${this.apiBaseUri}/todos/${todo.id}`
    const requestOptions = {
      method:  "DELETE",
      headers: {"Content-Type": "application/json"}
    }

    fetch(uri, requestOptions).then(response => {
      this.setState(
        {
          todos:          this.state.todos.filter(todo => {
            return todo.id !== todoId
          }),
          successMessage: `Successfully removed ${todo.attributes.description}!`
        }
      )
    })
  }

  async checkTask(event) {
    const id = event.target.value
    // Retrieve the Todo from the array of todos
    const todo = this.state.todos.filter(obj => {
      return obj.id === id
    })[0]

    // Sent the request to the API to update
    const checked = event.target.checked ? "1" : "0"
    const uri = `${this.apiBaseUri}/todos/${todo.id}`
    const requestOptions = {
      method:  "PUT",
      headers: {"Content-Type": "application/json"},
      body:    JSON.stringify({completed: checked})
    }
    const response = await fetch(uri, requestOptions)
    const json = await response.json()
    // If we get an error, display the error message
    if (json.errors) {
      this.setState({errorMessage: json.errors[0].detail})
    } else {
      // Loop through Todos and replace todo with updated todo
      const newTodos = this.state.todos
      const todoIndex = newTodos.findIndex(obj => obj.id === id)
      newTodos.splice(todoIndex, 1, json.data)
      this.setState({todos: newTodos})
    }
  }
}