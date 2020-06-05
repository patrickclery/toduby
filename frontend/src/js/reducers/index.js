import {combineReducers} from "@reduxjs/toolkit"
import tasksReducer from "../slices/tasksSlice"

export default combineReducers({tasks: tasksReducer})
