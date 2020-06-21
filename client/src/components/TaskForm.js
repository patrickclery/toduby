import React from "react"
import {useDispatch, useSelector} from "react-redux"
import {changeTaskInput, createTask} from "../slices/tasksSlice"
import * as PropTypes from "prop-types"
import {styled} from "twin.macro"

const Container = styled.div`
  width: auto;
  grid-template-columns: auto minmax(auto, 100px) minmax(auto, 100px);
  display: grid;
  grid-column-gap: 10px;
`

function TaskForm() {
  const description = useSelector(state => state.tasks.task.description)
  const priority = useSelector(state => state.tasks.task.priority)
  const dispatch = useDispatch()

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
    placeholder="Type the task you'd like to do next here"
    tw="grid text-lg w-auto"
    type="text"
  />
  DescriptionInput.propTypes = {defaultValue: PropTypes.string}

  const PrioritySelect = props => <select
    name="todo[priority]"
    defaultValue={props.defaultValue}
  >
    <option value="0">Low</option>
    <option value="1">Medium</option>
    <option value="2">High</option>
  </select>

  PrioritySelect.propTypes = {defaultValue: PropTypes.any}

  const SubmitButton = () => <button
    tw="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded"
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