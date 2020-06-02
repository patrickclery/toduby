import React, {useEffect} from "react"
import {Provider, useSelector, useDispatch} from "react-redux"

// Setup the Redux store and provider
import {configureStore} from "@reduxjs/toolkit"
import {fetchTasks as fetchTasksThunk} from "../features/tasks/tasksSlice"

import TaskApp from "../features/tasks/TaskApp"
import rootReducer from "../reducers/index"

const store = configureStore({reducer: rootReducer})

const App = props => {
  return (
    <Provider store={store}>
      <TaskApp {...props} />
    </Provider>
  )
}

export default App