import {createSlice} from '@reduxjs/toolkit'

const createTask = async ({description, priority}) => {
  const uri = `${props.apiUri}/todos/`
  const requestOptions = {
    method:  "POST",
    headers: {"Content-Type": "application/json"},
    body:    JSON.stringify({
                              description: description,
                              priority:    priority
                            })
  }
  const response = await fetch(uri, requestOptions)
  const json = response.json()
  return json
}

const todosSlice = createSlice(
  {
    name:         'todos',
    initialState: [],
    reducers:     {
      createTodo: {
        reducer: (state, action) => {
          const {id, description, priority} = action.payload
          state.push(
            {
              id,
              description,
              priority,
              completed: false
            })
        }
      },
      toggleTodo: (state, action) => {
        const todo = state.find(todo => todo.id === action.payload)
        if (todo) todo.attributes.completed = !todo.attributes.completed
      }
    }
  })

export const {addTodo, toggleTodo} = todosSlice.actions

export default todosSlice.reducer