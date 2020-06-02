import React from "react"
import {Provider, useSelector} from "react-redux"

// Setup the Redux store and provider
import {configureStore} from "@reduxjs/toolkit"
import {fetchTasks as fetchTasksThunk} from "../features/tasks/tasksSlice"

import rootReducer from "../reducers/index"

const store = configureStore({reducer: rootReducer})
import TaskTable from "../features/tasks/TaskTable"

const AppWrapper = () => {
  return (
    <Provider store={store}>
      <App/>
    </Provider>
  )
}

const App = props => {
  const baseUrl = props.baseUrl
  const fetchTasks = () => {
    store.dispatch(fetchTasksThunk(baseUrl))
  }
  const tasks = useSelector(state => state.tasks.entities)

  return (
    <TaskTable tasks={tasks}/>
  )
}

export default AppWrapper