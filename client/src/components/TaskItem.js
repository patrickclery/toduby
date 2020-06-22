import React from "react"
import EdiText from "react-editext"
import {useDispatch} from "react-redux"
import {destroyTask, removeTask, updateTask} from "../slices/tasksSlice"
import tw, {styled} from "twin.macro"

const StyledEdiText = styled(EdiText)`
  div[editext="view-container"] {
    ${tw`
      font-bold
      font-serif
      ml-3 mr-3
      text-lg
    `}
  }
`

const TaskItem = props => {

  const {task: {id, attributes}} = props
  const {description, completedAt, priority} = attributes
  const dispatch = useDispatch()

  const Container = tw.div`
    gap-3
    mt-2
    mb-2
    grid
    grid-cols-6
    max-w-screen-sm
  `

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


  const Description = () =>
    <StyledEdiText
      cancelOnEscape
      completedAt={completedAt}
      onSave={value => handleUpdate("description", value)}
      showButtonsOnHover
      submitOnEnter
      submitOnUnfocus
      tw="grid col-span-3"
      type="text"
      validation={value => value.length >= 3}
      validationMessage="Please type at least 3 characters."
      value={description}
    />
  const PrioritySelect = () =>
    <select
      name="priority-select"
      onChange={e => handleUpdate("priority", e.target.value)}
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
  const Checkbox = () =>
    <input
      checked={!!completedAt}
      onChange={e => {
        e.preventDefault()
        handleToggle()
      }}
      type="checkbox"
      tw="
        grid
        col-span-2
      "
      value={id}
    />

  return <Container>
    <div tw="grid flex items-center col-span-3 gap-3">
      <Checkbox />
      <Description />
    </div>
    <PrioritySelect />
    <DeleteButton />
  </Container>
}

export default TaskItem
