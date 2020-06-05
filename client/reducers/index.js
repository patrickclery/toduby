import {combineReducers} from "@reduxjs/toolkit"
import tasksReducer from "../features/tasks/tasksSlice"

export default combineReducers({tasks: tasksReducer})
