import React, {Component} from "react"
import TaskTable from "./TaskTable"
import {fetchTasks as fetchTasksReducer} from "./tasksSlice"

export default TaskApp = props => {
  const baseUrl = props.baseUrl
  const fetchTasks = () => {
    fetchTasksReducer(baseUrl)
  }

  useEffect(() => {
    fetchTasks()
  })

  return (
    <TaskTable todos={todos || []}/>
  )
}

const mapPropsToState = state => {
  return {
    tasks: state.entities
  }
}