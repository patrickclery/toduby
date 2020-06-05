import React, {useEffect} from "react"
import TaskTable from "./TaskTable"
import TaskForm from "./TaskForm"
import {fetchTasks} from "./tasksSlice"
import {useDispatch, useSelector} from "react-redux"

const TaskApp = props => {
  const baseUrl = props.baseUrl
  const tasks = useSelector(state => state.tasks.entities)
  const dispatch = useDispatch()

  async function handleSubmit(event) {
    event.preventDefault()

    const uri = `${this.apiBaseUri}/todos/`
    const requestOptions = {
      method:  "POST",
      headers: {"Content-Type": "application/json"},
      body:    JSON.stringify(
        {
          description: this.state.description,
          priority:    this.state.priority
        }
      )
    }

    const response = await fetch(uri, requestOptions)
    const json = await response.json()

    // If we get an error, display the error message
    if (json.errors) {
      this.setState({errorMessage: json.errors[0].detail})
    } else {
      this.setState(
        {
          todos:          [...this.state.todos, json.data],
          successMessage: `Successfully added ${this.state.description}!`,
          description:    null,
          priority:       "0"
        }
      )
    }
  }

  useEffect(() => {
    dispatch(fetchTasks(baseUrl))
  }, [])

  return (
    <>
      <TaskForm handleSubmit={handleSubmit}/>
      <TaskTable tasks={tasks}/>
    </>
  )
}

export default TaskApp