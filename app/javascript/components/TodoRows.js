import React from "react"
import TodoItem from "./TodoItem";

function TodoRows(props) {
  const {handleDestroy, handleCheck, handleUpdate, todos} = props;
  return (
    todos && todos.map(
      todo =>
        <TodoItem todo={todo}
                  handleDestroy={handleDestroy}
                  handleCheck={handleCheck}
                  handleUpdate={handleUpdate}/>
    )
  )
}

export default TodoRows
