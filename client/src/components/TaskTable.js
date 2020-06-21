import React, {useEffect} from "react"
import {useDispatch, useSelector} from "react-redux"
import {fetchTasks} from "../slices/tasksSlice"
import TaskItem from "./TaskItem"

const TaskTable = () => {

  const tasks = useSelector(state => state.tasks.entities)
  const dispatch = useDispatch()

  // Once the page loads, fetch a list of tasks
  useEffect(() => {
    dispatch(fetchTasks())
  }, [dispatch])

  /**
   * @description Loops through the provided Tasks and renders them
   * @constructor
   */
  const TaskItems = ({tasks}) => {
    return tasks.map(
      task =>
        <TaskItem
          key={task.id}
          task={task}
        />)
  }
  // Sort by priority
  const incompleteTasks = tasks
    .filter(task => !task.attributes.completedAt)
    .sort((a, b) => {
      let prioA = a.attributes.priority
      let prioB = b.attributes.priority
      return (prioA < prioB) ? 1 : ((prioA > prioB) ? -1 : 0)
    })

  // Alphabetical
  const completeTasks = tasks
    .filter(task => !!task.attributes.completedAt)
    .sort((a, b) => {
      let descA = a.attributes.description.toLowerCase()
      let descB = b.attributes.description.toLowerCase()

      return descA < descB
    })

  return <table>
    <thead>
      <tr>
        <th>&nbsp;</th>
        <th>Description</th>
        <th>Priority</th>
        <th>&nbsp;</th>
      </tr>
    </thead>
    <tbody>
      <TaskItems tasks={incompleteTasks} />
      <TaskItems tasks={completeTasks} />
    </tbody>
  </table>
}

export default TaskTable

