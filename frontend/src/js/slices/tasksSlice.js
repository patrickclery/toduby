import {createAsyncThunk, createSlice} from "@reduxjs/toolkit"
import TasksApiClient from "../components/TasksApiClient"

// A Thunk creates the action and reducer, to be DRY
export const fetchTasks = createAsyncThunk(
  "tasks/fetchTasks",
  async (baseUrl, thunkAPI) => {
    const client = new TasksApiClient({baseUrl})
    const response = await client.fetchTasks()
    return response.data
  }
)
// A Thunk creates the action and reducer, to be DRY
export const createTask = createAsyncThunk(
  "tasks/createTask",
  async (baseUrl, description, priority, thunkAPI) => {
    const client = new TasksApiClient({baseUrl})
    const response = await client.createTask(description, priority)
    return response.data
  }
)

const tasksSlice = createSlice(
  {
    name:          "tasks",
    initialState:  {
      entities:    [],
      description: "",
      priority:    "0"
    },
    reducers:      {},
    // Not sure why, but this goes in extraReducers and not just "reducers" when
    // dealing with promises
    extraReducers: {
      [createTask.fulfilled]: (state, action) => {
        // Add user to the state array
        state.entities.push(action.payload)
        // Clear out the form fields
        state.description = ""
        state.priority = ""
      },
      // Once the promise is fulfilled, it will add
      [fetchTasks.fulfilled]: (state, action) => {
        // Add user to the state array
        state.entities = action.payload
      }
    }
  }
)

export default tasksSlice.reducer