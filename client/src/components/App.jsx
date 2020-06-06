import React from "react"
import {Provider} from "react-redux"


// Setup the Redux store and provider
import {configureStore} from "@reduxjs/toolkit"

import rootReducer from "../reducers"
import TaskForm from "./TaskForm"
import TaskTable from "./TaskTable"

const store = configureStore({reducer: rootReducer})

const App = () => {
  return (
    <Provider store={store}>
      <TaskForm/>
      <TaskTable/>
    </Provider>
  )
}

export default App