import React, {Component} from 'react'
import {Alert, Jumbotron} from 'react-bootstrap';
import TodoList from "./TodoList";
import TodoForm from "./TodoForm";

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      successMessage: null,
      description:    null,
      priority:       "0",
      todos:          []
    }

    this.apiBaseUri = "/api/v1"
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleDestroy = this.handleDestroy.bind(this);
    this.handleCheck = this.handleCheck.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
  }

  async componentDidMount() {
    const uri = `${this.apiBaseUri}/todos/`;

    const response = await fetch(uri);
    const json = await response.json();

    // If we get an error, display the error message
    if (json.errors) {
      this.setState({errorMessage: json.errors[0].detail})
    } else {
      this.setState(
        {
          todos:       json.data,
          description: null,
          priority:    "0"
        }
      );
    }
  }

  async handleChange(event) {
    this.setState({[event.target.name]: event.target.value})
  }

  async handleSubmit(event) {
    event.preventDefault();

    const uri = `${this.apiBaseUri}/todos/`;
    const requestOptions = {
      method:  'POST',
      headers: {'Content-Type': 'application/json'},
      body:    JSON.stringify(
        {
          description: this.state.description,
          priority:    this.state.priority
        }
      )
    };

    const response = await fetch(uri, requestOptions)
    const json = await response.json()

    // If we get an error, display the error message
    if (json.errors) {
      this.setState({errorMessage: json.errors[0].detail})
    } else {
      this.setState(
        {
          todos:          [...this.state.todos, json.data],
          successMessage: `Successfully added ${this.state.description}!`,
          description:    null,
          priority:       "0"
        }
      )
    }
  }

  async handleUpdate(_field, _value, _todoId) {
    // Get the todo
    const todoIndex = this.state.todos.findIndex(obj => obj.id === _todoId)
    let todo = this.state.todos[todoIndex];
    todo[_field] = _value;

    const uri = `${this.apiBaseUri}/todos/${todo.id}`;
    const requestOptions = {
      method:  'PUT',
      headers: {'Content-Type': 'application/json'},
      body:    JSON.stringify({[_field]: _value})
    };

    let response = await fetch(uri, requestOptions);
    const json = await response.json()

    // If we get an error, display the error message
    if (json.errors) {
      this.setState({errorMessage: json.errors[0].detail})
    } else {
      // Loop through Todos and replace todo with updated todo
      const newTodos = this.state.todos
      newTodos.splice(todoIndex, 1, json.data)
      this.setState({todos: newTodos})
      this.setState({successMessage: `Successfully updated ${todo.description}!`,})
    }
  }

  async handleDestroy(event, todoId) {
    event.preventDefault()

    // Get the todo
    const todo = this.state.todos.filter(obj => {
      return obj.id === todoId
    })[0]

    const uri = `${this.apiBaseUri}/todos/${todo.id}`
    const requestOptions = {
      method:  'DELETE',
      headers: {'Content-Type': 'application/json'}
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

  async handleCheck(event) {
    const id = event.target.value
    // Retrieve the Todo from the array of todos
    const todo = this.state.todos.filter(obj => {
      return obj.id === id
    })[0]

    // Sent the request to the API to update
    const checked = event.target.checked ? "1" : "0"
    const uri = `${this.apiBaseUri}/todos/${todo.id}`
    const requestOptions = {
      method:  'PUT',
      headers: {'Content-Type': 'application/json'},
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

  render() {
    return (
      <div className="container m-3">
        <Jumbotron>
          <h1>Todo App</h1>
        </Jumbotron>

        <TodoList
          todos={this.state.todos}
          handleDestroy={this.handleDestroy}
          handleCheck={this.handleCheck}
          handleUpdate={this.handleUpdate}
        />

        {this.state.successMessage &&
        <Alert variant="success" onClose={() => this.setState({successMessage: null})} dismissible>
          <Alert.Heading>Hooray!</Alert.Heading>
          <p>{this.state.successMessage}</p>
        </Alert>}
        {this.state.errorMessage &&
        <Alert variant="danger" onClose={() => this.setState({errorMessage: null})} dismissible>
          <Alert.Heading>Uh-oh! Something went wrong...</Alert.Heading>
          <p>{this.state.errorMessage}</p>
        </Alert>}

        <TodoForm
          description={this.state.description}
          priority={this.state.priority}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
        />
      </div>
    )
  }
}

export default App;

