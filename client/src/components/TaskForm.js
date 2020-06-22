import React from "react"
import {useDispatch, useSelector} from "react-redux"
import {changeTaskInput, createTask} from "../slices/tasksSlice"
import * as PropTypes from "prop-types"
import tw, {styled} from "twin.macro"

function TaskForm() {
  const description = useSelector(state => state.tasks.task.description)
  const priority = useSelector(state => state.tasks.task.priority)
  const dispatch = useDispatch()

  const Container = tw.div`
    border
    border-black
    gap-2
    grid
    grid-cols-5
    max-w-screen-sm
    mb-10
  `

  const handleSubmit = async (event) => {
    event.preventDefault()
    const attributes = {
      description,
      priority
    }
    dispatch(createTask(attributes))
  }
  // Assigns the value from a text/dropdown and assigns it to the respective task attribute
  const handleChange = async (event) => {
    const attribute = event.target.name.replace(/^todo\[(\w+)]$/, "$1")

    dispatch(changeTaskInput({
                               attribute,
                               value: event.target.value
                             }))
  }

  const DescriptionInput = props => <input
    defaultValue={props.defaultValue}
    name="todo[description]"
    placeholder="Type something (example: 'Do fifty pushups')"
    tw="
      col-span-3
      grid
      placeholder-gray-500
      px-3
      rounded
      text-sm
      w-auto
    "
    type="text"
  />
  DescriptionInput.propTypes = {defaultValue: PropTypes.string}

  const PrioritySelect = props => <select
    name="todo[priority]"
    tw="
      col-span-1
      grid
      px-3
      text-lg
    "
    defaultValue={props.defaultValue}
  >
    <option value="0">Low</option>
    <option value="1">Medium</option>
    <option value="2">High</option>
  </select>
  PrioritySelect.propTypes = {defaultValue: PropTypes.number}

  const SubmitButton = () => <button
    tw="
      bg-teal-500
      border-4
      border-teal-500
      col-span-1
      font-bold
      hover:bg-teal-700
      hover:border-teal-700
      px-2
      py-1
      rounded-lg
      text-sm
      text-white
    "
    type="submit"
  >Create</button>

  return (
    <form
      onSubmit={handleSubmit}
      onChange={handleChange}
    >
      <Container>
        <DescriptionInput defaultValue={description} />
        <PrioritySelect defaultValue={priority} />
        <SubmitButton />
      </Container>
    </form>
  )
}

export default TaskForm