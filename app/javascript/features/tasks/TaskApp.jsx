import React, {useEffect} from "react"
import TaskTable from "./TaskTable"
import {fetchTasks} from "./tasksSlice"
import {useDispatch, useSelector} from "react-redux"

const TaskApp = props => {
  const baseUrl = props.baseUrl
  const tasks = useSelector(state => state.tasks.entities)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchTasks(baseUrl))
  }, [])
  return (
    <TaskTable tasks={tasks}/>
  )
}

export default TaskApp