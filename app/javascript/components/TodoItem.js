import React from "react"
import {Button} from "react-bootstrap";

class TodoItem extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <tr key={this.props.todo.id}>
        <td>{this.props.todo.attributes.description}</td>
        <td>{this.props.todo.attributes.completedAt}</td>
        <td><Button
          onClick={event => {
            this.props.onDestroy(event, this.props.todo.id)
          }}
        >Delete</Button></td>
      </tr>
    );
  }
}

export default TodoItem
