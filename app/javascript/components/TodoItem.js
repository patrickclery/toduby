import React from "react"
import {Button, Form} from "react-bootstrap";
import TodoDescription from "./TodoDescription";
import TodoCheckbox from "./TodoCheckbox";

class TodoItem extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {id, attributes} = this.props.todo;
    const {todo, handleCheck, handleDestroy, handleUpdate} = this.props;
    const {description, completedAt} = attributes;

    return (
      <tr key={id}>
        <td>
          <TodoCheckbox
            value={id}
            handleCheck={handleCheck}
            isChecked={!!completedAt}/>
        </td>
        <td>
          <TodoDescription
            todoId={id}
            description={description}
            handleUpdate={handleUpdate}
          />
        </td>
        <td>
          <Button onClick={event => {
            handleDestroy(event, id)
          }}>Delete</Button>
        </td>
      </tr>
    );
  }
}

export default TodoItem
