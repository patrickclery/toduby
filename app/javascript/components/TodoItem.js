import React from "react"
import {Button} from "react-bootstrap";
import styles from "./TodoItem.css"

class TodoItem extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {id, attributes} = this.props.todo;
    const {onCheck, onDestroy} = this.props;
    const {description, completedAt} = attributes;

    return (
      <tr key={id}>
        <td>{description}</td>
        <td>{completedAt}</td>
        <td>
          {completedAt
            ? <input
              className="todo-checkbox"
              type="checkbox"
              value={id}
              onChange={event => {
                onCheck(event, id)
              }} checked/>
            : <input
              className="todo-checkbox"
              type="checkbox"
              value={id}
              onChange={event => {
                onCheck(event, id)
              }}/>
          }<span className="delete-button"><
          Button
          onClick={event => {
            onDestroy(event, id)
          }}>Delete</Button></span></td>
      </tr>
    );
  }
}

export default TodoItem
