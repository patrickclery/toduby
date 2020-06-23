import React from "react"
import {Provider} from "react-redux"
import tw, {styled} from "twin.macro"
import {configureStore} from "@reduxjs/toolkit"
import rootReducer from "../reducers"
import SEO from "./SEO"
import TaskForm from "./TaskForm"
import TaskTable from "./TaskTable"
import {createGlobalStyle} from "styled-components"

const store = configureStore({reducer: rootReducer})
const Card = styled.div`
  margin: 0 auto;
  ${tw`
    max-w-screen-sm
    mt-10
    bg-blue-100
    p-10
    rounded-lg
  `}
`
const Body = createGlobalStyle`
  body {
    ${tw`bg-blue-900`}
  }
`

const App = () => {
  return (
    <Provider store={store}>
      <SEO />
      <Body />
      <Card>
        <TaskForm />
        <TaskTable />
      </Card>
    </Provider>
  )
}

export default App