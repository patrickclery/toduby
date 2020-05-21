import React from "react"
import * as PropTypes from "prop-types";

class TodoPriority extends React.Component {
  render() {
    const {todoId, priority, handleUpdate} = this.props;
    return (
      <select
        name="priority-select"
        onChange={e => handleUpdate("priority", e.target.value, todoId)}
        value={priority}>
        <option value="0">Low</option>
        <option value="1">Medium</option>
        <option value="2">High</option>
      </select>
    )
  }
}

TodoPriority.propTypes = {
  todoId:       PropTypes.string,
  priority:     PropTypes.string,
  handleUpdate: PropTypes.func
}

export default TodoPriority
