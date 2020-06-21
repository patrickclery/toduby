import React from "react"
import {useDispatch, useSelector} from "react-redux"
import {changeTaskInput, createTask} from "../slices/tasksSlice"
import * as PropTypes from "prop-types"
import tw, {styled} from "twin.macro"

function TaskForm() {
  const description = useSelector(state => state.tasks.task.description)
  const priority = useSelector(state => state.tasks.task.priority)
  const dispatch = useDispatch()

  const Container = tw.div`max-w-screen-sm grid grid-cols-5 gap-2`

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
    tw="grid col-span-3 text-sm w-auto"
    type="text"
  />
  DescriptionInput.propTypes = {defaultValue: PropTypes.string}

  const PrioritySelect = props => <select
    name="todo[priority]"
    tw="text-lg grid col-span-1"
    defaultValue={props.defaultValue}
  >
    <option value="0">Low</option>
    <option value="1">Medium</option>
    <option value="2">High</option>
  </select>
  PrioritySelect.propTypes = {defaultValue: PropTypes.number}

  const SubmitButton = () => <button
    tw="col-span-1 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded"
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