import React from "react"
import {Button} from "react-bootstrap";

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
            ? <input type="checkbox" value={id} onChange={event => {
              onCheck(event, id)
            }} checked/>
            : <input type="checkbox" value={id} onChange={event => {
              onCheck(event, id)
            }}/>
          }
        </td>
        <td><Button onClick={event => {
          onDestroy(event, id)
        }}>Delete</Button></td>
      </tr>
    );
  }
}

export default TodoItem
