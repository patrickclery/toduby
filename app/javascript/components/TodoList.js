import React from "react"
import {Table} from "react-bootstrap";
import TodoItem from "./TodoItem";
import TodoForm from "./TodoForm";

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
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {this.props.todos && this.props.todos.map(
            todo =>
              <TodoItem
                todo={todo}
                onDestroy={this.props.handleDestroy}
                onCheck={this.props.handleCheck}
              />
          )}
        </tbody>
        {this.props.todos &&
        <tfoot>
          <tr>
            <td colSpan="3">Total of {this.props.todos.length} items.</td>
          </tr>
        </tfoot>}
      </Table>
    );
  }
}

export default TodoList
