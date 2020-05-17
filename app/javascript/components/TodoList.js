import React from "react"
import {Table} from "react-bootstrap";

class TodoList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Table striped>
        <thead>
          <tr>
            <th>Description</th>
            <th>Completed</th>
          </tr>
        </thead>
        <tbody>
          {this.props.todos && this.props.todos.map(
            todo =>
              <tr key={todo.id}>
                <td>{todo.attributes.description}</td>
                <td>{todo.attributes.completedAt}</td>
              </tr>
          )}
        </tbody>
        {this.props.todos &&
        <tfoot>
          <tr>
            <td colSpan="2">Total of {this.props.todos.length} items.</td>
          </tr>
        </tfoot>}
      </Table>
    );
  }
}

export default TodoList
