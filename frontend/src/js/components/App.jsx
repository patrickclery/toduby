import React from "react"
import {Provider} from "react-redux"

// Setup the Redux store and provider
import {configureStore} from "@reduxjs/toolkit"

import TaskApp from "./TaskApp"
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