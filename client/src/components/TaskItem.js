import React from "react"
import EdiText from "react-editext"
import {useDispatch} from "react-redux"
import {destroyTask, removeTask, updateTask} from "../slices/tasksSlice"

const TaskItem = props => {

  const {task: {id, attributes}} = props
  const {description, completedAt, priority} = attributes
  const dispatch = useDispatch()

  /**
   * @description Dispatches an updated version of the task for update. This is used for all
   * attributes, including the completed checkbox
   * @param {object} attribute name to update
   * @param {object} value of the attribute
   */
  const handleUpdate = (attribute, value) => {
    const newAttributes = {
      ...attributes,
      [attribute]: value
    }
    dispatch(updateTask({
                          id,
                          attributes: newAttributes
                        }))
  }
  const DescriptionInput = () =>
    <EdiText
      cancelOnEscape
      completedAt={completedAt}
      onSave={value => handleUpdate("description", value)}
      showButtonsOnHover
      submitOnEnter
      submitOnUnfocus
      type="text"
      validation={value => value.length >= 3}
      validationMessage="Please type at least 3 characters."
      value={description}
      viewProps={{
        style: !!completedAt
                 ? {textDecoration: "line-through"}
                 : {
            fontSize:   "x-large",
            fontWeight: "bold",
            fontFamily: "serif"
          }
      }}
    />
  const PrioritySelect = () =>
    <select
      name="priority-select"
      onChange={({target: {value}}) => handleUpdate("priority", value)}
      value={priority}
    >
      <option value="0">Low</option>
      <option value="1">Medium</option>
      <option value="2">High</option>
    </select>

  /**
   * @description Destroys the current task
   */
  const handleDestroy = () => {
    dispatch(destroyTask({id}))
    dispatch(removeTask({
                          id,
                          attributes
                        }))
  }
  const DeleteButton = () =>
    <button
      tw="bg-red-500 border-4 border-red-500 flex-shrink-0 hover:bg-red-700 hover:border-red-700 px-2 py-1 rounded text-sm text-white"
      onClick={e => {
        e.preventDefault()
        handleDestroy()
      }}
      type="button"
    >Delete</button>

  /**
   * @description This simply calls the update action, instead of doing its own
   */
  const handleToggle = () => {
    const newAttributes = {
      ...attributes,
      completed: !!completedAt ? "0" : "1"
    }
    dispatch(updateTask({
                          id,
                          attributes: newAttributes
                        }))
  }
  const CompletedCheckbox = () =>
    <input
      checked={!!completedAt}
      onChange={e => {
        e.preventDefault()
        handleToggle()
      }}
      type="checkbox"
      value={id}
    />

  return (
    <tr
      key={id}
      className={!!completedAt ? "complete" : "incomplete"}
    >
      <td>
        <CompletedCheckbox />
      </td>
      <td>
        <DescriptionInput />
      </td>
      <td>
        <PrioritySelect />
      </td>
      <td>
        <DeleteButton />
      </td>
    </tr>
  )
}

export default TaskItem
