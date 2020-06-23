import {createAsyncThunk, createSlice} from "@reduxjs/toolkit"

const apiRoot = "http://localhost:3000/api/v1"

export const fetchTasks = createAsyncThunk(
  "tasks/fetchTasks",
  async () => {
    const requestOptions = {
      method:  "GET",
      headers: {"Content-Type": "application/json"}
    }
    const response = await fetch(`${apiRoot}/todos/`, requestOptions)
    return response.json()
  }
)

export const createTask = createAsyncThunk(
  "tasks/createTask",
  async (attributes) => {

    const requestOptions = {
      method:  "POST",
      headers: {"Content-Type": "application/json"},
      body:    JSON.stringify({task: attributes})
    }
    const response = await fetch(`${apiRoot}/todos/`, requestOptions)
    return response.json()
  }
)

// Since we're updating one attribute at a time (description, priority, etc.) the best approach
// is to omit any other attributes from the array. Rails
export const updateTask = createAsyncThunk(
  "tasks/updateTask",
  async ({attributes, id}) => {

    const requestOptions = {
      method:  "PUT",
      headers: {"Content-Type": "application/json"},
      body:    JSON.stringify({task: attributes})
    }
    const response = await fetch(`${apiRoot}/todos/${id}`, requestOptions)
    return response.json()
  }
)

export const destroyTask = createAsyncThunk(
  "tasks/destroyTask",
  async ({id}) => {
    const requestOptions = {
      method:  "DELETE",
      headers: {"Content-Type": "application/json"}
    }

    const response = await fetch(`${apiRoot}/todos/${id}`, requestOptions)
    return response.json()
  }
)

export const tasksSlice = createSlice(
  {
    name:          "tasks",
    initialState:  {
      entities:       [],
      successMessage: "",
      task:           {
        description: "",
        priority:    "0"
      }
    },
    reducers:      {
      changeTaskInput: (state, {payload}) => {
        const attribute = payload.attribute
        state.task[attribute] = payload.value
      },
      // 1. Remove it from the collection
      // This doesn't trigger a "fulfilled", so using a synchronous regular reducer
      removeTask:      (state, action) => {
        const {id} = action.payload

        state.entities = state.entities.filter(task => task.id !== id)
      }
    },
    extraReducers: {
      // Replaces the list of tasks once fetch is complete
      [fetchTasks.fulfilled]: (state, {payload: {data}}) => {
        state.entities = data
      },
      // Creates a new task, then adds it to the collection
      [createTask.fulfilled]: (state, {payload: {data}}) => {
        state.entities.push(data)
        state.task = {
          description: "",
          priority:    "0"
        }
      },

      // Update collection with the new task
      [updateTask.fulfilled]: (state, {payload: {data}}) => {

        // Finds the ID of the task in the state
        const findNeedleInHaystack = (haystack, needle) => {
          return haystack.findIndex(obj => obj.id === needle)
        }
        const index = findNeedleInHaystack(state.entities, data.id)

        state.entities[index] = data
      }
    }
  }
)

export const {changeTaskInput, removeTask} = tasksSlice.actions
export default tasksSlice.reducer
