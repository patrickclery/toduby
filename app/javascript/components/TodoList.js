import React from "react"
import {Table} from "react-bootstrap";
import TodoItem from "./TodoItem";

class TodoList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {handleDestroy, handleCheck, todos} = this.props;
    return (
      <Table striped>
        <tbody>
          {todos && todos.map(
            todo =>
              <TodoItem
                todo={todo}
                handleDestroy={handleDestroy}
                handleCheck={handleCheck}
              />
          )}
        </tbody>
        {todos &&
        <tfoot>
          <tr>
            <td colSpan="3">Total of {todos.length} items.</td>
          </tr>
        </tfoot>}
      </Table>
    );
  }
}

export default TodoList
