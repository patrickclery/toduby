import {combineReducers} from "@reduxjs/toolkit"
import todosReducer from "../features/todos/todosSlice"

export default combineReducers({todos: todosReducer})
