import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'

// A Thunk creates the action and reducer, to be DRY
const createTask = createAsyncThunk(
  'todos/createTask',
  // This callback is a "Payload Creator"
  // This will be passed in action.payload later
  async ({description, priority}) => {
    const uri = `${props.apiUri}/todos/`
    const requestOptions = {
      method:  "POST",
      headers: {"Content-Type": "application/json"},
      body:    JSON.stringify({description, priority})
    }
    const response = await fetch(uri, requestOptions)
    const json = response.json()
    return json.data
  }
)

const tasksSlice = createSlice(
  {
    name:          "tasks",
    initialState:  {
      entities:       [],
      description:    "",
      priority:       "0",
      loadingMessage: ""
    },
    reducers:      {},
    // Not sure why, but this goes in extraReducers and not just "reducers" when
    // dealing with promises
    extraReducers: {
      // Once the promise is fulfilled, it will add
      [createTask.fulfilled]: (state, action) => {
        // Add user to the state array
        state.entities.push(action.payload)
      }
    }
  }
)

