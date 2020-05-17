import React, {Component} from 'react'
import {Alert, Jumbotron} from 'react-bootstrap';
import TodoList from "./TodoList";
import TodoForm from "./TodoForm";

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      successMessage: null,
      successMessage: null,
      description:    null,
      todos:          []
    }

    this.apiBaseUri = "/api/v1"
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
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
          description: null
        }
      );
    }
  }

  async handleChange(event) {
    this.setState({description: event.target.value})
  }

  async handleSubmit(event) {
    event.preventDefault();

    const uri = `${this.apiBaseUri}/todos/`;
    const requestOptions = {
      method:  'POST',
      headers: {'Content-Type': 'application/json'},
      body:    JSON.stringify({description: this.state.description})
    };

    const response = await fetch(uri, requestOptions);
    const json = await response.json();

    // If we get an error, display the error message
    if (json.errors) {
      this.setState({errorMessage: json.errors[0].detail})
    } else {
      this.setState(
        {
          todos:          [...this.state.todos, json.data],
          successMessage: `Successfully added ${this.state.description}!`,
          description:    null
        }
      );
    }
  }

  render() {
    return (
      <div className="container m-3">
        <Jumbotron>
          <h1>Todo App</h1>
        </Jumbotron>

        <TodoList todos={this.state.todos}/>

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
          description={this.state.descritpion}
          onChange={this.handleChange}
          onSubmit={this.handleSubmit}
        />
      </div>
    );
  }
}

export default App;

