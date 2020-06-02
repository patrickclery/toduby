import React from "react"
import TaskItem from "./TaskItem"

function TaskRows(props) {
  const {handleDestroy, handleCheck, handleUpdate, tasks} = props
  return (
    tasks && tasks.map(
      task =>
        <TaskItem key={task.id}
                  task={task}
                  handleDestroy={handleDestroy}
                  handleCheck={handleCheck}
                  handleUpdate={handleUpdate}/>
    )
  )
}

export default TaskRows
